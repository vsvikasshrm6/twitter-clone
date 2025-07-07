import { Notification } from "../models/notification.model";
import { User } from "../models/user.model";

export const getNotification = async ()=>{
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(403).json({message : " Invalid notification request"})
        }
        //read
        const notification = await Notification.findMany({to : user._id}).populate(
            {
                path : "from",
                select : "-password"
            }
        );
        res.status(200).json(notification)
    } catch (error) {
        console.log("Error in getting notification" + error)
    }
}

export const deleteNotification = async (req, res)=>{
    const {id} = req.pararms;
    const userId = req.user._id;
    try {
        const notification = await Notification.findById(id);
        if(notification.to.toString()!==userId.toString()){
            res.status(403).json({message : "Unauthorised noftification delete request"});
        }
        await Notification.deleteMany({to : userId});
        res.status(200).json({message : "Notification deleted successfully"});
    } catch (error) {
        console.log("Error in deleting notification" + error);
    }

}