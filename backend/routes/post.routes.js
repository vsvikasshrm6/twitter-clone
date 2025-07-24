import  express  from 'express';
import { getAllPost, createPost, deletePost, likeUnlikePost, commentPost, getPostLikedByUser, getFollowingPost, getUserPost } from '../controller/post.controller.js';
import {protectedRoute} from "../middleware/protectedRoute.js"
const postRoutes = express.Router();

postRoutes.get("/all", protectedRoute,getAllPost);
postRoutes.post("/create", protectedRoute,createPost);
postRoutes.delete("/:id",protectedRoute, deletePost);
postRoutes.post('/like/:id',protectedRoute, likeUnlikePost);
postRoutes.post('/comment/:id',protectedRoute, commentPost);
postRoutes.get("like/:id",protectedRoute, getPostLikedByUser);
postRoutes.get('/following',protectedRoute, getFollowingPost);
postRoutes.get('/user/:username',protectedRoute, getUserPost);

export {postRoutes};

