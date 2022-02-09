import styles from '../../styles/SingleRequest.module.css';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';

const request = (props) => {

    const {
        walletId, rating, demandedAmount, description, 
        recipientWalletId,  minContribution, numberOfContributions, 
        numberOfVotesForBan, numberOfRatings, totalContributed
    } = props.data;
    
    const [donation, setDonation] = useState(minContribution);

    const handleDonation = () => {
        alert(`${donation} donated`);
    }

    return ( 
        <div className={`${styles.singleRequest} d-flex flex-column justify-content-between
                        align-items-center m-auto`}>
            <div className={`d-flex flex-column flex-lg-row justify-content-between w-75`}>
                <div className={``}>
                    <div className={``}>Requested By: {walletId}</div>
                    <div >Rating: {rating}</div>
                    <div className={`mt-4`}>Recipient: {recipientWalletId}</div>
                    
                </div>
                <div className={``}>
                    <div>Total Demanded: {demandedAmount} wei</div>
                    <div>Total Contribution: {totalContributed} wei</div>
                    <div>Minimum Contribution: {minContribution} wei</div>
                    <div>No Of People Contributed: {numberOfContributions}</div>
                </div>
            </div>
            <div className={`d-flex flex-column justify-content-between
                            align-items-center ${styles.descriptionBox}`}>
                <h5 className={`text-secondary`}>Description</h5>
                <div className={`w-100 w-md-75 text-center ${styles.description}`}>{description}</div>
                <Form className='d-flex mb-3'>
                    <Form.Group className="">
                        <Form.Control className={styles.input} type="number" 
                        placeholder={`${donation} wei`} onChange={(e) => setDonation(e.target.value)}/>
                    </Form.Group>
                    <Button className={`${styles.btn1} ms-2`} onClick={handleDonation}>Contribute</Button>
                </Form>
            </div>
            <div className={`d-flex flex-column flex-lg-row justify-content-between w-md-50`}>
                <div className={`d-flex flex-column align-items-center align-items-md-start mt-3`}>
                    <div>People Rated: {numberOfRatings}</div>
                    <Button className={`mt-2 ${styles.button} ${styles.btn1}`}>Rate</Button>
                </div>
                <div className={`d-flex flex-column align-items-center align-items-md-end mt-3`}>
                    <div>People Voted For Ban: {numberOfVotesForBan}</div>   
                    <Button className={`mt-2 ${styles.button} ${styles.btn2}`}>Ban</Button>
                </div>
            </div>
        </div>
     );
}
 
export default request;


export async function getServerSideProps(context) {
    const id = context.params.id;
    const data = 
        {
            walletId: 'AABA11924',
            rating: 3,
            demandedAmount: 100000,
            totalContributed: 50000,
            description: 'abcdef',
            recipientWalletId: 'AABACADA',
            minContribution: 500,
            numberOfContributions: 10,
            numberOfVotesForBan: 3,
            numberOfRatings: 3
        }

    return {
      props: {
          data
      }, 
    }
  }