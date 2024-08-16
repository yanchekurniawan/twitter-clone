import express from "express";
import { getAllPost } from "../controllers/postController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello Guys");
});

router.get("/post", getAllPost);

export default router;
