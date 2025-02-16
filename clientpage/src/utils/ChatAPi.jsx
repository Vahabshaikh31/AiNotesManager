import axios from "axios";
import { Logger } from "@/utils/Logger"; // Import the logger utility
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Fetch Main Labels
export const fetchMainLabel = async (username) => {
  try {
    Logger.info("Fetching main labels", { username });
    const response = await axios.get(
      `${BASE_URL}/api/chat/main-labels/${username}`
    );
    Logger.info("Successfully fetched main labels", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error fetching main labels", {
      username,
      error: error.message,
    });
    throw error;
  }
};

// Fetch Sub Labels under a Main Label
export const fetchSubLabels = async (mainLabelName) => {
  try {
    Logger.info("Fetching sub labels", { mainLabelName });
    const response = await axios.get(
      `${BASE_URL}/api/chat/sub-labels/${mainLabelName}`
    );
    Logger.info("Successfully fetched sub labels", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error fetching sub labels", {
      mainLabelName,
      error: error.message,
    });
    throw error;
  }
};

// Fetch Sub-Sub Labels under a Sub Label
export const fetchSubSubLabels = async (subLabelName) => {
  try {
    Logger.info("Fetching sub-sub labels", { subLabelName });
    const response = await axios.get(
      `${BASE_URL}/api/chat/sub-sub-labels/${subLabelName}`
    );
    Logger.info("Successfully fetched sub-sub labels", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error fetching sub-sub labels", {
      subLabelName,
      error: error.message,
    });
    throw error;
  }
};

// Fetch Chat History for a Sub-Sub Label
export const fetchChats = async (subSubLabelName) => {
  try {
    Logger.info("Fetching chat history", { subSubLabelName });
    const response = await axios.get(
      `${BASE_URL}/api/chat/chats/${subSubLabelName}`
    );
    Logger.info("Successfully fetched chat history", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error fetching chat history", {
      subSubLabelName,
      error: error.message,
    });
    throw error;
  }
};

// Add a Main Label
export const addMainLabel = async (username, mainLabelName) => {
  try {
    Logger.info("Adding main label", { username, mainLabelName });
    const response = await axios.post(`${BASE_URL}/api/chat/main-label`, {
      username,
      mainLabelName,
    });
    Logger.info("Successfully added main label", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error adding main label", {
      username,
      mainLabelName,
      error: error.message,
    });
    throw error;
  }
};

// Add a Sub Label
export const addSubLabel = async (mainLabelName, subLabelName) => {
  try {
    Logger.info("Adding sub label", { mainLabelName, subLabelName });
    const response = await axios.post(`${BASE_URL}/api/chat/sub-label`, {
      mainLabelName,
      subLabelName,
    });
    Logger.info("Successfully added sub label", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error adding sub label", {
      mainLabelName,
      subLabelName,
      error: error.message,
    });
    throw error;
  }
};

// Add a Sub-Sub Label
export const addSubSubLabel = async (subLabelName, subSubLabelName) => {
  try {
    Logger.info("Adding sub-sub label", { subLabelName, subSubLabelName });
    const response = await axios.post(`${BASE_URL}/api/chat/sub-sub-label`, {
      subLabelName,
      subSubLabelName,
    });
    Logger.info("Successfully added sub-sub label", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error adding sub-sub label", {
      subLabelName,
      subSubLabelName,
      error: error.message,
    });
    throw error;
  }
};

// Send a Chat Message
export const sendMessage = async (subSubLabelName, message) => {
  try {
    Logger.info("Sending message", { subSubLabelName, message });
    const response = await axios.post(`${BASE_URL}/api/chat/chats`, {
      subSubLabelName,
      message,
    });
    Logger.info("Successfully sent message", response.data);
    return response.data;
  } catch (error) {
    Logger.error("Error sending message", {
      subSubLabelName,
      message,
      error: error.message,
    });
    throw error;
  }
};
