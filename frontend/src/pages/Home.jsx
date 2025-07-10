import React, { useContext, useEffect, useState, useRef } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ai from "../assets/ai.gif"
import { CgMenuRight } from "react-icons/cg";
import userImage from "../assets/user.gif"
import { RxCross2 } from "react-icons/rx";

function Home() {
  const navigate = useNavigate()
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const [ham, setHam] = useState(false)
  const synth = window.speechSynthesis
  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const isRecognizingRef = useRef(false)

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      console.log(error)
    }
  }

  const startRecognition = () => {
    try {
      recognitionRef.current?.start()
      setListening(true)
    } catch (error) {
      if (!error.message.includes("start")) {
        console.error("Recognition error:", error)
      }
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    const englishVoice = voices.find(v => v.lang === 'en-IN')

    if (englishVoice) {
      utterance.voice = englishVoice
      utterance.lang = englishVoice.lang
    } else {
      utterance.lang = 'en-US'
    }

    isSpeakingRef.current = true

    utterance.onend = () => {
      setAiText("")
      isSpeakingRef.current = false
      setTimeout(() => {
        startRecognition()
      }, 500)
    }

    console.log("🗣 Speaking:", text)
    synth.speak(utterance)
  }

  const handleCommand = (data) => {
    const { type, userInput, response } = data
    speak(response)
    const query = encodeURIComponent(userInput)
    switch (type) {
      case 'google_search':
        window.open(`https://www.google.com/search?q=${query}`, '_blank')
        break
      case 'calculator_open':
        window.open(`https://www.google.com/search?q=calculator`, '_blank')
        break
      case 'instagram_open':
        window.open(`https://www.instagram.com/`, '_blank')
        break
      case 'facebook_open':
        window.open(`https://www.facebook.com/`, '_blank')
        break
      case 'weather_show':
        window.open(`https://www.google.com/search?q=weather`, '_blank')
        break
      case 'youtube_search':
      case 'youtube_play':
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank')
        break
      default:
        break
    }
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognitionRef.current = recognition

    const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start()
          console.log("Recognition requested to start")
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error("start error:", error)
          }
        }
      }
    }

    recognition.onstart = () => {
      isRecognizingRef.current = true
      setListening(true)
    }

    recognition.onend = () => {
      isRecognizingRef.current = false
      setListening(false)
      if (!isSpeakingRef.current) {
        setTimeout(safeRecognition, 1000)
      }
    }

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error)
      isRecognizingRef.current = false
      setListening(false)
      if (event.error !== "aborted" && !isSpeakingRef.current) {
        setTimeout(safeRecognition, 1000)
      }
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText("")
        setUserText(transcript)

        try {
          recognition.stop()
        } catch (e) {
          console.warn("Recognition stop error:", e)
        }

        isRecognizingRef.current = false
        setListening(false)

        const data = await getGeminiResponse(transcript)
        handleCommand(data)
        setAiText(data.response)
        setUserText("")
      }
    }

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition()
      }
    }, 10000)

    safeRecognition()

    return () => {
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
      clearInterval(fallback)
    }
  }, [])

  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-[#030236] flex justify-center items-center flex-col gap-[10px] relative p-[15px] overflow-hidden'>
      <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(true)} />
      <div className={`lg:hidden absolute top-0 w-full h-full bg-[#0c0c0c56] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${ham ? "translate-x-0" : "translate-x-full "} transition-transform`}>
        <RxCross2 className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(false)} />
        <button className='min-w-[150px] h-[40px] bg-white rounded-full text-black font-semibold text-[19px] px-[20px] py-[6px]' onClick={handleLogOut}>LogOut</button>
        <button className='min-w-[150px] h-[40px] bg-white rounded-full text-black font-semibold text-[19px] px-[20px] py-[6px]' onClick={() => navigate("/customize")}>Customize Your Assistant</button>
        <div className='w-full h-[2px] bg-[grey]'></div>
        <h1 className='text-white font-semibold text-[19px]'>History</h1>
        <div className='w-full h-[400px] overflow-auto flex flex-col gap-[20px] items-start'>
          {userData.history?.map((his, index) => (
            <span key={index} className='text-gray-200 text-[18px]'>{index + 1}. {his}</span>
          ))}
        </div>
      </div>

      <button className='hidden lg:block min-w-[150px] h-[40px] absolute top-[20px] right-[20px] bg-white rounded-full text-black font-semibold text-[19px] px-[20px] py-[6px]' onClick={handleLogOut}>LogOut</button>
      <button className='hidden lg:block min-w-[150px] h-[40px] absolute top-[20px] left-[20px] bg-white rounded-full text-black font-semibold text-[19px] px-[20px] py-[6px]' onClick={() => navigate("/customize")}>Customize Your Assistant</button>

      <div className='w-full max-w-[300px] h-[400px] sm:w-[200px] sl:w-[150px] sl:h-[200px] sm:h-[300px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
      </div>

      <h1 className='text-white font-bold text-[18px]'>I'm {userData?.assistantName}</h1>
      {aiText ? <img src={ai} alt="" className='w-[200px]' /> : <img src={userImage} alt="" className='w-[200px]' />}
      <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText || aiText || null}</h1>
    </div>
  )
}

export default Home
