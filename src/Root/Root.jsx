import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Root = () => {
    return (
        <div className="bg-[#090b0e] text-gray-100 min-h-screen ">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Root;