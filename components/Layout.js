import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import BackgroundGlass from "./BackgroundGlass";

export default function Layout(props) {
  return (
      <div className='d-flex flex-column justify-content-between min-vh-100'>
        <NavigationBar/>
        <BackgroundGlass>
        {props.children}
        </BackgroundGlass>
        <Footer/>
      </div>
  );
}
