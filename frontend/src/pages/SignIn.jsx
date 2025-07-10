
import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios';

function SignIn() {
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const { serverUrl, userData, setUserData } = useContext(userDataContext);
    const [err, setErr] = useState("")
    const handleSignIn = async (e) => {
        e.preventDefault()
        setErr("")
        setLoading(true);
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email, password
            }, { withCredentials: true })
            setUserData(result.data)
            setLoading(false)
            navigate("/")
        } catch (error) {
            setUserData(null)
            setErr(error.response.data.message)
            setLoading(false)
        }
    }
    return (
        <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>
            <form className='w-[90%] h-[600px] max-w-[600px] bg-[#00000062] backdrop-blur  shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignIn}>
                <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Sign In to <span className='text-blue-400'>Virtual Assistant</span></h1>

                <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email} />

                <div className='w-full h-[60px] bg-transparent text-white text-[18px] relative'>
                    <input type={showPassword ? "password" : "text"} placeholder='Password' className='w-full h-full outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setPassword(e.target.value)} value={password} />
                    {showPassword && <IoIosEye className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(false)} />}
                    {!showPassword && <IoIosEyeOff className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(true)} />}
                </div>
                {err && <p className='text-red-500 text-[17px]'>*{err}</p>}
                <button className='min-w-[150px] h-[40px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] cursor-pointer' disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
                <p className='text-white text-[18px]'>Want To Create A New Account?<span className='text-blue-400 cursor-pointer ' onClick={() => navigate("/signup")}>Sign Up</span></p>
            </form>
        </div>
    )
}

export default SignIn
