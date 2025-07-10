import React, {useContext} from 'react'

import { userDataContext } from '../context/userContext'

function Card({image}) {
    const  {        serverUrl,userData, setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage ,selectedImage,setSelectedImage   }=useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff6c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-3 hover:border-white ${selectedImage==image?"shadow-2xl shadow-blue-950 border-3 border-white ":null}` } onClick={()=>{
        setBackendImage(null)
        setFrontendImage(null)
        setSelectedImage(image)
        }}>
      <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card
