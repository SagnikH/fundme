const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const compiledManagerFactory = require("./build/ManagerFactory.json");
const compiledRequestFactory = require("./build/RequestFactory.json");

const MNEMONIC_PHRASE = process.env.MNEMONIC_PHRASE;

const provider = new HDWalletProvider({
	mnemonic: {
		phrase: MNEMONIC_PHRASE,
	},
	providerOrUrl:
		"https://rinkeby.infura.io/v3/02b7059a369a459eade135078179dc5d",
});

const web3 = new Web3(provider);

(async () => {
	const accounts = await web3.eth.getAccounts();

	console.log("deploying contract using account", accounts[0]);

	try {
		const managerFactory = await new web3.eth.Contract(
			compiledManagerFactory.abi
		)
			.deploy({ data: compiledManagerFactory.evm.bytecode.object })
			.send({ from: accounts[0], gas: "1000000" });

		console.log(
			"deployed hash for the managerFactory contract",
			managerFactory.options.address
		);

		const requestFactory = await new web3.eth.Contract(
			compiledRequestFactory.abi
		)
			.deploy({
				data: compiledRequestFactory.evm.bytecode.object,
				arguments: [managerFactory.options.address],
			})
			.send({ from: accounts[0], gas: "4000000" });

		console.log(
			"deployed hash for the requestFactory contract",
			requestFactory.options.address
		);
	} catch (e) {
		console.error(e);
	}

	provider.engine.stop();
})();
