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
export const commentPost = ()=>{
  
}
export const getPostLikedByUser = ()=>{
  
}

