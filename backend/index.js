import path from "path";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dotenv from "dotenv";
import connectToMongoDB from "./db/databaseConfig.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import axios from "axios";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Hello");
});
/* app.get("/post", (req, res) => {
  const response = axios.get("https://reqres.in/api/users");
  res.json(response.data);
}); */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV.trim() == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongoDB();
});
