import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext'
import axios from 'axios'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
function Customize2() {
    const{userData ,backendImage, selectedImage,serverUrl,setUserData}=useContext(userDataContext)
    const[assistantName,setAssistantName]=useState(userData?.Assistantname||"")
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)
    const handleUpdateAssistant = async ()=>{
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("assistantName",assistantName)
            if(backendImage){
                  formData.append("assistantImage" , backendImage)
            }else{
                formData.append("imageUrl",selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
           setLoading(false)
            console.log(result.data)
            setUserData(result.data)
            navigate("/")
            

        } catch (error) {
            setLoading(false)
         console.log(error)   
        }
    }

  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-[#030236] relative flex justify-center items-center flex-col p-[20px] gap-[20px]'>
       <IoIosArrowRoundBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer 'onClick={()=>{navigate("/customize")}} />
       <h1 className='text-white text-[30px] mb-[30px] text-center '>Enter Your <span className='text-blue-200'>Assisstant Name</span></h1>
   <input type="text" placeholder='Enter your Assistant name' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' onChange={(e)=>setAssistantName(e.target.value)} value={assistantName} />
  {assistantName &&  <button className='min-w-[150px] h-[40px] p-[10px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] cursor-pointer flex justify-center items-center'disabled ={loading} onClick={()=>{

    handleUpdateAssistant()
  }}>{!loading?"Create Your Assistant":"Loading"}</button>}
  
    </div>
  )
}

export default Customize2
