import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function Layout(props) {
  return (
      <div className='d-flex flex-column justify-content-between min-vh-100'>
        <NavigationBar/>
        {props.children}
        <Footer/>
      </div>
  );
}
