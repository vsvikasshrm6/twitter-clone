import mongoose, { mongo } from "mongoose";
const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    link: {
      type: String,
      
    },
    bio: {
      type: String,
      
    },
    likedPost : [
      {
        type : mongoose.Types.ObjectId,
        ref : "Post",
        default : []
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema );
