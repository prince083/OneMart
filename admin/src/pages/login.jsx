import Logo from '../assets/vcart-logo.png'
import { useState,
    useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/authContext.jsx';

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { adminDataContext } from '../context/adminContext.jsx';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { serverUrl } = useContext(authDataContext);
    const { adminData, getAdmin } = useContext(adminDataContext);

    const AdminLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${serverUrl}/api/auth/adminlogin`, {
                email,
                password
            }, { withCredentials: true });
            console.log("Login successful:", result.data);
            toast.success("Admin Login Successful!");
            getAdmin();
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            toast.error('Login Failed. Please check your credentials.');
        }
    }


    return (
        <>
            <div className="w-[100%] max-h-fit bg-blue-950 pb-10">
                <div className='flex justify-start items-center gap-3 hover:cursor-pointer
                p-3' >
                    <img className=" w-[50px] h-[50px]" src={Logo} alt="" />
                    <h1 className='text-white font-sans'>OneMart</h1>
                </div>

                <div className='flex flex-col justify-center items-center gap-3 mt-10'>
                    <h1 className='text-white font-sans text-3xl font-bold'>Login to Your Account</h1>
                    <p className='text-white font-sans'>OneMart Admin login</p>
                </div>
                <div className='max-w-[600px] w-[90%] h-[400px] bg-white border-1 rounded-lg border-gray-300
                backdrop:blur-2xl shadow-lg mt-8 mx-auto px-5 py-8 flex flex-col'>
                    <form onSubmit={AdminLogin}
                        className='flex flex-col justify-center items-center gap-3 mt-8 relative'>
                        <label>
                            <p className='font-sans text-gray-600 font-semibold'>Email</p>
                            <input className='w-[300px] h-[40px] border-1 border-gray-300 rounded-md
                        outline-none px-2 hover:bg-gray-100'
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            <p className='font-sans text-gray-600 font-semibold'>Password</p>
                            <input className='w-[300px] h-[40px] border-1 border-gray-300 rounded-md
                        outline-none px-2 hover:bg-gray-100 relative'
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {!showPassword ? <FaRegEye className='absolute right-22 top-30 transform -translate-y-1/2 text-gray-600'
                                onClick={() => setShowPassword(true)} /> : null}
                            {showPassword ? <FaEyeSlash className='absolute right-22 top-30 transform -translate-y-1/2 text-gray-600'
                                onClick={() => setShowPassword(false)} /> : null}
                        </label>
                        <button className='w-[300px] h-[40px] bg-blue-950 text-white font-sans
                    rounded-md hover:bg-blue-800'>Login</button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;