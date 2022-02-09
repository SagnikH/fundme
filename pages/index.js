import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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

	return (
		<>
			{/* <h1>Connect to metamask</h1>
			<button onClick={connect}> Connect </button>
			<h2>{JSON.stringify(props.requests)}</h2>
			<button onClick={newRequest}>Add new Request </button> */}
			<div className={styles.index}>
					Hello world
			</div>
		</>
	);
}