import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js"
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cookieParser())
dotenv.config();
app.use(cors({
    origin:"https://virtualassistantfrontend.onrender.com",
    credentials:true
}));
const port = process.env.PORT||5000;

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// app.get("/",async (req,res)=>{
//     let prompt =  req.query.prompt
//     let data = await geminiResponse(prompt)
//     res.json(data)
// })

// app.get("/",(req,res)=>{
//     res.send("hi");
// })

app.listen(port,()=>{
    connectDb();
    console.log("server is started");
})
