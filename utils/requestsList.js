import requestFactory from "../ethereum/requestFactory";
import request from "../ethereum/request";
import manager from "../ethereum/manager";

//walletId, rating, minContribution, demanded amount
//returns -> [{}]

const requestsList = async () => {
	try {
		const RequestFactory = await requestFactory();
		const requests = [];
		const requestsSize = await RequestFactory.methods.requestsSize().call();

		for (let index = 0; index < requestsSize; index++) {
			let currentRequestAddress = await RequestFactory.methods.requests(index).call();

			let Request = await request(currentRequestAddress);
			let managerContractAddress = await Request.methods.manager().call();
			let Manager = await manager(managerContractAddress);
			let managerRating = await Manager.methods.rating().call();
			let managerId = await Manager.methods.id().call();
			let minimumContribution = await Request.methods.minimumContribution().call();
			let requestedAmount = await Request.methods.amount().call();
			let isBanned = await Request.methods.banned().call();
			let isWithdrawn = await Request.methods.approved().call();

			let requestObj = {
				id: currentRequestAddress,
				rating: managerRating,
				walletId: managerId,
				minContribution: minimumContribution,
				demandedAmount: requestedAmount,
				isBanned,
				isWithdrawn,
			};

			requests.push(requestObj);
		}

		return requests;
	} catch (e) {
		console.log(e.message);
		return e.message;
	}
};

module.exports = requestsList;
