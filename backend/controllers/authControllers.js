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
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    const matchPassword = await bcrypt.compare(
      password,
      findUser?.password || ""
    );

    if (!findUser || !matchPassword) {
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }
    generateAndSetToken(findUser._id, res);

    return res.status(200).json({
      _id: findUser._id,
      fullname: findUser.fullname,
      email: findUser.email,
      username: findUser.username,
      profileImg: findUser.profileImg,
      coverImg: findUser.coverImg,
      bio: findUser.bio,
      link: findUser.link,
      followers: findUser.followers,
      following: findUser.following,
    });
  } catch (error) {
    console.log(`Error at login controller: ${error.message}`);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getMyData = async (req, res) => {
  try {
    const findUser = await User.findById(req.user._id).select("-password");
    return res.status(200).json(findUser);
  } catch (error) {
    console.log(`Error in getMyData controller: ${error.message}`);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
