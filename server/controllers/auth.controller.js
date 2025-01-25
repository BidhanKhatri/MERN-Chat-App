import UserModel from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

// signup controller
export const signupController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.json({
        msg: "full name, email and password are required",
        success: false,
        error: true,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters",
        success: false,
        error: true,
      });
    }

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      return res.status(400).json({
        msg: `${email} already exists`,
        error: true,
        success: false,
      });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const createUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await createUser.save();
    generateToken(createUser._id, res);

    return res.status(200).json({
      msg: `User ${fullName} created successfully`,
      data: createUser,
      succes: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};

// login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
        success: false,
        error: true,
      });
    }

    const findUser = await UserModel.findOne({ email }).select("-profilePic");
    if (!findUser) {
      return res.status(400).json({
        msg: "Invalid credentials",
        success: false,
        error: true,
      });
    }

    generateToken(findUser._id, res);

    const isMatch = await bycrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid credentials",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      msg: "Login successfull",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
  }
};

// update profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.userId; // getting user id from middleware

    if (!profilePic) {
      return res.status(400).json({
        msg: "Profile pic is required",
        success: false,
        error: true,
      });
    }

    const cloudImage = await cloudinary.uploader.upload(profilePic); //uploading to cloudinary

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePic: cloudImage.secure_url },
      { new: true }
    );

    return res.status(200).json({
      msg: "Profile pic updated successfully",
      data: updateUser,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};

// logout controller
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    return res.status(200).json({
      msg: "Logout successfull",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      succes: false,
      error: true,
    });
  }
};

// auth user controller
export const authUserController = async (req, res) => {
  try {
    const userId = req.userId; // getting user id from middleware

    if (!userId) {
      return res.status(401).json({
        msg: "Unauthorized: No token provided",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      msg: "User authenticated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};
