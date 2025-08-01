
import { mongoose } from 'mongoose';


const postSchema =  mongoose.Schema({
   user : {
    type : mongoose.Types.ObjectId,
    required : true,
    ref : "User"
   },
   text : {
    type : String,
   },
   image : {
    type : String,
   },
   likes : [
    {type : mongoose.Types.ObjectId,
      ref : "User"
    }
   ],
   comments : [
    {
      text : {
        type : String,
        required : true
      },
      user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
      }
    }
   ]

}, {timestamps : true})

export const Post = mongoose.model("Post", postSchema);
