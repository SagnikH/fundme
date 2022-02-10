import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {

	return (
		<>
    <h1 color="red">Account: {props.currentAccount}</h1>
			<div className={styles.index}>
					Hello world
			</div>
		</>
	);
}