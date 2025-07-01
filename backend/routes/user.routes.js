import {express} from "express"

const userRouter = express.userRouter;

userRouter.get("/profile/:userName", getUserProfile);
userRouter.post('/follow:id', followUnfollow);
userRouter.get("/suggestion", getUserSuggestion);


export {userRouter};