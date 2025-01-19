import router from "./otpRoutes.js";
import express from "express";
const Router = express.Router();
import { googleAuth } from "../controllers/authController.js";

Router.get("/google", googleAuth);

export default router;
