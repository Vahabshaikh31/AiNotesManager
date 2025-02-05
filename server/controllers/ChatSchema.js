import { MainLabel, SubLabel, User, Chat } from "../models/ChatSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const AiResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { error: "Error interacting with Gemini API" };
  }
};

// Bot reply logic
const getBotReply = (userMessage) => {
  const replies = {
    hello: "Hi there! How can I help?",
    "how are you": "I'm doing great! How about you?",
    bye: "Goodbye! Have a great day!",
  };
  return (
    replies[userMessage.toLowerCase()] || "I'm not sure how to respond to that."
  );
};

// Create a Main Label
export const CreatMainLabel = async (req, res) => {
  const { userId, mainLabelId } = req.body;
  try {
    let user = await User.findOne({ username: userId });
    if (!user) {
      user = new User({ username: userId, mainLabelIds: [] });
      await user.save();
    }

    let mainLabel = new MainLabel({ mainLabelId, subLabelIds: [] });
    await mainLabel.save();
    user.mainLabelIds.push(mainLabel._id);
    await user.save();

    res.json({ success: true, mainLabelId });
  } catch (error) {
    res.status(500).json({ error: "Error creating main label" });
  }
};

// Create a Sub Label under a Main Label
export const CreatSubLabel = async (req, res) => {
  const { mainLabelId, subLabelId } = req.body;
  try {
    let mainLabel = await MainLabel.findOne({ mainLabelId });
    if (!mainLabel)
      return res.status(404).json({ error: "Main Label not found" });

    let subLabel = new SubLabel({ subLabelId, messageIds: [] });
    await subLabel.save();
    mainLabel.subLabelIds.push(subLabel._id);
    await mainLabel.save();

    res.json({ success: true, subLabelId });
  } catch (error) {
    res.status(500).json({ error: "Error creating sub label" });
  }
};

// Fetch Main Labels and Sub Labels
export const fetchMainAndSubLebal = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.userId }).populate({
      path: "mainLabelIds",
      populate: { path: "subLabelIds" },
    });

    res.json(
      user
        ? user.mainLabelIds.map((ml) => ({
            mainLabelId: ml.mainLabelId,
            subLabels: ml.subLabelIds.map((sub) => ({
              subLabelId: sub.subLabelId,
            })),
          }))
        : []
    );
  } catch (error) {
    res.status(500).json({ error: "Error fetching labels" });
  }
};

// Fetch Chat History
export const FetchHistory = async (req, res) => {
  try {
    const conversation = await SubLabel.findOne({
      subLabelId: req.params.subLabelId,
    }).populate("messageIds");
    res.json(conversation ? conversation.messageIds : []);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chat" });
  }
};

// Send Message
export const sendMessage = async (req, res) => {
  const { subLabelId, message } = req.body;
  const botReply = await AiResponse(message);
  console.log(botReply);

  try {
    let subLabel = await SubLabel.findOne({ subLabelId });
    if (!subLabel)
      return res.status(404).json({ error: "Sub Label not found" });

    const userMessage = new Chat({ sender: "user", message });
    await userMessage.save();
    subLabel.messageIds.push(userMessage._id);

    const botMessage = new Chat({ sender: "bot", message: botReply });
    await botMessage.save();
    subLabel.messageIds.push(botMessage._id);

    await subLabel.save();
    res.json({ botReply });
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};
