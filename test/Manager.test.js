const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //it is a constructor function, creates instances of web3 library
const options = { gasLimit: "8000000" };
const web3 = new Web3(ganache.provider(options));

const compiledManagerFactory = require("../ethereum/build/ManagerFactory.json");
const compiledRequestFactory = require("../ethereum/build/RequestFactory.json");
const compiledManager = require("../ethereum/build/Manager.json");
const compiledRequest = require("../ethereum/build/Request.json");

let accounts, managerFactory, requestFactory;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	managerFactory = await new web3.eth.Contract(compiledManagerFactory.abi)
		.deploy({ data: compiledManagerFactory.evm.bytecode.object })
		.send({ from: accounts[0], gas: "1000000" });

	requestFactory = await new web3.eth.Contract(compiledRequestFactory.abi)
		.deploy({
			data: compiledRequestFactory.evm.bytecode.object,
			arguments: [managerFactory.options.address],
		})
		.send({ from: accounts[0], gas: "4000000" });
});

describe("Manager Factory", () => {
	it("deploys the manager factory contract", () => {
		assert(managerFactory.options.address);
	});

	it("deploys the request factory contract", () => {
		assert(requestFactory.options.address);
	});

	it("manager factory address set correctly in request factory", async () => {
		const managerFactoryAddress = await requestFactory.methods
			.managerFactory()
			.call();
		assert.strictEqual(managerFactoryAddress, managerFactory.options.address);
	});

	it("get the new Request contract", async () => {
		await requestFactory.methods
			.addNewRequest("cricket", 1000, accounts[1])
			.send({
				from: accounts[0],
				gas: "2000000",
			});

		const requestAddress = await requestFactory.methods.requests(0).call();
		const request = await new web3.eth.Contract(
			compiledRequest.abi,
			requestAddress
		);
		const description = await request.methods.description().call();
		const amount = await request.methods.amount().call();
		assert.strictEqual("cricket", description);
		assert.strictEqual("1000", amount);

		try {
			await requestFactory.methods
				.addNewRequest("football", 1000, accounts[1])
				.send({
					from: accounts[0],
					gas: "2000000",
				});
		} catch (e) {
			console.log(e.message);
		}
	});

	it("manager contract checks", async () => {
		await requestFactory.methods
			.addNewRequest("cricket", 1000, accounts[1])
			.send({
				from: accounts[0],
				gas: "2000000",
			});

		const requestAddress = await requestFactory.methods.requests(0).call();
		const request = await new web3.eth.Contract(
			compiledRequest.abi,
			requestAddress
		);
		const managerContractAddress = await request.methods.manager().call();
		const manager = await new web3.eth.Contract(
			compiledManager.abi,
			managerContractAddress
		);
		const managerAddress = await manager.methods.id().call();
		try {
			await manager.methods.rate(3).send({
				from: accounts[1],
				gas: "2000000",
			});
		} catch (e) {
			console.log(e.message);
		}
		const rate = await manager.methods.rating().call();
		const holding = await manager.methods.holding().call();
		assert.strictEqual(accounts[0], managerAddress);
		assert.strictEqual("3", rate);
		assert.ok(holding);
	});
});
