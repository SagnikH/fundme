import web3 from "../ethereum/web3";
import { Form, Button } from "react-bootstrap";
import styles from "../styles/NewRequest.module.css";
import requestFactory from "../ethereum/requestFactory";
import React, { useState, useEffect } from "react";

const newRequest = () => {
	const [demand, setDemand] = useState(null);
	const [minContribution, setMinContribution] = useState(null);
	const [description, setDescription] = useState(null);
	const [recipient, setRecipient] = useState(null);
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
			console.log("current account", accounts[0]);
		}
	};

	const handleMetamask = async () => {
		window.alert("Please connect with Metamask");
		const accounts = await web3.eth.getAccounts();
		console.log(accounts);
		if (accounts.length) setCurrentAccount(accounts[0]);
	};

	const handleNewRequestSubmit = async (e) => {
		e.preventDefault();

		//description, amount, receipient, minAmount
		// try {
		// 	const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		// 	console.log("received eth wallets", accounts);
		// 	const ether = await web3.eth.getBalance(accounts[0]);
		// 	console.log("ether in account", ether);

		// 	console.log(accounts[0]);
		// } catch (e) {
		// 	if (e.code === 4001) {
		// 		console.log("Please connect to metamask");
		// 	} else {
		// 		console.error(e.message);
		// 	}
		// }

		try {
			if (currentAccount === null) {
				await handleMetamask();
			} else {
				console.log("request started");
				const RequestFactory = await requestFactory();
				await RequestFactory.methods
					.addNewRequest(description, demand, recipient, minContribution)
					.send({ from: currentAccount });
			}
			//TODO: try refereshing for getserverside props update
		} catch (e) {
			console.error(e.message);
		} finally {
			console.log("request done");
		}
	};

	return (
		<div className="d-flex flex-column justify-content-between">
			<Form className={styles.form}>
				<Form.Group className="mb-3">
					<Form.Label className="text-white">Demanded Amount</Form.Label>
					<Form.Control
						type="number"
						className={styles.formInput}
						onChange={(e) => setDemand(e.target.value)}
						placeholder={demand ? `${demand} wei` : `Demanded Amount`}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label className="text-white">Minimum Contribution</Form.Label>
					<Form.Control
						type="number"
						className={styles.formInput}
						onChange={(e) => setMinContribution(e.target.value)}
						placeholder={minContribution ? `${minContribution} wei` : `Minimum Contribution`}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label className="text-white">Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={6}
						className={styles.formInput}
						onChange={(e) => setDescription(e.target.value)}
						placeholder={description ? `${description}` : `Description`}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label className="text-white">Recipient ID</Form.Label>
					<Form.Control
						type="text"
						className={styles.formInput}
						onChange={(e) => setRecipient(e.target.value)}
						placeholder={recipient ? `${recipient}` : `Recipient ID`}
					/>
				</Form.Group>

				<Button type="submit" className={styles.button} onClick={handleNewRequestSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default newRequest;
