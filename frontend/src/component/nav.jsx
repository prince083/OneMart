import logo from '../assets/vcart-logo.png'
import axios from 'axios'
import { IoSearch,
    IoSearchCircleSharp
 } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { BiCollection } from "react-icons/bi";
import { MdContacts } from "react-icons/md";

import { useContext, useState } from 'react';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/shopContext';
import { toast } from 'react-hot-toast';


function Nav() {
    let { getCurrentUser, userData, setUserData } = useContext(UserDataContext);
    let { serverUrl } = useContext(authDataContext);
    let navigate = useNavigate();
    let { showSearch, setShowSearch, search, setSearch,getCartCount} = useContext(shopDataContext);
    let [ showProfile, setShowProfile ] = useState(false);

    const handleLogout = async (params) => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`,
                { withCredentials: true, }
            )
            console.log(result.data);
            // getCurrentUser();
            setUserData(null);
            navigate("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-[100%] h-[70px] bg-[#ecfafaec] z-10 fixed
        top-0 flex items-center justify-between px-[30px] shadow-md
        shadow-black">

            <div className="w-[20%] lg-w-[30%] flex items-center justify-start
            gap-2.5">
                <img src={logo}
                alt=""
                className='w-[30px]' />
                <h1 className='text-5.5 text-black
                font-sans font-bold'>OneMart</h1>
            </div>
            <div className='w-[50%] lg-w-[40%] hidden md:flex'>
                <ul className='flex items-center justify-center
                gap-4.5 text-white'>

                    <li className='test-3.5 hover:bg-slate-500
                    cursor-pointer bg-[#000000c9] py-2.5 px-5
                    rounded-2xl '
                    onClick={()=>{navigate("/")}}>HOME</li>

                    <li className='test-3.5 hover:bg-slate-500
                    cursor-pointer bg-[#000000c9] py-2.5 px-5
                    rounded-2xl '
                    onClick={()=>{navigate("/collection")}}>COLLECTION</li>

                    <li className='test-3.5 hover:bg-slate-500
                    cursor-pointer bg-[#000000c9] py-2.5 px-5
                    rounded-2xl '
                    onClick={()=>{navigate("/about")}}>ABOUT</li>

                    <li className='test-3.5 hover:bg-slate-500
                    cursor-pointer bg-[#000000c9] py-2.5 px-5
                    rounded-2xl '
                    onClick={()=>{navigate("/contact")}}>CONTACT</li>
                </ul>
            </div>
            <div className='w-[30%] flex items-center justify-end
            gap-5'>
                {showSearch ? <IoSearchCircleSharp className='w-[38px] h-[38px] text-[#000000] cursor-pointer'
                onClick={()=>setShowSearch(prev=>!prev)} /> :
                <IoSearch className='w-[38px] h-[38px] text-[#000000] cursor-pointer'
                onClick={()=>{setShowSearch(prev=>!prev); navigate("/collection");}} />}

                {!userData && <CgProfile className='w-[38px] h-[38px] text-[#000000] cursor-pointer'
                onClick={()=>setShowProfile(prev=>!prev)}/>}
                {userData && <div className='w-[30px] h[30px] bg-[#080808] text-white
                rounded-full flex items-center justify-center cursor-pointer'
                onClick={()=>setShowProfile(prev=>!prev)}>
                    {userData?.name.slice(0,1)}
                </div>}

                <MdOutlineShoppingCart className='w-[38px] h-[38px] text-[#000000] cursor-pointer hidden md:block'
                onClick={()=>{navigate("/cart")}} />
                <p className=' absolute w-4.5 h-4.5 items-center
                justify-center bg-black px-[5px] py-[2px] text-white
                rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>{getCartCount()}</p>
            
            </div>
            
            {showSearch && <div className='w-[100%] h-[80px] bg-[#d8f6f9dd]
            absolute top-[100%] left-0 right-0 flex items-center
            justify-center'>
                <input type="text" className='w-[50%] h-[60%] bg-[#233533] 
                rounded-[30px] px-[50px]
                placeholder:text-white text-white text-4.5'
                placeholder='Search here'
                onChange={(e)=>{setSearch(e.target.value)}}
                value={search} />
            </div>}

            {showProfile && <div className='absolute w-[220px] h-fit bg-[#000000d7]
            top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px]
            z-10'>
                <ul className='w-[100%] h-[100%] flex items-start
                justify-around flex-col text-[17px] py-[10px] text-white'>
                    {!userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px]
                    py-[10px] cursor-pointer'
                    onClick={()=>{
                        navigate("/login");
                        setShowProfile(false);
                    }}>Login</li>}
                    <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px]
                    py-[10px] cursor-pointer'
                    onClick={()=>{
                        navigate("/order");
                        setShowProfile(false);
                    }}>Orders</li>
                    <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px]
                    py-[10px] cursor-pointer'
                    onClick={()=>{
                        navigate("/about");
                        setShowProfile(false);
                    }}>About</li>
                    {userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px]
                    py-[10px] cursor-pointer'
                    onClick={()=>{handleLogout();
                        setShowProfile(false);
                        navigate('/login');
                    }}>LogOut</li>}
                </ul>
            </div>}

            <div className='w-[100vw] h-[90px] flex items-center
            justify-between px-[20px] text-[12px]
            fixed bottom-0 left-0 bg-[#191818] md:hidden'>
                <button className='text-white flex items-center
                justify-center flex-col gap-[2px]'
                onClick={()=>{navigate("/")}}>
                    <IoMdHome className='w-[25px] h-[25px] text-[white] md:hidden' />
                    Home
                </button>
                <button className='text-white flex items-center
                justify-center flex-col gap-[2px]'
                onClick={()=>{navigate("/collection")}}>
                    <BiCollection className='w-[25px] h-[25px] text-[white] md:hidden' />
                    Collections
                </button>
                <button className='text-white flex items-center
                justify-center flex-col gap-[2px]'
                onClick={()=>{navigate("/contact")}}>
                    <MdContacts className='w-[25px] h-[25px] text-[white] md:hidden' />
                    Contact
                </button>
                <button className='text-white flex items-center
                justify-center flex-col gap-[2px]'
                onClick={()=>{navigate("/cart")}}>
                    <MdOutlineShoppingCart className='w-[25px] h-[25px] text-[white] md:hidden' />
                    Cart
                </button>
                <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>
                    {getCartCount()}
                </p>

            </div>

        </div>
    )
}

export default Nav;