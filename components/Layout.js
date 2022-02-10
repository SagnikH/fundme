import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import BackgroundGlass from "./BackgroundGlass";
import styles from "../styles/Layout.module.css";
import { useEffect, useState } from "react";

export default function Layout(props) {
	return (
		<div className={`d-flex flex-column justify-content-between min-vh-100 ${styles.background}`}>
			<NavigationBar setAccount={props.setAccount} />
			<BackgroundGlass>{props.children}</BackgroundGlass>
			<Footer />
		</div>
	);
}
