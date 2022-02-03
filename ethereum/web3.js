import Web3 from "web3";

let web3, provider;

if (typeof window !== "undefined" && window.ethereum) {
	console.log("using metamask");
	web3 = new Web3(window.ethereum);
} else {
	console.log("infura node");
	provider = new Web3.providers.HttpProvider(
		"https://rinkeby.infura.io/v3/02b7059a369a459eade135078179dc5d"
	);
	web3 = new Web3(provider);
}

module.exports =  web3;
