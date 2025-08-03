import express from "express"
import { getUserProfile, getUserSuggestion, followUnfollow, updateProfile } from "../controller/user.controller.js";
import {protectedRoute} from "../middleware/protectedRoute.js"
const userRouter = express.Router();

userRouter.get('/profile/:userName',protectedRoute, getUserProfile);
userRouter.post('/follow/:id',protectedRoute, followUnfollow);
userRouter.get("/suggestion",protectedRoute, getUserSuggestion);
userRouter.post("/update",protectedRoute, updateProfile)


export {userRouter};