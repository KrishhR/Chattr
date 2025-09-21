import express from "express";
import {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
  handleUpdateProfile,
  handleCheckAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);

router.put("/update-profile", protectRoute, handleUpdateProfile);

router.get("/check", protectRoute, handleCheckAuth);

export default router;
