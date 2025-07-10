import React, { useContext, useState } from 'react'
import Card from '../components/Card'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import { IoIosArrowRoundBack } from "react-icons/io";
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.png'
import { RiImageAddLine } from "react-icons/ri";
import { useRef } from 'react'
import { userDataContext } from '../context/UserContext'
import {  useNavigate } from 'react-router-dom'

function Customize() {
  const { serverUrl, userData, setUserData, frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage } = useContext(userDataContext)
  const navigate = useNavigate()
  const inputImage = useRef()
  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-[#030236] flex justify-center items-center flex-col p-[20px] gap-[20px] relative'>
       <IoIosArrowRoundBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer 'onClick={()=>{navigate("/")}} />
      <h1 className='text-white text-[30px] mb-[30px] text-center '>Select your <span className='text-blue-200'>Assisstant Image</span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px] '>
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff6c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-3 hover:border-white flex items-center justify-center ${selectedImage === "input" ? "shadow-2xl shadow-blue-950 border-3 border-white " : null}`} onClick={() => {
          inputImage.current.click()
          setSelectedImage("input")
        }}>
          {!frontendImage && <RiImageAddLine className='text-white width-[25px] h-[25px]' />}
          {frontendImage && <img src={frontendImage} className='h-full object-cover' />}
        </div>
        <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} />

      </div>
      {selectedImage && <button className='min-w-[150px] h-[40px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] cursor-pointer'onClick={()=>{navigate("/customize2")}}>Next</button>
      }

    </div>
  )
}

export default Customize
