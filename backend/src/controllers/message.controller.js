import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const handleGetUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        return res.status(200).json({
            success: true,
            users: filteredUsers
        })

    }
    catch (error) {
        console.log("Error in getAllUsers controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export const handleGetMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // id of person who current user is chatting with
        const userId = req.user._id; // current user id

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: userId }
            ]
        });

        return res.status(200).json({
            success: true,
            messages
        })
    }
    catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export const handleSendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const userId = req.user._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: userId,
            receiverId,
            text: text.trim(),
            media: imageUrl
        });

        await newMessage.save();

        // TODO: Realtime functionality goes here => socket.io
    } 
    catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}