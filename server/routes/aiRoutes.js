import express from "express";
const Router = express.Router();
import { AiResponse } from "../controllers/aiController.js";

Router.post("/gemini", AiResponse);

export default Router;
