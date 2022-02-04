import styles from '../styles/BackgroundGlass.module.css'

const BackgroundGlass = (props) => {
    return ( 
        <div className={styles.glass}>
            {props.children}
        </div>
     );
}
 
export default BackgroundGlass;