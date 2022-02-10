const web3 = require("./web3");
const compiledRequest = require("./build/Request.json");

const request = async (requestAddress) => {
	// console.log("request address", requestAddress);

	return await new web3.eth.Contract(compiledRequest.abi, requestAddress);
};

module.exports = request;
