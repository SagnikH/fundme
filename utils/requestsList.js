import web3 from "../ethereum/web3";
import requestFactory from "../ethereum/requestFactory";

//walletId, rating, minContribution, demanded amount
//returns -> [{}]

const requestsList = async () => {
	const RequestFactory = await requestFactory();
	const minimumAmount = await RequestFactory.methods.requestsSize().call();
	console.log("min amount", minimumAmount);

	return minimumAmount;
};

module.exports = requestsList;
