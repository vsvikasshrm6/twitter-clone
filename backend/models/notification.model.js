
import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    to:{
        type : mongoose.Types.ObjectId,
        required : true,
        ref : "User"
    },
    from :{
        type : mongoose.Types.ObjectId,
        required : true,
        ref : "User"
    },
    type : {
        type : String,
        required : true,
        enum : ["follow", "like"]
    },
    read : {
        type : Boolean,
        default : false,
        required : true
    }
}, {
    timestamps : true
})
export const Notification = mongoose.model("Notification", notificationSchema);