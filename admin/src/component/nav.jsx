import { useNavigate } from "react-router-dom";
import Logo from '../assets/vcart-logo.png';
import axios from 'axios';
import { useContext } from "react";
import { authDataContext } from "../context/authContext";
import { adminDataContext } from "../context/adminContext";


function Nav() {
    let navigate = useNavigate();
    let { serverUrl } = useContext(authDataContext);
    let { setAdminData } = useContext(adminDataContext);

    const logOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("admin-token");
            setAdminData(null);
            navigate("/login");
        }
    }
    return (
        <>
           <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed
        top-0 flex items-center justify-between px-[30px] shadow-md border-b border-gray-200/50 backdrop-blur-md">

                <div className="w-[30%] flex items-center
                justify-start gap-2.5 cursor-pointer"
                onClick={()=>navigate("/")}>
                    <img src={Logo} alt="" className="w-[30px]"/>
                    <h1 className="text-2xl text-black font-sans font-bold">
                        OneMart <span className="text-sm font-semibold text-orange-500 ml-1">Admin</span>
                    </h1>
                </div>

                <button className="text-[15px] bg-black hover:bg-orange-500 text-white font-medium
                    py-2 px-6 rounded-full cursor-pointer transition-colors shadow-sm"
                    onClick={logOut}>LogOut</button>
                
            </div> 
        </>
    )
}

export default Nav; 