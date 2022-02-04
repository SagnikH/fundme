import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import BackgroundGlass from "./BackgroundGlass";
import styles from '../styles/Layout.module.css';

export default function Layout(props) {
  return (
      <div className={`d-flex flex-column justify-content-between min-vh-100 ${styles.background}`}>
        <NavigationBar/>
        <BackgroundGlass>
        {props.children}
        </BackgroundGlass>
        <Footer/>
      </div>
  );
}
