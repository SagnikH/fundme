// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Manager {
    address public id;
    mapping(address => uint) public ratings;
    uint public currentRatingSum;
    uint public rating;
    uint public raters;
    bool public holding;
    uint public totalBans;

    uint public constant SCALE = 5;

    constructor(address _id) {
        id = _id;
        currentRatingSum = 0;
        rating = 0;
        raters = 0;
        holding = false;
    }

    function rate(uint _rate) external {
        require(msg.sender != id, "can't rate yourself");
        require(_rate > 0 && _rate <= SCALE, "out of range rating");

        if(ratings[msg.sender] == 0){
            raters++;
        }

        currentRatingSum -= ratings[msg.sender];
        currentRatingSum += _rate;

        ratings[msg.sender] = _rate;

        rating = currentRatingSum/raters;
    }

    function removeHolding() external {
        holding = false;
    }

    function addHolding() external {
        holding = true;
    }

    function addTotalBans() external {
        totalBans++;
        holding = false;
    }
}

contract ManagerFactory {
    mapping(address => Manager) public managers;
    mapping(address => bool) public existingManager;

    function addNewManager(address _manager) public {
        require(!existingManager[_manager], "already a manager");
        existingManager[_manager] = true;

        managers[_manager] = new Manager(_manager);
    }

    function getManager(address _manager) external returns(Manager) {
        if(!existingManager[_manager]){
            addNewManager(_manager);
        }

        return managers[_manager];
    }
}


contract RequestFactory {
    uint constant banThreshHold = 1;
    uint constant minimumAmount = 100;

    address public managerFactory;

    Request[] public requests;

    constructor(address _managerFactory) {
        managerFactory = _managerFactory;
    }

    function addNewRequest(string memory description, uint amount, address payable recipient, uint minimumContribution) public{
        require(amount >= minimumAmount, "you can't request less money");
        Manager m = ManagerFactory(managerFactory).getManager(msg.sender);

        require(m.totalBans() < banThreshHold, "you are banned");
        
        // already holding person can't have a new store
        require(!m.holding(), "you have already requested");

        Request request = new Request(description, amount, recipient, m, minimumContribution);
        requests.push(request);

        m.addHolding();     //can add a store reference as well
    }

    function requestsSize() external view returns(uint) {
        return requests.length;
    }
}

contract Request {
    uint public minimumContribution;
    Manager public  manager;  //the manager
    string public description;
    uint public  amount;
    address payable public recipient;
    // address public requester;
    bool public approved;
    mapping(address => bool) public contributors;
    uint public contributorCount;
    uint public totalAmountCollected;

    mapping(address => bool) public bans;
    uint public totalBanCount;
    bool public banned;

    modifier isOpen() {
        require(!approved && !banned, "banned or completed");
        _;
    }
    
    constructor(string memory _description, uint _amount, address payable _recipient, Manager _m, uint _minimumContribution) {
        description = _description;
        amount = _amount;
        recipient = _recipient;
        manager = _m;
        minimumContribution = _minimumContribution;
    }

    function contribute() external payable isOpen {
        require(msg.value >= minimumContribution, "less amount donated");
        require(!banned, "can't donate to banned request");
        require(totalAmountCollected < amount, "goal amount reached");

        if(!contributors[msg.sender]){
            contributorCount++;
            contributors[msg.sender] = true;
        }

        totalAmountCollected += msg.value;
    }

    //only approve if required balance is reached
    function approve() external {
        // require(totalAmountCollected >= amount);
        recipient.transfer(address(this).balance);

        approved = true;

        manager.removeHolding();
    }

    function banRequest() external isOpen {
        require(contributors[msg.sender], "you are not a contributor");
        require(!bans[msg.sender], "you have already banned");

        bans[msg.sender] = true;
        totalBanCount++;

        uint banPercentage = (totalBanCount/contributorCount) * 100;
        if(banPercentage > 90)
            ban();
    }

    function ban() public isOpen {
        manager.addTotalBans();
        banned = true;
    }
}