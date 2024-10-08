import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  commentPost,
  createPost,
  delletePost,
  getAllPost,
  getFollowingPosts,
  getLikedPosts,
  getPostById,
  getUserPost,
  likeUnlikePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/post", protectRoute, createPost);
router.get("/post", protectRoute, getAllPost);
router.get("/post/following", protectRoute, getFollowingPosts);
router.get("/post/:id", protectRoute, getPostById);
router.get("/post/user/:username", protectRoute, getUserPost);
router.get("/post/likes", protectRoute, getLikedPosts);
router.delete("/post/:id", protectRoute, delletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentPost);

export default router;
