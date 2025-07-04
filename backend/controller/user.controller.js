import { User } from "../models/user.model";
import { bcrypt } from 'bcryptjs';

export const getUserProfile = async (req, res)=>{
  const userName = req.body;
  try {
    const user = await User.findOne({userName}).select("-password");
    if(!user){
      return res.status(404).json({message : "User not found"});
    }
    res.status(201).json(user);  
  } catch (error) {
    console.log(error)
    res.status(500).json({message : "Error in getting user profile"})
  }
}

export const followUnfollow = async (req, res)=>{
  const userToFollowId = req.params;
  const myUserId = req.user._id;
  try {
    if(myUserId === userToFollowId){
      res.status(400).json({message : "Cannot follow yourself"})
    }
    const userToFollow = await User.findById(userToFollowId);
    
    
  } catch (error) {
    console.log(error)
  }

}

export const getUserSuggestion = ()=>{

}
export const updateProfile = (req, res)=>{
  const {userName, fullName, currentPassword,newPassword, link, bio, profileImage, coverImage} = req.body;
  try {
    const user = User.findById(req.user._id)
    if(!user){
      return res.status(400).json({message : "User Not found"})
    }
    if((currentPassword && !newPassword) || (!currentPassword && newPassword) ){
      return res.status(404).json({message : "Provide new and current pasword"})
    }
    const isOldPasswordCorrect = bcrypt.compare(currentPassword, user.password);
    if(isOldPasswordCorrect){
      const salt = bcrypt.genSalt(10);
      const hashedNewPassword = bcrypt.hash(newPassword, salt);
      return res.status(201).json({message : "Password updated successfully"})
    }
    if(userName){
      user.userName = userName;
    }
    if(link){
      user.link = link;
    }
    if(bio){
      user.bio = bio;
    }
    //cloudinary setup
    
  } catch (error) {
    
  }
}

