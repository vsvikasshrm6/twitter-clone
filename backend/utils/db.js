import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected to DB")    
    } catch (error) {
        console.log("Error in connecting to DB" + error);
    }
    
}