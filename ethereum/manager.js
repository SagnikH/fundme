const web3 = require("./web3");
const compiledManager = require("./build/Manager.json");

const manager = async (managerAddress) => {
	console.log("request address", managerAddress);

	return await new web3.eth.Contract(compiledManager.abi, managerAddress);
};

module.exports = manager;
