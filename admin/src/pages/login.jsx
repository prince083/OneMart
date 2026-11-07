import Logo from '../assets/vcart-logo.png'
import {
    useState,
    useContext,
    useEffect
} from 'react';
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
    const { adminData, getAdmin, setAdminData } = useContext(adminDataContext);

    useEffect(() => {
        if (adminData) {
            navigate("/");
        }
    }, [adminData, navigate]);

    const AdminLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${serverUrl}/api/auth/adminlogin`, {
                email,
                password
            }, { withCredentials: true });

            if (!result.data.token) {
                toast.error('Login Failed. No token received.');
                return;
            }

            localStorage.setItem("admin-token", result.data.token);
            // Set adminData directly — don't call getAdmin() here, it would
            // reset state if the network request fails mid-login
            setAdminData({ email, role: 'admin' });
            toast.success("Admin Login Successful!");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.response?.data?.msg || 'Login Failed. Please check your credentials.');
        }
    }


    return (
        <>
            <div className="w-[100%] min-h-screen bg-gradient-to-l from-blue-300 to-blue-100 pb-10">
                <div className='flex justify-start items-center gap-3 hover:cursor-pointer p-4' onClick={() => navigate('/')}>
                    <img className="w-[40px] h-[40px]" src={Logo} alt="" />
                    <h1 className='text-2xl text-black font-sans font-bold'>
                        OneMart <span className='text-sm font-semibold text-orange-500 ml-1'>Admin</span>
                    </h1>
                </div>

                <div className='flex flex-col justify-center items-center gap-2 mt-8'>
                    <h1 className='text-gray-900 font-sans text-3xl font-bold'>Login to Your Account</h1>
                    <p className='text-gray-600 font-sans text-base'>OneMart Admin Portal</p>
                </div>
                <div className='max-w-[480px] w-[90%] bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl mt-8 mx-auto px-6 py-8 flex flex-col'>
                    <form onSubmit={AdminLogin}
                        className='flex flex-col justify-center items-center gap-4 mt-4 relative'>
                        <label className='w-full max-w-[320px]'>
                            <p className='font-sans text-gray-700 font-medium mb-1'>Email</p>
                            <input className='w-full h-[42px] border border-gray-300 rounded-lg
                        outline-none px-3 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-gray-800'
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className='w-full max-w-[320px] relative'>
                            <p className='font-sans text-gray-700 font-medium mb-1'>Password</p>
                            <input className='w-full h-[42px] border border-gray-300 rounded-lg
                        outline-none px-3 pr-10 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-gray-800'
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {!showPassword ? (
                                <FaRegEye className='absolute right-3 top-[38px] text-gray-500 cursor-pointer'
                                    onClick={() => setShowPassword(true)} />
                            ) : (
                                <FaEyeSlash className='absolute right-3 top-[38px] text-gray-500 cursor-pointer'
                                    onClick={() => setShowPassword(false)} />
                            )}
                        </label>
                        <button className='w-full max-w-[320px] h-[42px] bg-orange-500 hover:bg-orange-600 text-white font-semibold font-sans
                    rounded-xl shadow-md transition-colors cursor-pointer mt-2'>Login</button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;