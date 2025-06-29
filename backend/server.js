import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/db.js";

dotenv.config();

import {authRoutes} from "./routes/auth.routes.js"
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);



app.listen(process.env.PORT, ()=>{
    connectDb();
    console.log("Server started on Port " + process.env.PORT);
})