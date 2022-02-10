import styles from "../../styles/SingleRequest.module.css";
import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Request from "../../utils/request";

const request = (props) => {
	const router = useRouter();
	const { id } = router.query;

	const {
		walletId,
		rating,
		demandedAmount,
		description,
		recipientWalletId,
		minContribution,
		numberOfContributions,
		numberOfVotesForBan,
		numberOfRatings,
		totalContributed,
	} = props.data;

	const [donation, setDonation] = useState(minContribution);
	const [RequestObj, setRequest] = useState(null);
	const [givenRating, setGivenRating] = useState(5);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		//start loading state here
		setRequest(new Request(id));
		setLoading(true);
	}, []);

	useEffect(() => {
		(async () => {
			try {
				if (RequestObj) {
					await RequestObj.init();
					console.log("done init");
				}
				//stop loading here
			} catch (e) {
				//maybe set an error flag or something
				console.error(e.message);
			} finally {
				setLoading(false);
			}
		})();
	}, [RequestObj]);

	const handleDonation = async (e) => {
		e.preventDefault();

		if (!loading) {
			try {
				if (props.currentAccount === null) {
					window.alert("Connect to metamask");
				} else {
					setLoading(true);
					await RequestObj.contribute(donation, props.currentAccount);
				}
				//try refereshing for getserverside props update
			} catch (e) {
        console.error(e.message);
			} finally {
        setLoading(false);
        router.reload(window.location.pathname);
			}
		}
	};

	const handleRating = async (e) => {
		e.preventDefault();

		if (!loading) {
			try {
				if (props.currentAccount === null) {
					window.alert("Connect to metamask");
				} else {
					console.log("rating started");
					setLoading(true);
					await RequestObj.rate(givenRating, props.currentAccount);
				}
				//TODO: try refereshing for getserverside props update
			} catch (e) {
				console.error(e.message);
			} finally {
				console.log("rating done");
				setLoading(false);
				router.reload(window.location.pathname);
			}
		}
	};

	const handleBans = async (e) => {
		e.preventDefault();

		if (!loading) {
			try {
				if (props.currentAccount === null) {
					window.alert("Connect to metamask");
				} else {
					console.log("bans started");
					setLoading(true);
					await RequestObj.banRequest(props.currentAccount);
				}
				//TODO: try refereshing for getserverside props update
			} catch (e) {
				console.error(e.message);
			} finally {
				console.log("bans done");
				setLoading(false);
				router.reload(window.location.pathname);
			}
		}
	};

	return (
		<div
			className={`${styles.singleRequest} d-flex flex-column justify-content-between
                        align-items-center m-auto`}
		>
			<div className={`d-flex flex-column flex-lg-row justify-content-between w-75`}>
				<div className={``}>
					<div className={``}>Requested By: {walletId}</div>
					<div>Rating: {rating}</div>
					<div className={`mt-4`}>Recipient: {recipientWalletId}</div>
				</div>
				<div className={``}>
					<div>Total Demanded: {demandedAmount} wei</div>
					<div>Total Contribution: {totalContributed} wei</div>
					<div>Minimum Contribution: {minContribution} wei</div>
					<div>No Of People Contributed: {numberOfContributions}</div>
				</div>
			</div>
			<div
				className={`d-flex flex-column justify-content-between
                            align-items-center ${styles.descriptionBox}`}
			>
				<h5 className={`text-secondary`}>Description</h5>
				<div className={`w-75 text-center ${styles.description}`}>{description}</div>
				<Form className="d-flex mb-3">
					<Form.Group className="">
						<Form.Control
							className={styles.input}
							type="number"
							placeholder={`${donation} wei`}
							onChange={(e) => setDonation(e.target.value)}
						/>
					</Form.Group>
					<Button className={`${styles.btn1} ms-2`} onClick={handleDonation}>
						Contribute
					</Button>
				</Form>
			</div>
			<div className={`d-flex flex-column flex-lg-row justify-content-between w-50`}>
				<div>
					<div>People Rated: {numberOfRatings}</div>
					{/*TODO: need a input field */}
					<Button className={`mt-2 ${styles.button} ${styles.btn1}`} onClick={handleRating}>
						Rate
					</Button>
				</div>
				<div className={`d-flex flex-column align-items-end`}>
					<div>People Voted For Ban: {numberOfVotesForBan}</div>
					<Button className={`mt-2 ${styles.button} ${styles.btn2}`} onClick={handleBans}>
						Ban
					</Button>
				</div>
			</div>
		</div>
	);
};

export default request;

export async function getServerSideProps(context) {
	const id = context.params.id;
	console.log("data for request", id);

	const request = new Request(id);
	let data = "",
		error = "";
	try {
		await request.init();
		data = await request.getSummaryInfo();
	} catch (e) {
		console.error(e.message);
		error = e.message;
	}

	// const data = {
	// 	walletId: "AABA11924",
	// 	rating: 3,
	// 	description: "abcdef",
	// 	recipientWalletId: "AABACADA",
	// 	minContribution: 500,
	// 	demandedAmount: 100000,
	// 	totalContributed: 50000,
	// 	numberOfVotesForBan: 3,
	// 	numberOfRatings: 3,
	// 	numberOfContributions: 10,
	// };

	return {
		props: {
			data,
			error,
		},
	};
}
