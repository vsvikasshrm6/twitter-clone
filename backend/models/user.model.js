import mongoose, { mongo } from "mongoose";
import { Post } from "./post.model";
const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    proflieImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: user,
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: User,
      },
    ],
    link: {
      type: String,
      require: true,
    },
    bio: {
      type: String,
      require: true,
    },
    likes : [
      {
        type : mongoose.Types.ObjectId,
        ref : Post
      }
    ]
  },
  { timeStamps: true }
);

export const User = mongoose.model(UserSchema, "User");
