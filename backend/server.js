import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/db.js";
import {userRoutes} from "./routes/auth.routes.js"

dotenv.config();


const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);



app.listen(process.env.PORT, ()=>{
    connectDb();
    console.log("Server started on Port " + process.env.PORT);
})