import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const AiResponse = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.log("Gemini API Error:", error);
    res.status(500).json({ error: "Error interacting with Gemini API" });
  }
};
