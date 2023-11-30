import { Outlet } from "react-router-dom";
import NavBar from "./Components/Home/NavBar";
import Footer from "./Components/Footer";


const Root = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Root;