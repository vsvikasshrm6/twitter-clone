import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res, next)=>{
    try {

        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({error : "Unauthorized"})
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decodedToken){
            return res.status(400).json({error : "Invalid Token"})
        }
        
        const user = await User.findById(decodedToken.userId).select("-password");
        
        if(!user){
            return res.status(400).json({error : "Invalid Token"}) 
        }
        //we were using here res.user = user
        req.user = user;
        next();

    } catch (error) {
        // console.log("Error in protected route" + error);
        console.log(error)
    }
}