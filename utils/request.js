import request from "../ethereum/request";
import manager from "../ethereum/manager";

// managerId, description, receipientid, mincontribution amount, total contributed, ban votes,

class Request {
	#requestAddress;
	#Request;
	#Manager;

	constructor(requestAddress) {
		this.#requestAddress = requestAddress;
	}

	async init() {
		this.#Request = await request(this.#requestAddress);
		const managerContractAddress = await this.#Request.methods.manager().call();
		this.#Manager = await manager(managerContractAddress);
	}

	async getSummaryInfo() {
		try {
			const managerRating = await this.#Manager.methods.rating().call();
			const managerId = await this.#Manager.methods.id().call();
			const description = await this.#Request.methods.description().call();
			const receipientId = await this.#Request.methods.recipient().call();
			const minimumContribution = await this.#Request.methods.minimumContribution().call();
			const requestedAmount = await this.#Request.methods.amount().call();
			const totalContributed = await this.#Request.methods.totalAmountCollected().call();
			const banCount = await this.#Request.methods.totalBanCount().call();

			return {
				managerId,
				managerRating,
				description,
				receipientId,
				minimumContribution,
				requestedAmount,
				totalContributed,
				banCount,
			};
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}

	async contribute(amount, account) {
    try{
      await this.#Request.methods.contribute().send({
        value: amount,
        from: account
      });
    } catch (e) {
      console.error(e);
      return e.message;
    }
  }

  async approve() {
    try {
      await this.#Request.methods.approve().call();
    } catch (e) {
      console.log(e.message);
    }
  }

  async banRequest() {
    try {
      await this.#Request.methods.banRequest().call();
    } catch (e) {
      console.log(e.message);
    }
  }

  async rate(rating) {
    try {
      this.#Manager.methods.rate(rating).send({
        from: account
      });
    } catch(e) {
      console.log(e.message);
    }
  }

  async hasBanned(account) {
    try {
      return this.#Request.methods.bans(account).call();
    } catch (e) {
      console.error(e.message);
      return true;
    }
  }
}