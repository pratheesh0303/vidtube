import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authentication.js";
import userRoute from "./routes/user.js";
import videoRoute from "./routes/video.js";
import commentRoute from "./routes/comment.js";
import path from "path";
import { fileURLToPath } from 'url';


const App = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config();
const connect = ()=>{
    mongoose.connect(process.env.MONGODB).then(()=>{
    }).catch((error)=>{ 
        console.log(error);
    })
}
App.use(cookieParser());
App.use(express.json());
App.use("/api/auth", authRoute);
App.use("/api/users", userRoute);
App.use("/api/videos", videoRoute);
App.use("/api/comments", commentRoute);

App.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

App.use(express.static('/client/build'));
App.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });

App.listen(process.env.PORT || 8800,()=>{
    connect();
})