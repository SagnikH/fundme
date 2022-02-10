import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout.js";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
	const [currentAccount, setCurrentAccount] = useState(null);

	useEffect(() => {
		console.log("_app mounted");

		if (typeof window !== "undefined" && window.ethereum)
			window.ethereum.on("accountsChanged", handleAccountsChanged);

		return () => {
			console.log("_app unmounted");
		};
	}, []);

	const handleAccountsChanged = (accounts) => {
		console.log("accounts changed");
		if (accounts.length === 0) {
			// MetaMask is locked or the user has not connected any accounts
			console.log("Please connect to MetaMask.");
		} else if (accounts[0] !== currentAccount) {
			setCurrentAccount(accounts[0]);
			console.log("current account", accounts[0]);
		}
	};

  const setAccountCallback = (account) => {
    setCurrentAccount(account);
  }

	return (
		<Layout setAccount={setAccountCallback}>
			<Component currentAccount={currentAccount} {...pageProps} />
		</Layout>
	);
}

export default MyApp;
