import { User } from "../models/user.model";

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

