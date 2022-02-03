import styles from '../styles/Requests.module.css';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const requests = ({data}) => {
    return ( 
        <div className={styles.requests}>
            <div className='ms-3 mb-5'>
                <Link href='/newRequest'>
                    <Button variant='success'>Create New Request</Button>
                </Link>
            </div>
            <div>
                {data.map((el, i) => {
                    return (
                        <div key={i} className={styles.listItem}>
                            <div className='d-flex flex-column'>
                                <div>Requested by: {el.walletId}</div>
                                <div>Rating: {el.rating}</div>
                            </div>
                            <div className='d-flex flex-column'>
                                <div>Minimum Contribution: {el.minContribution}</div>
                                <div>Demanded Amount: {el.demandedAmount}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default requests;

export async function getServerSideProps(context) {
    const data = [
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        },
        {
            walletId: 'AABA11924',
            rating: 3,
            minContribution: 500,
            demandedAmount: 100000
        }
    ]
    return {
      props: {
          data: data
      }, 
    }
  }