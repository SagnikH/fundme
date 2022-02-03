import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import web3 from "../ethereum/web3";
import requestFactory from "../ethereum/requestFactory";

import requestList from "../utils/requestsList";

export default function Home(props) {
	const [currentAccount, setCurrentAccount] = useState(null);

	useEffect(() => {
		if (typeof window !== "undefined" && window.ethereum)
			window.ethereum.on("accountsChanged", handleAccountsChanged);
	}, []);

	const handleAccountsChanged = (accounts) => {
		if (accounts.length === 0) {
			// MetaMask is locked or the user has not connected any accounts
			console.log("Please connect to MetaMask.");
		} else if (accounts[0] !== currentAccount) {
			setCurrentAccount(accounts[0]);
			console.log("current account", currentAccount);
		}
	};

	const newRequest = async () => {
		//description, amount, receipient, minAmount
		try {
			const RequestFactory = await requestFactory();
			console.log(RequestFactory);
      console.log(currentAccount);
			await RequestFactory.methods
				.addNewRequest("cricket", 1000, "0xc620C0C0da1A0856B71c1c39aF6883c35F8db1E8", 100)
				.send({
					from: currentAccount
				});
		} catch (e) {
			console.error(e.message);
		}
	};

	const connect = async () => {
		try {
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			console.log("received eth wallets", accounts);
			setCurrentAccount(accounts[0]);
			const ether = await web3.eth.getBalance(accounts[0]);
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
			<h2>{JSON.stringify(props.requests)}</h2>
			<button onClick={newRequest}>Add new Request </button>
		</>
	);
}

export async function getServerSideProps(context) {
	const requests = await requestList();
	console.log("Request Array", requests);

	return {
		props: {
			requests,
		}, // will be passed to the page component as props
	};
}
