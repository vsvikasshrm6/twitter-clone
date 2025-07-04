
import { mongoose } from 'mongoose';
import { User } from './user.model';

const postSchema = new mongoose.schema({
   user : {
    type : mongoose.Types.ObjectId,
    required : true,
   },
   text : {
    type : String,
   },
   image : {
    type : String,
   },
   likes : [
    {type : mongoose.Types.ObjectId,
      ref : User
    }
   ],
   comments : [
    {type : mongoose.Types.ObjectId,
      ref : User
    },
    {type : String,
    }
   ]

}, {timeStamps : true})

export const Post = mongoose.model("Post", postSchema);
