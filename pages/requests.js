import styles from "../styles/Requests.module.css";
import { Button } from "react-bootstrap";
import Link from "next/link";
import requestList from "../utils/requestsList";


const requests = ({ data }) => {
	return (
		<div className={styles.requests}>
			<div className="ms-3 mb-5">
				<Link href="/newRequest">
					<Button className={styles.button}>Create New Request</Button>
				</Link>
			</div>
			<div>
				{data.map((el, i) => {
					const linkUrl = "/request/" + el.id;
					return (
						<Link key={i} href={linkUrl}>
							<a className={styles.listItem}>
								<div className="d-flex flex-column pe-2">
									<div>Requested by: {el.walletId}</div>
									<div>Rating: {el.rating}</div>
								</div>
								<div className="d-flex flex-column ps-2">
									<div>Minimum Contribution: {el.minContribution}</div>
									<div>Demanded Amount: {el.demandedAmount}</div>
								</div>
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default requests;

export async function getServerSideProps(context) {
	const requests = await requestList();

	// const data = [
	//     {
	//         id: 1,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 2,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 3,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 4,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 5,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 6,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 7,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 8,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 9,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     },
	//     {
	//         id: 10,
	//         walletId: 'AABA11924',
	//         rating: 3,
	//         minContribution: 500,
	//         demandedAmount: 100000
	//     }
	// ]
	return {
		props: {
			data: requests,
		},
	};
}
