import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectToMongoDB from "./db/databaseConfig.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongoDB();
});
