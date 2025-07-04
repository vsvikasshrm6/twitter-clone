import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/db.js";
import {userRoutes} from "./routes/auth.routes.js"
import { authRoutes } from "./routes/auth.routes.js";
import {postRoutes} from "./routes/post.routes.js"

dotenv.config();


const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


app.listen(process.env.PORT, ()=>{
    connectDb();
    console.log("Server started on Port " + process.env.PORT);
})