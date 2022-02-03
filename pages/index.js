import NavigationBar from '../components/NavigationBar';
import styles from "../styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import web3 from "../ethereum/web3";

export default function Home() {
	let currentAccount;

	useEffect(() => {
		if (typeof window !== "undefined" && window.ethereum)
			window.ethereum.on("accountsChanged", handleAccountsChanged);
	}, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      console.log("current account", currentAccount);
    }
  }

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
			<div className={styles.index}>
					Hello world
			</div>
		</>
	);
}
