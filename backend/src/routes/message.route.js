import express from "express";
import {
    handleGetUsersForSidebar,
    handleGetMessages,
    handleSendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, handleGetUsersForSidebar);
router.get("/:id", protectRoute, handleGetMessages);
router.post("/send/:id", protectRoute, handleSendMessage);

export default router;