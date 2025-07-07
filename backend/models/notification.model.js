
import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    to:{
        type : mongoose.Types.ObjectId,
        require : true,
        ref : "user"
    },
    from :{
        type : mongoose.Types.ObjectId,
        require : true,
        ref : "user"
    },
    text : {
        type : String
    },
    read : {
        type : Boolean,
        default : false
    }
}, {
    timeStamp : true
})
export const Notification = mongoose.model("Notification", notificationSchema);