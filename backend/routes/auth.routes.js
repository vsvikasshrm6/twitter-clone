import express from "express"
import { login, signup, logout, check } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const authRoutes = express.Router();

authRoutes.post('/login', login)
authRoutes.post('/signup', signup)
authRoutes.post('/logout', logout)
authRoutes.get("/check", protectedRoute, check);


export {authRoutes};