import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import {v2 as cloudinary} from "cloudinary"



export const getAllPost = async ()=>{
  try {
    const post = await Post.find()
    .sort({created: -1})
    .populate({
      path : "user",
      select : "-password"
    }).
    populate({
      path : "comment.user",
      select : "-password"
    })
    if(post.length===0){
      return res.status(200).json([]);
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({error : "Error in getting all post"})
  }
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
    if(image){
      const postedImage = await cloudinary.uploader.upload(image);
    const postedImageUrl = postedImage.secureUrl;
    }
    

    const newPost = await Post.create({
      user : creatorId,
      image : postedImageUrl,
      text
    })
    // await newPost.save(); It is used in different method
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
    if(!post){
      return res.status(404).json({error : "Post not found"})
    }
    if(post.user.toString()!== req.user._id.toString){
      return res.status(400).json({error : "Unauthorised request"})
    }
    if(post.image){
      const imageId = post.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(imageId);
    }
    await Post.deleteOne({id : postId})
    res.status(200).json({error : "Post deleted successfully"});
  } catch (error) {
    console.log("Error in deleting Post" + error);
    res.status(500).json({error : "Internal server error"});
  }  
}
export const likeUnlikePost = async (req, res)=>{
  const {id : postId} = req.params;
  try {
    const post = await Post.findById(id);
    if(!post){
      return res.status(404).json({message : "Post not found"})
    }
    if(post.likes.includes(req.user._id)){
       await Post.updateOne({_id : postId}, {
        likes : {$pull : {User : req.user._id}}
       })
       await User.updateOne({_id : res.user._id}, {
        likedPost : {$pull :{Post : postId }}
       })
    }
    else{
       await Post.updateOne({_id : postId}, {
        likes : {$push : {User : req.user._id}}
       })
       await User.updateOne({_id : res.user._id}, {
        likedPost : {$push :{Post : postId }}
       })

      //  Generate Notification
      await Notification.create({
        to : post.user,
        from : req.user._id,
        type : "like"
      })

    }
    const updatedLikes = post.likes;
    res.status(200).json(updatedLikes)
  } catch (error) {
    console.log("Error in like unike Post" + error)
    res.status(500).json({error : "Internal server error"})
  }
}
export const commentPost = async (req, res)=>{
  const {id} = req.params;
  const {text} = req.body;
  try {
    if(!text){
      return res.status(400).json({error : "Text not found"})
    }
    const post = Post.findById(id);
    if(!post){
      return res.status(404).json({error : "Post not found"})
    }
    const updatedPost = await Post.findByIdAndUpdate(id, {
      comments : {$push : {
        text,
        user : req.user._id
      }}
    });
    res.status(200).json(updatedPost)
  } catch (error) {
    console.log("Error in commenting post" + error)
    res.status(500).json({error : "Internal server error"})
  }  
}
export const getPostLikedByUser = async (req, res)=>{
  const userId = req.params.id
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({error : "User not found"})
    }
    const post = await Post.find({_id : {$in : user.likedPosts}}).populate({
      path : "User",
      select : "-password"
    }).
    populate({
      path : "comments.user",
      select : "-password"
    })
    res.status(200).json(post)

  } catch (error) {
    console.log("Error in geting Post Liked By User" + error)
    res.status(500).json({error : "Internal server error"})
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
    const followingPost = await Post.find({user : {$in : {following}}}).sort({createdAt : -1}).populate(
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
    const userPost = await Post.find({user : user._id}).sort({createdAt : -1}).populate({
      path : "user",
      select: "-password"
    }).populate({
      path : "user.comments",
      select : "-password"
    })
    res.status(200).json(userPost);
  } catch (error) {
    console.log("Error in getting User Post" +  error)
    res.status(500).json({error : "Internal server error"});
  }
}
