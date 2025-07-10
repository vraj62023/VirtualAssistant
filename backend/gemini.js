import axios from "axios"
const geminiResponse = async (command, assistantName, userName) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL
        const prompt = `you are a virtual assistant named ${assistantName} created by ${userName}.you are not Google. You will noww behave like a voice-enabled assistant.
        
        your task i sto understant the user's natural language and respond with a JSON 
        object like this:
        
        {
            "type":"general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" |"get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather-show" ,
            "userInput":"<original user input>"{only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,
            "response": "<a short spoken response to read out loud to the user>"
       }
            Instruction:
            - "type": determine the intent of the user,
            - "userInput": originalsentence the user spoke,
            - "response": A short voice-friendly reply, e.g., "Sure, playing it now, "Here's what I found", "Today is Tuesday", etc. 
            
            Type meanings:
            - "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tumko pata hai to usko bhi general ki category me rakho bas long answer dena.
            - "google_search": if  user wants to search something on Google.
            - "youtube_search": if user wants to search something on YouTube.
            - "youtube_play": if user wants to directly play a video or song.
            - "calculator_open": if user wants to open a calculator.
            - "instagram_open": if user wants to open instagram.
            - "facebook_open": if user wants to open facebook.
            - "weather_show": if user wants to know weather.
            - "get_time": if user asks for current time.
            - "get_date": if user asks for today's date.
            - "get_day": if user asks what day it is.
            - "get_month": if user asks for the current month.

            Important:
            - Use ${userName} agar koi puche tumne kisne banaya
            - Only respond with the JSON object, nothing else.

            now your userInput- ${command}
        `
        const result = await axios.post(apiUrl, {
            contents: [
                {
                    parts: [
                        {
                            text: prompt, // use the `prompt` argument
                        },
                    ],
                },
            ],
        })
      return result.data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    } catch (error) {
        console.log(error)
        console.error("Gemini API Error:", error.response?.data || error.message || error);
        return { error: "Failed to fetch Gemini response" };
    }
}
export default geminiResponse