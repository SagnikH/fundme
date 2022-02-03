import styles from '../../styles/SingleRequest.module.css';
import { useRouter } from 'next/router'

const request = () => {
    const router = useRouter();
    const {id} = router.query;

    return ( 
        <div className={styles.singleRequest}>
            Hello World
        </div>
     );
}
 
export default request;