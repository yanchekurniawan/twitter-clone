import Notification from "../models/notificationModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    /* POST CHECKING */
    if (!text && !img) {
      return res.status(400).json({
        error: "Please add some text or image",
      });
    }

    if (img) {
      const imageResult = await cloudinary.uploader.upload(img);
      img = imageResult.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(`Error at createPost controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (!posts) {
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(`Error at getAllPost controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.log(`Error at getPostById controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const likedPost = await Post.find({
      _id: {
        $in: user.likedPost,
      },
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedPost);
  } catch (error) {
    console.log(`Error at getLikedPost controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const followingPosts = await Post.find({
      user: {
        $in: user.following,
      },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(followingPosts);
  } catch (error) {
    console.log(`Error at getFollowingPosts controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const userPost = await Post.find({
      user: {
        $in: user._id,
      },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(userPost);
  } catch (error) {
    console.log(`Error at getUserPost: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    const userLikedPost = post.likes.includes(userId);
    if (!userLikedPost) {
      /* Like */
      await Post.findByIdAndUpdate(id, {
        $push: {
          likes: userId,
        },
      });

      await User.findByIdAndUpdate(userId, {
        $push: {
          likedPost: id,
        },
      });

      const notif = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await notif.save();

      return res.status(200).json({
        message: "Post liked successfully",
      });
    } else {
      /* Unlike */
      await Post.findByIdAndUpdate(id, {
        $pull: {
          likes: userId,
        },
      });

      await User.findByIdAndUpdate(userId, {
        $pull: {
          likedPost: id,
        },
      });

      return res.status(200).json({
        message: "Post unliked successfully",
      });
    }
  } catch (error) {
    console.log(`Error at likeUnlikePost controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    if (!text) {
      return res.status(400).json({
        error: "Please add some text on comment section",
      });
    }

    const newComment = {
      text,
      user: userId,
    };

    post.comments.push(newComment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(`Error at commentPost controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const delletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: "You are not authorized to dellete this post",
      });
    }

    /* If there is image on post */
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(`Error at delletePost controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
