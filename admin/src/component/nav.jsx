import { useNavigate } from "react-router-dom";
import Logo from '../assets/vcart-logo.png';
import axios from 'axios';
import { useContext } from "react";
import { authDataContext } from "../context/authContext";
import { adminDataContext } from "../context/adminContext";


function Nav() {
    let navigate = useNavigate();
    let { serverUrl } = useContext(authDataContext);
    let { getAdmin } = useContext(adminDataContext);

    const logOut = async () => {
        try {
            const result = axios.get(`${serverUrl}/api/auth/logout`,
                { withCredentials:true }
            )
            console.log(result.data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
           <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed
        top-0 flex items-center justify-between px-[30px] shadow-md
        shadow-black">

                <div className="w-[30%] flex items-center
                justify-start gap-[10px] cursor-pointer"
                onClick={()=>navigate("/")}>
                    <img src={Logo} alt="" className="w-[30px]"/>
                    <h1 className="text-[25px] text-black font-sans">
                        OneMart
                    </h1>
                </div>

                <button className="text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer
                    bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white"
                    onClick={logOut}>LogOut</button>
                
            </div> 
        </>
    )
}

export default Nav; 