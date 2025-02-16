import {
  MainLabel,
  SubLabel,
  User,
  Chat,
  SubSubLabel,
} from "../models/ChatSchema.js";
import { logger } from "../utils/logger.js";
import NodeCache from "node-cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 60 });

export const AiResponse = async (prompt) => {
  try {
    logger.info("Generating AI response");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    logger.error("Gemini API Error:", error);
    return { error: "Error interacting with Gemini API" };
  }
};

/**
 * ======================
 *  CREATE LABEL APIS
 * ======================
 */

// Create Main Label
export const CreateMainLabel = async (req, res) => {
  const { username, mainLabelName } = req.body;
  logger.info(`Creating main label: ${mainLabelName} for user: ${username}`);

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = new User({ username, mainLabels: [] });
      await user.save();
    }

    let mainLabel = new MainLabel({ mainLabelName, subLabelIds: [] });
    await mainLabel.save();

    // Store the ObjectId of the new main label instead of its name
    user.mainLabels.push(mainLabel._id);
    await user.save();

    cache.del(`mainLabels_${username}`); // Invalidate cache for main labels
    res.json({ success: true, mainLabel });
  } catch (error) {
    logger.error("Error creating main label:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create Sub Label
export const CreateSubLabel = async (req, res) => {
  const { mainLabelName, subLabelName } = req.body;
  logger.info(
    `Creating sub label: ${subLabelName} under main label: ${mainLabelName}`
  );

  try {
    let mainLabel = await MainLabel.findOne({ mainLabelName });
    if (!mainLabel)
      return res.status(404).json({ error: "Main Label not found" });

    let subLabel = new SubLabel({ subLabelName, subSubLabelIds: [] });
    await subLabel.save();

    mainLabel.subLabelIds.push(subLabel._id);
    await mainLabel.save();
    cache.del(`SubLabels_${mainLabelName}`);
    res.json({ success: true, subLabel });
  } catch (error) {
    logger.error("Error creating sub label:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create Sub-Sub Label
export const CreateSubSubLabel = async (req, res) => {
  const { subLabelName, subSubLabelName } = req.body;
  logger.info(`Creating sub-sub label under sub label: ${subLabelName}`);

  try {
    let subLabel = await SubLabel.findOne({ subLabelName });
    if (!subLabel)
      return res.status(404).json({ error: "Sub Label not found" });

    const subSubLabel = new SubSubLabel({ subSubLabelName, messageIds: [] });
    await subSubLabel.save();

    subLabel.subSubLabelIds.push(subSubLabel._id);
    await subLabel.save();

    cache.del(`SubSubLabels_${subLabelName}`);

    res.json({ success: true, subLabel });
  } catch (error) {
    logger.error("Error creating sub-sub-label:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * ======================
 *  FETCH LABEL APIS
 * ======================
 */

// Fetch all Main Labels for a User
// ==============================
// Fetch Only Main Labels (Ignore Other Data)
// ==============================
export const fetchMainLabelsOnly = async (req, res) => {
  try {
    const cacheKey = `mainLabels_${req.params.username}`;

    if (cache.has(cacheKey)) {
      logger.info("Returning cached main labels");
      return res.json(cache.get(cacheKey));
    }

    logger.info(`Fetching only main labels for user: ${req.params.username}`);
    const user = await User.findOne({ username: req.params.username }).populate(
      "mainLabels"
    );

    if (!user) {
      logger.warn(`User not found: ${req.params.username}`);
      return res.json([]);
    }

    const mainLabels = user.mainLabels.map((label) => ({
      mainLabelName: label.mainLabelName,
    }));
    cache.set(cacheKey, mainLabels);

    res.json(mainLabels);
  } catch (error) {
    logger.error("Error fetching main labels:", error);
    res.status(500).json({ error: "Error fetching main labels" });
  }
};

// ==============================
// Fetch Only Sub Labels for a Given Main Label
// ==============================
export const fetchSubLabelsOnly = async (req, res) => {
  try {
    const { mainLabelName } = req.params;
    const cacheKey = `SubLabels_${mainLabelName}`;

    if (cache.has(cacheKey)) {
      logger.info("Returning cached main labels");
      return res.json(cache.get(cacheKey));
    }

    logger.info(`Fetching sub labels for main label: ${mainLabelName}`);

    const mainLabel = await MainLabel.findOne({ mainLabelName }).populate(
      "subLabelIds"
    );

    if (!mainLabel) {
      logger.warn(`Main Label not found: ${mainLabelName}`);
      return res.status(404).json({ error: "Main Label not found" });
    }

    const subLabels = mainLabel.subLabelIds.map((subLabel) => ({
      subLabelName: subLabel.subLabelName,
    }));
    cache.set(cacheKey, subLabels);

    res.json(subLabels);
  } catch (error) {
    logger.error("Error fetching sub labels:", error);
    res.status(500).json({ error: "Error fetching sub labels" });
  }
};

// ==============================
// Fetch Only Sub-Sub Labels for a Given Sub Label
// ==============================
export const fetchSubSubLabelsOnly = async (req, res) => {
  try {
    const { subLabelName } = req.params;
    const cacheKey = `SubSubLabels_${subLabelName}`;

    if (cache.has(cacheKey)) {
      logger.info("Returning cached main labels");
      return res.json(cache.get(cacheKey));
    }
    logger.info(`Fetching sub-sub labels for sub label: ${subLabelName}`);

    const subLabel = await SubLabel.findOne({ subLabelName }).populate(
      "subSubLabelIds"
    );

    if (!subLabel) {
      logger.warn(`Sub Label not found: ${subLabelName}`);
      return res.status(404).json({ error: "Sub Label not found" });
    }

    const subSubLabels = subLabel.subSubLabelIds.map((subSubLabel) => ({
      subSubLabelName: subSubLabel.subSubLabelName,
    }));
    cache.set(cacheKey, subSubLabels);

    res.json(subSubLabels);
  } catch (error) {
    logger.error("Error fetching sub-sub labels:", error);
    res.status(500).json({ error: "Error fetching sub-sub labels" });
  }
};

// ==============================
// Fetch Chats for a Given Sub-Sub Label
// ==============================
export const fetchChatsForSubSubLabel = async (req, res) => {
  try {
    const { subSubLabelName } = req.params;
    const cacheKey = `Chats_${subSubLabelName}`;

    if (cache.has(cacheKey)) {
      logger.info("Returning cached main labels");
      return res.json(cache.get(cacheKey));
    }
    logger.info(`Fetching chats for sub-sub label: ${subSubLabelName}`);

    const subSubLabel = await SubSubLabel.findOne({ subSubLabelName }).populate(
      "messageIds"
    );

    if (!subSubLabel) {
      logger.warn(`Sub-Sub Label not found: ${subSubLabelName}`);
      return res.status(404).json({ error: "Sub-Sub Label not found" });
    }

    const chats = subSubLabel.messageIds.map((chat) => ({
      sender: chat.sender,
      message: chat.message,
      timestamp: chat.createdAt,
    }));
    cache.set(cacheKey, chats);

    res.json(chats);
  } catch (error) {
    logger.error("Error fetching chats:", error);
    res.status(500).json({ error: "Error fetching chats" });
  }
};
/**
 * ======================
 *  CHAT FUNCTIONALITY
 * ======================
 */

// Send Message
export const sendMessage = async (req, res) => {
  const { subSubLabelName, message } = req.body;
  logger.info(`Sending message to AI under subSubLabel: ${subSubLabelName}`);

  try {
    let subSubLabel = await SubSubLabel.findOne({ subSubLabelName });
    if (!subSubLabel)
      return res.status(404).json({ error: "SubSubLabel not found" });

    // Simulating AI Response
    const botReply = "Hello!";

    const userMessage = new Chat({ sender: "user", message });
    await userMessage.save();
    subSubLabel.messageIds.push(userMessage._id);

    const botMessage = new Chat({ sender: "bot", message: botReply });
    await botMessage.save();
    subSubLabel.messageIds.push(botMessage._id);
    await subSubLabel.save();

    cache.del(`Chats_${subSubLabelName}`);
    res.json({ userMessage, botMessage });
  } catch (error) {
    logger.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

/**
 * ======================
 *  FETCH FULL LABEL HIERARCHY
 * ======================
 */

// Fetch Full Label Hierarchy
export const fetchLabelsHierarchy = async (req, res) => {
  try {
    logger.info(`Fetching full labels for user: ${req.params.username}`);
    const user = await User.findOne({ username: req.params.username }).populate(
      {
        path: "mainLabels",
        populate: {
          path: "subLabelIds",
          populate: {
            path: "subSubLabelIds",
            select: "subSubLabelName messageIds",
          },
        },
      }
    );

    if (!user) return res.json([]);

    const result = user.mainLabels.map((mainLabel) => ({
      mainLabelName: mainLabel.mainLabelName,
      subLabels: mainLabel.subLabelIds.map((subLabel) => ({
        subLabelName: subLabel.subLabelName,
        subSubLabels: subLabel.subSubLabelIds.map((subSubLabel) => ({
          subSubLabelName: subSubLabel.subSubLabelName,
          messages: subSubLabel.messageIds,
        })),
      })),
    }));

    res.json(result);
  } catch (error) {
    logger.error(
      `Error fetching labels for user ${req.params.username}:`,
      error
    );
    res.status(500).json({ error: "Error fetching labels" });
  }
};
