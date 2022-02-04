import { Nav, Navbar, Container } from "react-bootstrap";
import styles from "../styles/Navigation.module.css";
import Link from "next/link";

export default function NavigationBar() {
	const connect = async () => {
		try {
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log("received eth wallets", accounts);
			const ether = await web3.eth.getBalance(accounts[0]);
			console.log("ether in account", ether);
		} catch (e) {
			if (e.code === 4001) {
				console.log("Please connect to metamask");
			} else {
				console.error(e.message);
			}
		}
	};

	return (
		<Navbar className={styles.navbar} expand="lg">
			<Container>
				<Link href="/">
					<Navbar.Brand href="#home" className={styles.logo}>
						LetsContribute
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Link href="/">
							<a className={styles.text}>Home</a>
						</Link>
						<Link href="/requests">
							<a className={styles.text}>Requests</a>
						</Link>
						<Link href="/aboutUs">
							<a className={styles.text}>About Us</a>
						</Link>
						<Link href="/signIn">
							<a className={styles.text}>Sign In</a>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
