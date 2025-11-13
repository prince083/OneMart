import Logo from '../assets/vcart-logo.png'
import GoogleLogo from '../assets/Google-Logo.png'
import { useState,
    useEffect,
    useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/authContext.jsx';
import { UserDataContext } from '../context/userContext.jsx';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase.js';

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { serverUrl } = useContext(authDataContext);
    let { getCurrentUser } = useContext(UserDataContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${serverUrl}/api/auth/login`, {
                email,
                password
            }, { withCredentials: true });
            console.log("Login successful:", result.data);
            toast.success("Login Successful!");
            getCurrentUser();
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            toast.error('Login Failed. Please check your credentials.');
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const name = user.displayName;
            const email = user.email;

            const result = await axios.post(`${serverUrl}/api/auth/googleLogin`, {
                name,
                email
            }, { withCredentials: true });
            console.log("Google sign-in successful:", result.data);
            toast.success("Google Login Successful!");
            getCurrentUser();
            navigate("/");
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            toast.error('Google Login Failed. Please try again.');
        }
    }


    return (
        <>
            <div className="w-[100%] max-h-fit bg-blue-950 pb-10">
                <div className='flex justify-start items-center gap-3 hover:cursor-pointer
                p-3' onClick={() => navigate('/')}>
                    <img className=" w-[50px] h-[50px]" src={Logo} alt="" />
                    <h1 className='text-white font-sans'>OneMart</h1>
                </div>

                <div className='flex flex-col justify-center items-center gap-3 mt-10'>
                    <h1 className='text-white font-sans text-3xl font-bold'>Login to Your Account</h1>
                    <p className='text-white font-sans'>Login with your email and password</p>
                </div>
                <div className='max-w-[450px] w-[60%] max-h-fit bg-white border-1 rounded-lg border-gray-300
                backdrop:blur-2xl shadow-lg mt-8 mx-auto px-5 py-8 flex flex-col'>
                    <form onSubmit={handleLogin}
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
                            {!showPassword ? <FaRegEye className='absolute right-5 top-30 transform -translate-y-1/2 text-gray-600'
                                onClick={() => setShowPassword(true)} /> : null}
                            {showPassword ? <FaEyeSlash className='absolute right-5 top-30 transform -translate-y-1/2 text-gray-600'
                                onClick={() => setShowPassword(false)} /> : null}
                        </label>
                        <button className='w-[300px] h-[40px] bg-blue-950 text-white font-sans
                    rounded-md hover:bg-blue-800'>Login</button>
                        <p className='font-sans text-gray-600'>Don't have an account?
                            <span className='text-blue-950 font-semibold hover:cursor-pointer'
                                onClick={() => navigate('/register')}> Register</span></p>

                        <hr className='w-[300px] border-1 border-gray-300 my-4' />
                        <button className='w-[300px] h-[40px] text-white font-sans
                    rounded-md border-1 border-gray-300 cursor-pointer hover:bg-gray-100 flex justify-center items-center gap-3'
                                onClick={handleGoogleLogin}>
                            <img src={GoogleLogo}
                                alt="no Image load"
                                className='w-[20px] h-[20px]' />
                            <p className='text-gray-600'>Login with Google</p>
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;
