import axios from "axios";
import { oauth2Client } from "../utils/googleClient.js";
import { logger } from "../utils/logger.js";
import { tokenGenerator } from "../services/tokenGenerate.js";
import { User } from "../models/ChatSchema.js";

export const googleAuth = async (req, res, next) => {
  const code = req.query.code;
  const generateUsername = (email) => email?.split("@")[0]; // Extract part before '@'
  try {
    logger.info("Received Google authentication request");

    // Step 1: Exchange code for access token
    const googleRes = await oauth2Client.getToken(code);
    logger.info("Google token received");

    oauth2Client.setCredentials(googleRes.tokens);

    // Step 2: Fetch user info from Google
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    logger.info("User info received from Google");

    const { email, picture } = userRes.data;

    // Step 3: Check if the user already exists in the database
    let user = await User.findOne({ email });
    const username = generateUsername(email);
    if (!user) {
      // User doesn't exist, create a new user
      user = await User.create({
        username,
        email,
        picture,
      });
      logger.info("New user created");
    } else {
      logger.info("User found in database");
    }

    const { _id } = user;
    const token = tokenGenerator(_id, username);
    logger.info("JWT token generated");

    res.status(200).json({
      message: "success",
      token,
      user,
    });
  } catch (err) {
    logger.error("Error during Google authentication", err); // Log the error
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message, // Include error details (only in development)
    });
  }
};
