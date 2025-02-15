import express from "express";
import {
  CreateMainLabel,
  CreateSubLabel,
  CreateSubSubLabel,
  fetchMainLabelsOnly,
  fetchSubLabelsOnly,
  fetchSubSubLabelsOnly,
  fetchLabelsHierarchy,
  fetchChatsForSubSubLabel,
  sendMessage,
} from "../controllers/ChatControlers.js";

const Router = express.Router();

// =========================
// Routes for Creating Labels
// =========================
Router.post("/main-label", CreateMainLabel);
Router.post("/sub-label", CreateSubLabel);
Router.post("/sub-sub-label", CreateSubSubLabel);

// =========================
// Routes for Fetching Labels
// =========================
Router.get("/main-labels/:username", fetchMainLabelsOnly); // Fetch only main labels
Router.get("/sub-labels/:mainLabelName", fetchSubLabelsOnly); // Fetch only sub-labels under a main label
Router.get("/sub-sub-labels/:subLabelName", fetchSubSubLabelsOnly); // Fetch only sub-sub labels under a sub-label

// Fetch full hierarchy for a user
Router.get("/user/:username", fetchLabelsHierarchy);

// =========================
// Routes for Chat Handling
// =========================
Router.get("/chats/:subSubLabelName", fetchChatsForSubSubLabel); // Fetch chat history
Router.post("/chats", sendMessage); // Send a message

export default Router;
