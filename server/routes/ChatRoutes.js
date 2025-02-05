import express from "express";
import {
  CreatMainLabel,
  CreatSubLabel,
  FetchHistory,
  fetchMainAndSubLebal,
  sendMessage,
} from "../controllers/ChatSchema.js";
const Router = express.Router();

Router.post("/main-labels", CreatMainLabel);
Router.post("/sub-labels", CreatSubLabel);
Router.get("/main-labels/:userId", fetchMainAndSubLebal);
Router.get("/:subLabelId", FetchHistory);
Router.post("/chats", sendMessage);

export default Router;
