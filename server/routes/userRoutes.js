import express from "express";
const Router = express.Router();
import { verifyToken } from "../middleware/isAuthenticated.js";
import { userInfo } from "../controllers/userController.js";

Router.get("/user-info", verifyToken, userInfo);

export default Router;
