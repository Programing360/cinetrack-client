import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
    return (
        <div className="bg-[#090b0e] text-gray-100 min-h-screen ">
            <Navbar/>
            <Outlet/>
            <Footer></Footer>
        </div>
    );
};

export default Root;