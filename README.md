# 🤖 Gemini-Powered Virtual AI Assistant

A fully functional, voice-controlled AI assistant web app built using the **MERN stack** and powered by **Google's Gemini API** and the **Web Speech API**. This project combines user authentication, multimedia input/output, and cloud-based AI response generation into a seamless user experience.
  
> 🔗 Created as part of my journey to learn MERN development + AI integration.

---

## 📽️ Demo

🌐 [Live App](https://virtualassistantfrontend.onrender.com/)

---

## 🔧 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT, bcrypt, cookies
- **Cloud Storage:** Cloudinary (via Multer)
- **AI Integration:** Gemini API (Google Generative AI)
- **Voice Interaction:** Web Speech API (Speech Recognition + Speech Synthesis)

---

## 🔑 Core Features

- 🧑‍💻 User Signup/Login system (with token-based auth)
- 🧠 Interact with Gemini AI using typed or spoken input
- 🎙️ Voice input via Speech Recognition
- 🔊 Response playback with Speech Synthesis
- 🖼️ Media output (GIFs + text replies)
- ☁️ Avatar customization with Cloudinary
- ⚙️ Update assistant personality/profile
- 📲 Responsive UI with full MERN integration

---

## 🛠️ Getting Started

### 1. Clone the Repository

    git clone https://github.com/Vraj62023/VirtualAssistant.git
    cd VirtualAssistant

2. Backend Setup
    cd backend
    npm install
   
    Create a .env file with:

        PORT=5000
        MONGO_URI=your_mongodb_uri
        JWT_SECRET=your_secret_key
        GEMINI_API_KEY=your_google_gemini_key
        CLOUDINARY_NAME=your_cloudinary_name
        CLOUDINARY_API_KEY=your_cloudinary_key
        CLOUDINARY_API_SECRET=your_cloudinary_secret

    Run the backend:
        npm start
   
4. Frontend Setup
   
    cd frontend
    npm install
    npm start
