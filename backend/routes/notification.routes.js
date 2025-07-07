import {express} from "express"

const notificationRouter = express.Router();

notificationRouter.get('/:id', getNotification);
notificationRouter.delete("/delete/:id", deleteNotification)