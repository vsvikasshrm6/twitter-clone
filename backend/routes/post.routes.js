import { express } from 'express';
import { getAllPost, createPost, deletePost, likeUnlikePost, commentPost, getPostLikedByUser } from '../controller/post.controller';

const postRoutes = express.Router();

postRoutes.get("/post", getAllPost);
postRoutes.post("/create", createPost);
postRoutes.delete("/delete", deletePost);
postRoutes.post('/like/:id', likeUnlikePost);
postRoutes.post('/comment', commentPost);
postRoutes.get("/:id", getPostLikedByUser);

export {postRoutes};

