import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/db.js";
import {userRouter} from "./routes/user.routes.js"
import { authRoutes } from "./routes/auth.routes.js";
import {postRoutes} from "./routes/post.routes.js"
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";
import { v2 as cloudinary } from 'cloudinary'

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});



const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();



app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
// app.use(cors());



app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/post", postRoutes);

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV==="production"){
    
    app.use(express.static(path.join(__dirname , "frontend/dist")));

    app.get(/(.*)/, (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"))
    })
}


app.listen(PORT, ()=>{
    connectDb();
    console.log("Server started on Port " + PORT);
})