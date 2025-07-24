import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res, next)=>{
    try {
        const token = req.cookie.jwt;
        if(!token){
            return res.status(400).json({message : "Unauthorized"})
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decodedToken){
            return res.status(400).json({message : "Invalid Token"})
        }
        const user = User.findById(decodedToken.userId).select("-password");
        if(!user){
            return res.status(400).json({message : "Invalid Token"}) 
        }
        res.user = user;
        next();

    } catch (error) {
        console.log("Error in protected route" + error);
    }
}