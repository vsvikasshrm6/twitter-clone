import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import {v2 as cloudinary} from "cloudinary"
import { Post } from './../models/post.model';

export const getAllPost = ()=>{

}

export const createPost = async (req, res)=>{
  const {image, text} = req.body;
  try {
    const creatorId = req.user._id;
    const user = User.findById(creatorId).select("-password");
    if(!user){
      return res.status(400).json({message : "Unauthorised request"});
    }
    if(!image && !text){
      return res.status(400).json({message : "Please provide either image or text"})
    }

    const postedImage = await cloudinary.uploader.upload(image);
    const postedImageUrl = postedImage.secureUrl;

    const newPost = await Post.create({
      user : creatorId,
      image : postedImageUrl,
      text
    })
    await newPost.save();
    res.status(200).json(newPost);

  } catch (error) {
    console.log("Error in creating post" + error);
    res.status(500).json({message : "Internal server error"})
  }
}
export const deletePost = async ()=>{
  const postId = req.params;
  try {
    const post = await Post.findById(postId);
    if(post.user.toString()!== req.user._id.toString){
      return res.status(400).json({message : "Unauthorised request"})
    }
    if(post.image){
      await cloudinary.uploader.destroy(post.image);
    }
    await Post.deleteOne({id : postId})
    res.status(200).json({message : "Post deleted successfully"});
  } catch (error) {
    console.log("Error in deleting Post" + error);
  }  
}
export const likeUnlikePost = async (req, res)=>{
  const {id} = req.params;
  try {
    const post = await Post.findById(id);
    if(!post){
      return res.status(400).json({message : "Invalid Post"})
    }
    if(post.likes.includes(req.user._id)){
       Post.findByIdAndUpdate(id, {
        likes : {$pull : {user : id}}
       })
    }
    else{
       Post.findByIdAndUpdate(id, {
        likes : {$push : {user : id}}
       })
    }
  } catch (error) {
    console.log("Error in like unike Post" + error)
  }
}
export const commentPost = async (req, res)=>{
  const {id} = req.params;
  const {text} = req.body;
  try {
    const post = Post.findById(id);
    if(!post){
      return res.status(400).json({message : "Invalid Post"})
    }
    const updatedPost = await Post.findByIdAndUpdate(id, {
      comments : {$push : {text}}
    });
    res.status(200).json(updatedPost)
  } catch (error) {
    console.log("Error in commenting post" + error)
  }  
}
export const getPostLikedByUser = async (req, res)=>{
  const id = req.user._id;
  try {
    // const user = User.findById(id).populate({
    //   path : "post"
    // })
    const post = Post.find({user : {id}}).populate({
      path : "User",
      select : "-password"
    })
    res.status(200).json(post)

  } catch (error) {
    console.log("Error in geting Post Liked By User" + error)
  }  
}
export const getFollowingPost = async(req,res)=>{
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message : "Invalid request"})
    }
    const following = user.following;
    const followingPost = await Post.find({user : {$in : {following}}}).sort(-1, createdAt).populate(
      {
        path: "user",
        select : "-password"
      }
    ).populate({
      path : "comments.user",
      select : "-password"
    })
    res.status(200).json(followingPost)
  } catch (error) {
    console.log("Error in getting following post" +  error);
  }
}
export const getUserPost = async (req, res) =>{
  const username = req.params;
  try {
    const user = await User.find({username : username});
    if(!user){
      return res.status(400).json({message : "Invalid User Request"})
    }
    const userPost = await Post.find({user : user._id}).sort("createdAt", -1).populate({
      path : "user",
      select: "-password"
    }).populate({
      path : "user.comments",
      select : "-password"
    })
    res.status(200).json(userPost);
  } catch (error) {
    console.log("Error in getting User Post" +  error)
  }
}
