import express from "express";
import {
  signup,
  login,
  logout,
  getMyData,
} from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/mydata", protectRoute, getMyData);

export default router;
