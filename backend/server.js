import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/db.js";
import {userRouter} from "./routes/user.routes.js"
import { authRoutes } from "./routes/auth.routes.js";
import {postRoutes} from "./routes/post.routes.js"
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();


const app = express();
app.use(express.json({limit: '50mb'}));
 app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/post", postRoutes);


app.listen(process.env.PORT, ()=>{
    connectDb();
    console.log("Server started on Port " + process.env.PORT);
})