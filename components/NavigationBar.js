import { Nav, Navbar, Container, Button } from "react-bootstrap";
import styles from "../styles/Navigation.module.css";
import Link from "next/link";
import web3 from "../ethereum/web3";

export default function NavigationBar() {
	const connect = async (e) => {
    e.preventDefault();

		try {
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log("received eth wallets", accounts);
			const ether = await web3.eth.getBalance(accounts[0]);
			console.log("ether in account", ether);
      window.alert("connected to metamask");
		} catch (e) {
			if (e.code === 4001) {
				console.log("Please connect to metamask");
			} else {
				console.error(e.message);
        window.alert("You need metamask installed!!!");
			}
		}
	};

	return (
		<Navbar className={styles.navbar} expand="lg">
			<Container>
				<Link href="/">
					<Navbar.Brand href="#home" className={styles.logo}>
						FundUs
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
						{/* <Link href="/signIn">
							<a className={styles.text}>Sign In</a>
						</Link> */}
            <Button className={styles.text} onClick={connect}>Connect</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
