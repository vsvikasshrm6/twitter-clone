import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateAndSetToken} from "../utils/jwtToken.js"

export const login = async (req, res)=>{
   const {email, password} = req.body;
   try {
      const user = await User.find({email : email});
   if(!user){
      return res.staus(404).json({messsage : "User Not found"});
   }
   const checkPassword = bcrypt.compare(password, user.password);
   if(!checkPassword){
      return res.status(400).json({message : "Invalid Password"});
   }
   await generateAndSetToken(user._id, res);
   res.status(201).json({message : "Login successfull"});
   } catch (error) {
      console.log("Error in login" + error);
   }
}

export const logout = (req, res)=>{
   res.cookie("jwt", "");
   res.status(201).json({message : "Logout successfully"});
}

export const signup = async (req, res)=>{
   const {fullName, email, password, userName} = req.body;
   try {
      //check email is valid or not
      const user = await User.find({email : email})
      if(user){
         res.status(400).json({message : "User alredy exist"})
      }
      if(user.userName ===userName){
         res.status(400).json({message : "User name not available"})
      }
      if(password.length <6){
         res.status(400).json({message : "Password length less than 6"})
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = bcrypt.hash(password, salt)
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
      return res.staus(200).json(req.user)
   } catch (error) {
      console.log("Error in checking auth" + error);
   }
}