import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  deleteUserNotifications,
  getUserNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotifications);
router.delete("/", protectRoute, deleteUserNotifications);

export default router;
