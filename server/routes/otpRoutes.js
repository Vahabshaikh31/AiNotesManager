import express from "express";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
} from "../controllers/otpController.js";

const router = express.Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);
router.post("/register", register);
router.post("/login", login);

export default router;
