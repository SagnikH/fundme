import { Form, Button } from "react-bootstrap";
import styles from "../styles/NewRequest.module.css";
import requestFactory from "../ethereum/requestFactory";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const newRequest = (props) => {
	const router = useRouter();

	const [demand, setDemand] = useState(null);
	const [minContribution, setMinContribution] = useState(null);
	const [description, setDescription] = useState(null);
	const [recipient, setRecipient] = useState(null);
	//TODO: add a loading spinner for the reuquest being processed

	const handleNewRequestSubmit = async (e) => {
		e.preventDefault();

		try {
			if (props.currentAccount === null) {
				window.alert("Connect to metamask");
			} else {
				console.log("request started");
				const RequestFactory = await requestFactory();
				const request = await RequestFactory.methods
					.addNewRequest(description, demand, recipient, minContribution)
					.send({ from: props.currentAccount });

				router.push(`/request/${request.options.address}`);
			}
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
