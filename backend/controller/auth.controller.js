import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateAndSetToken} from "../utils/jwtToken.js"

export const login = async (req, res)=>{
   const {email, password} = req.body;
   try {
      const user = await User.findOne({email});
      
   if(!user){
      return res.status(404).json({error : "User Not found"});
   }
   const checkPassword = await bcrypt.compare(password, user.password);
   if(!checkPassword){
      return res.status(400).json({error : "Invalid Password"});
   }
   
    generateAndSetToken(user._id, res);
   return res.status(201).json({message : "Login successfull"});
   } catch (error) {
      console.log("Error in login" + error);
   }
}

export const logout = (req, res)=>{
   try {
      res.cookie("jwt", "", {maxAge : 0});
   res.status(201).json({message : "Logout successfully"});
   } catch (error) {
      console.log(error)
      res.status(500).json({error : "Internal serve"})
   }
   
}

export const signup = async (req, res)=>{
   const {fullName, email, password, userName} = req.body;
   try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}
      //check email is valid or not
      const user = await User.findOne({email : email})
      
      if(user){
         return res.status(400).json({error : "User alredy exist"})
      }
      const userNameCheck = await User.findOne({userName : userName});
      if(userNameCheck){
         return res.status(400).json({error : "User name not available"})
      }
      if(password.length <6){
         return res.status(400).json({error : "Password length less than 6"})
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt)
      const newUser = await User.create({
         userName,
         fullName,
         email,
         password : hashPassword
      })
      if(!newUser){
         res.status(500).json({message : "Error in saving user"})
      }
      generateAndSetToken(newUser._id, res)
      return res.status(201).json({userName : userName,
         fullName : fullName,
         email : email,
         email : email,
         _id : newUser._id
       })
   } catch (error) {
      console.log(error)
   }
}
export const check = async(req, res)=>{
   try {
      // here no need to again fetch the User as it is already fetched in protectedRoute and it is free from passowrd
      
      if(!req.user){
         return res.status(500).json({error : "Error in checking auth"})
      }
      return res.status(200).json(req.user)

   } catch (error) {
      return res.status(500).json({error : "Error in checking auth"})
      
   }
}