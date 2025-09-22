import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const handleUserSignUp = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Passwords must be at least 6 characters.",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists!",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
            profileImgUrl: "",
        });

        if (newUser) {
            // generate JWT token here!
            generateToken(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                success: true,
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    profileImgurl: newUser.profileImgUrl,
                },
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid user data!"
            });
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Passwords must be at least 6 characters.",
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            generateToken(user._id, res);

            return res.status(200).json({
                success: true,
                user: {
                    _id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    profileImgurl: user.profileImgUrl,
                },
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const handleUserLogout = (req, res) => {
    try {
        res.cookie("auth_token", "", { maxAge: 0 });
        // res.clearCookie("auth_token");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully!",
        });
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const handleUpdateProfile = async (req, res) => {
    try {
        const { profileImgUrl } = req.body;
        const userId = req.user._id;

        if (!profileImgUrl) {
            return res.status(400).json({
                success: false,
                message: "Profile picture is required.",
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profileImgUrl);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImgUrl: uploadResponse.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully!",
            user: { ...updatedUser },
        });
    }
    catch (error) {
        console.log("Error in update profile controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const handleCheckAuth = (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.log("Error in checkAuth controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};