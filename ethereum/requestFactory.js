const web3 = require("./web3");
const compiledRequestFactory = require("./build/RequestFactory.json");

const requestFactoryAddress = "0xfb7e8535891c9e86c1ca28261ce460ecb634bdb8";
console.log("factory address", requestFactoryAddress);

const requestFactory = async () => {
	const f = await new web3.eth.Contract(
		compiledRequestFactory.abi,
		requestFactoryAddress
	);

  console.log(f);
  return f;
};

module.exports = requestFactory;
