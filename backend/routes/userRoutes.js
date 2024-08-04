import express from "express";
import {
  followUnfollowUser,
  getSuggestedUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profiles/:username", protectRoute, getUserProfile);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.get("/suggested", protectRoute, getSuggestedUser);
router.put("/update", protectRoute, updateUserProfile);

export default router;
