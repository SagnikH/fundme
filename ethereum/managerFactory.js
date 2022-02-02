const web3 = require("./web3");
const compiledManagerFactory = require("../ethereum/build/ManagerFactory.json");

const managerFactoryAddress = "0x98385814f560d5e5e1ede97d81e8bc53179103c4";

const managerFactory = new web3.eth.Contract(
	compiledManagerFactory.abi,
	managerFactoryAddress
);

export default managerFactory;