import { generateAndSetToken } from "../lib/utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    /* email format checking */
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    /* duplicate email checking */
    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
      return res.status(400).json({
        error: "Email already used",
      });
    }

    /* duplicate username checking */
    const duplicateUsername = await User.findOne({ username });
    if (duplicateUsername) {
      return res.status(400).json({
        error: "Username already used",
      });
    }

    /* Password length checking */
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    /* Hashing password */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateAndSetToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
        bio: newUser.bio,
        link: newUser.link,
        followers: newUser.followers,
        following: newUser.following,
      });
    } else {
      return res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.log(`Error at signup controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  res.json({
    msg: "You hit login route",
  });
};

export const logout = async (req, res) => {
  res.json({
    msg: "You hit logout route",
  });
};
