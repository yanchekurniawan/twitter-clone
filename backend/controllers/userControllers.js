import bcrypt from "bcryptjs";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const findUser = await User.findOne({ username }).select("-password");

    if (!findUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json(findUser);
  } catch (error) {
    console.log(`Error at getUserProfile controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const myProfile = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res.status(400).json({
        error: "You can't follow/unfollow yourself",
      });
    }

    if (!myProfile.following.includes(id)) {
      /* follow */
      await User.findByIdAndUpdate(id, {
        $push: {
          followers: req.user._id,
        },
      });
      /* push notif to followed user */
      const notif = new Notification({
        from: req.user._id,
        to: userToFollow._id,
        type: "follow",
      });

      await notif.save();

      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          following: id,
        },
      });

      res.status(200).json({
        message: "User followed successfully",
      });
    } else {
      /* unfollow */
      await User.findByIdAndUpdate(id, {
        $pull: {
          followers: req.user._id,
        },
      });

      await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          following: id,
        },
      });

      res.status(200).json({
        message: "User unfollowed successfully",
      });
    }
  } catch (error) {
    console.log(`Error at followUnfollowUser controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getSuggestedUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const userFollowedByMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        /* find 10 user except me */
        $match: {
          _id: {
            $ne: userId,
          },
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
    ]);

    const filteredUser = users.filter(
      (user) => !userFollowedByMe.following.includes(user._id)
    );

    /* get only 4 suggested user */
    const suggestedUser = filteredUser.slice(0, 4);

    suggestedUser.map((user) => (user.password = null));

    res.status(200).json(suggestedUser);
  } catch (error) {
    console.log(`Error at getSuggesteUser controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const upadateUserProfile = async (req, res) => {
  try {
    const {
      fullname,
      username,
      email,
      currentPassword,
      newPassword,
      bio,
      link,
    } = req.body;
    let { profileImg, coverImg } = req.body;

    const userId = req.user._id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    /* PASSWORD CHECKING */
    if (
      (!currentPassword && newPassword) ||
      (currentPassword && !newPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }

    if (currentPassword && newPassword) {
      const matchPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!matchPassword) {
        return res.status(400).json({
          error: "Invalid current password",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters long",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashPassword;
    }

    /* END */

    /* IMG UPLOAD WITH CLOUDINARY */
    if (profileImg) {
      /* Delete current profileImg before updating new profileImg */
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadResult = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadResult.secure_url;
    }

    if (coverImg) {
      /* Delete current coverImg before updating new coverImg */
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadResult = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadResult.secure_url;
    }
    /* END */

    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.link = link || user.link;

    user = await user.save();

    user.password = null;
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error at updateUserProfile controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
