import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    const findUser = await User.findById(decode.id).select("-password");

    if (!findUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.user = findUser;

    next();
  } catch (error) {
    console.log(`Error at protectRoute middleware: ${error.message}`);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
