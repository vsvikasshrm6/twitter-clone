import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import  bcrypt  from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const userName = req.params;
  try {
    const user = await User.findOne(userName).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in getting user profile" });
  }
};

export const followUnfollow = async (req, res) => {
  const  userToFollowId = req.params.id;
  const myUserId = req.user._id;
  try {

    if (myUserId === userToFollowId) {
      res.status(400).json({ message: "Cannot follow yourself" });
    }
    const myUser = await User.findById(myUserId);
    const userToFollow = await User.findById(userToFollowId);

    if (myUser.following.includes(userToFollowId)) {
      await User.findByIdAndUpdate(myUserId, {
        $pull: { following:  userToFollowId  },
      });
      await User.findByIdAndUpdate(userToFollowId, {
        $pull: { followers:  userToFollowId  },
      });
    }
     else {
      await User.findByIdAndUpdate(myUserId, {
        $push: { following:  userToFollowId  },
      });
      await User.findByIdAndUpdate(userToFollowId, {
        $push: { followers:  userToFollowId  },
      });
      await Notification.create({
        to: userToFollowId,
        from: myUserId,
        type: "follow",
      });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserSuggestion = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password")
    const followingUser = user.following;

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);

    const filteredUser = users.filter(
      (user) => {return !followingUser.includes(user._id);}
    );
    const suggestedUser = filteredUser.slice(0, 4);

    suggestedUser.forEach((user) => {
      user.password = null;
    });

    return res.status(200).json(suggestedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateProfile = async (req, res) => {
  const {
    userName,
    fullName,
    currentPassword,
    newPassword,
    link,
    bio,
    profileImage,
    coverImage,
  } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Not found" });
    }
    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(404)
        .json({ message: "Provide new and current pasword" });
    }
    const isOldPasswordCorrect = bcrypt.compare(currentPassword, user.password);
    if (isOldPasswordCorrect) {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPassword;
    }
    user.fullName = fullName || user.fullName;
    user.userName = userName || user.userName;
    user.link = link || user.link;
    user.bio = bio || user.bio;
    if (profileImage) {
      if (user.profileImage) {
        await cloudinary.uploader.destroy(
          user.profileImage.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImage);
      user.profileImage = uploadedResponse.secure_url;
    }
    if (coverImage) {
      if (user.coverImage) {
        await cloudinary.uploader.destroy(
          user.coverImage.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImage);
      user.coverImage = uploadedResponse.secure_url;
    }
    user = await user.save();
    user.password = null;
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
