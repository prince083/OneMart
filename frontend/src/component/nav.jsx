import logo from '../assets/vcart-logo.png'
import axios from 'axios'
import {
    IoSearch,
    IoSearchCircleSharp
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { BiCollection } from "react-icons/bi";
import { MdContacts } from "react-icons/md";

import { useContext, useState } from 'react';
import { UserDataContext } from '../context/userContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/shopContext';
import { toast } from 'react-toastify';
import Ai from './ai';


function Nav() {
    let { getCurrentUser, userData, setUserData } = useContext(UserDataContext);
    let { serverUrl } = useContext(authDataContext);
    let navigate = useNavigate();
    let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
    let [showProfile, setShowProfile] = useState(false);

    const navItems = [
        { path: "/", label: "HOME" },
        { path: "/collection", label: "COLLECTION" },
        { path: "/about", label: "ABOUT" },
        { path: "/contact", label: "CONTACT" },
    ];

    const handleLogout = async (params) => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`,
                { withCredentials: true, }
            )
            console.log(result.data);
            localStorage.removeItem("token");
            setUserData(null);
            navigate("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-[100%] h-[70px] bg-[#ecfafaec] z-10 fixed
        top-0 flex items-center justify-between px-[30px] shadow-md">

            <div className="w-[20%] lg-w-[30%] flex items-center justify-start
            gap-2.5">
                <img src={logo}
                    alt=""
                    className='w-[30px]' />
                <h1 className='text-2xl text-black
                font-sans font-bold'>OneMart</h1>
            </div>
            <div className='w-[50%] lg:w-[40%] hidden md:flex'>
                <ul className="flex items-center justify-start gap-4.5">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `cursor-pointer py-2.5 px-5 border-b-4 ${isActive
                                        ? "text-black border-orange-500"
                                        : "text-gray-500 border-transparent hover:text-black"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='w-[30%] flex items-center justify-end
            gap-5'>
                {showSearch ? <IoSearchCircleSharp className='w-[38px] h-[38px] text-orange-500 cursor-pointer'
                    onClick={() => setShowSearch(prev => !prev)} /> :
                    <IoSearch className='w-[38px] h-[38px] text-orange-500 cursor-pointer'
                        onClick={() => { setShowSearch(prev => !prev); navigate("/collection"); }} />}

                {!userData && <CgProfile className='w-[38px] h-[38px] text-orange-500 cursor-pointer'
                    onClick={() => setShowProfile(prev => !prev)} />}
                {userData && <div className='w-[30px] h[30px] bg-[#080808] text-white
                rounded-full flex items-center justify-center cursor-pointer'
                    onClick={() => setShowProfile(prev => !prev)}>
                    {userData?.name.slice(0, 1)}
                </div>}

                <MdOutlineShoppingCart className='w-[38px] h-[38px] text-orange-500 cursor-pointer hidden md:block'
                    onClick={() => { navigate("/cart") }} />
                <p className=' absolute w-4.5 h-4.5 items-center
                justify-center bg-black px-[5px] py-[2px] text-white
                rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>{getCartCount()}</p>

            </div>

            {showSearch && <div className='w-[100%] h-[80px] bg-orange-100
            absolute top-[100%] left-0 right-0 flex items-center
            justify-center'>
                <input type="text" className='w-[50%] h-[60%] bg-white
                rounded-[30px] px-[50px]
                placeholder:text-gray-200 text-gray-400 text-4.5'
                    placeholder='Search here'
                    onChange={(e) => { setSearch(e.target.value) }}
                    value={search} />
            </div>}

            {showProfile && <div className='absolute w-[220px] h-fit bg-white
            top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[8px]
            z-10'>
                <ul className='w-[100%] h-[100%] flex items-start
                justify-around flex-col text-[17px] py-[10px] text-black'>
                    {!userData && <li className='w-[100%] hover:bg-orange-100 px-[15px]
                    py-[10px] cursor-pointer'
                        onClick={() => {
                            navigate("/login");
                            setShowProfile(false);
                        }}>Login</li>}
                    <li className='w-[100%] hover:bg-orange-100 px-[15px]
                    py-[10px] cursor-pointer'
                        onClick={() => {
                            navigate("/order");
                            setShowProfile(false);
                        }}>Orders</li>
                    <li className='w-[100%] hover:bg-orange-100 px-[15px]
                    py-[10px] cursor-pointer'
                        onClick={() => {
                            navigate("/about");
                            setShowProfile(false);
                        }}>About</li>
                    {userData && <li className='w-[100%] hover:bg-orange-100 px-[15px]
                    py-[10px] cursor-pointer'
                        onClick={() => {
                            handleLogout();
                            setShowProfile(false);
                            navigate('/login');
                        }}>LogOut</li>}
                </ul>
            </div>}

            <div className='w-[75vw] h-[65px] flex items-center
            justify-between px-[20px] text-[12px]
            fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#ecfafaec] md:hidden rounded-full z-10'>
                <button className='text-black flex items-center
                justify-center flex-col gap-[2px]'
                    onClick={() => { navigate("/") }}>
                    <IoMdHome className='w-[25px] h-[25px] text-orange-500 md:hidden' />
                    Home
                </button>
                <button className='text-black flex items-center
                justify-center flex-col gap-[2px]'
                    onClick={() => { navigate("/collection") }}>
                    <BiCollection className='w-[25px] h-[25px] text-orange-500 md:hidden' />
                    Collections
                </button>
                <button className='text-black flex items-center
                justify-center flex-col gap-[2px]'
                    onClick={() => { navigate("/contact") }}>
                    <MdContacts className='w-[25px] h-[25px] text-orange-500 md:hidden' />
                    Contact
                </button>
                <button className='text-black flex items-center
                justify-center flex-col gap-[2px]'
                    onClick={() => { navigate("/cart") }}>
                    <MdOutlineShoppingCart className='w-[25px] h-[25px] text-orange-500 md:hidden' />
                    Cart
                </button>
                <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-black px-[5px] py-[2px] text-white font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>
                    {getCartCount()}
                </p>

            </div>

        </div>
    )
}

export default Nav;