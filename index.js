import express from 'express'
import mongoose  from "mongoose"
// import cors  from "cors"
import userRoutes from "./routes/userRoute.js"
import authRoutes from "./routes/authRoute.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path'
const app = express()

app.use(express.json())
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/auth/dist')))
// app.use(cors())
dotenv.config();
const PORT = 8000;

// connected mongodb too our node app.
mongoose.connect(process.env.MONGO).then(()=>console.log("connected to Mongo")).catch((err)=> console.log(err.message))

app.use(cookieParser())
app.listen(PORT,()=>{
    console.log("server started 8000");
})

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})
app.get("*", (req,res)=>{
res.sendFile(path.join(_dirname, 'auth','dist','index.html'))
})