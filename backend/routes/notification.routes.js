import express from "express"
import {protectedRoute} from "../middleware/protectedRoute.js"
import { getNotification, deleteNotification } from "../controller/notification.controller.js";

const notificationRouter = express.Router();

// we are deleting and getting notificaton based on userId
notificationRouter.get('/',protectedRoute, getNotification);
notificationRouter.delete("/",protectedRoute, deleteNotification)

export default notificationRouter;