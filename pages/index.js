import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import web3 from "../ethereum/web3";

import requestList from "../utils/requestsList";

export default function Home(props) {
	let currentAccount;

	useEffect(() => {
		if (typeof window !== "undefined" && window.ethereum)
			window.ethereum.on("accountsChanged", handleAccountsChanged);
	}, []);

	const handleAccountsChanged = (accounts) => {
		if (accounts.length === 0) {
			// MetaMask is locked or the user has not connected any accounts
			console.log("Please connect to MetaMask.");
		} else if (accounts[0] !== currentAccount) {
			currentAccount = accounts[0];
			console.log("current account", currentAccount);
		}
	};

	const connect = async () => {
		try {
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			console.log("received eth wallets", accounts);
			currentAccount = accounts[0];
			const ether = await web3.eth.getBalance(currentAccount);
			console.log("ether in account", ether);
		} catch (e) {
			if (e.code === 4001) {
				console.log("Please connect to metamask");
			} else {
				console.error(e.message);
			}
		}
	};

	return (
		<>
			<h1>Connect to metamask</h1>
			<button onClick={connect}> Connect </button>
			<h2>{props.minimumAmount}</h2>
		</>
	);
}

export async function getServerSideProps(context) {
	const minimumAmount = await requestList();
	console.log("min Amount", minimumAmount);

	return {
		props: {
			minimumAmount,
		}, // will be passed to the page component as props
	};
}
