import web3 from "../ethereum/web3";
import { Form, Button } from "react-bootstrap";
import styles from "../styles/NewRequest.module.css";
import requestFactory from "../ethereum/requestFactory";
import React, { useState } from 'react';

const newRequest = () => {

    const [demand, setDemand] = useState(null);
    const [minContribution, setMinContribution] = useState(null);
    const [description, setDescription] = useState(null);
    const [recipient, setRecipient] = useState(null);

    const handleNewRequestSubmit = (e) => {
        e.preventDefault();
        alert(`
            Demand: ${demand}
            Min Contribution: ${minContribution}
            Description: ${description}
            Recipient: ${recipient}
        `)
    }
  
	const newRequest = async (e) => {
		e.preventDefault();

		//description, amount, receipient, minAmount
		try {
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log("received eth wallets", accounts);
			const ether = await web3.eth.getBalance(accounts[0]);
			console.log("ether in account", ether);

			const RequestFactory = await requestFactory();
			console.log(accounts[0]);
			await RequestFactory.methods
				.addNewRequest("football", 200, "0xc620C0C0da1A0856B71c1c39aF6883c35F8db1E8", 100)
				.send({ from: accounts[0] });
		} catch (e) {
			if (e.code === 4001) {
				console.log("Please connect to metamask");
			} else {
				console.error(e.message);
			}
		}
	};

	return ( 
    <div className='d-flex flex-column justify-content-between'>
        <Form className={styles.form}>
            <Form.Group className="mb-3">
                <Form.Label className='text-white'>Demanded Amount</Form.Label>
                <Form.Control type="number" className={styles.formInput} 
                    onChange={(e)=>setDemand(e.target.value)}
                    placeholder={demand ? `${demand} wei` : `Demanded Amount`}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='text-white'>Minimum Contribution</Form.Label>
                <Form.Control type="number" className={styles.formInput} 
                    onChange={(e)=>setMinContribution(e.target.value)}
                    placeholder={minContribution ? `${minContribution} wei` : `Minimum Contribution`}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className='text-white'>Description</Form.Label>
                <Form.Control as="textarea" rows={6} className={styles.formInput}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder={description ? `${description}` : `Description`}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='text-white'>Recipient ID</Form.Label>
                <Form.Control type="text" className={styles.formInput}
                    onChange={(e)=>setRecipient(e.target.value)}
                    placeholder={recipient ? `${recipient}` : `Recipient ID`}/>
            </Form.Group>

            <Button type="submit" className={styles.button} onClick={handleNewRequestSubmit}>
                Submit
            </Button>
        </Form>
    </div>
 );
};
 
export default newRequest;
