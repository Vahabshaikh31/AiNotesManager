import axios from "axios";
import jwt from "jsonwebtoken";
import { oauth2Client } from "../utils/googleClient.js";
import User from "../models/userModel.js";
import { logger } from "../utils/logger.js";

export const googleAuth = async (req, res, next) => {
  const code = req.query.code;

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

    const { email, name, picture } = userRes.data;

    // Step 3: Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // User doesn't exist, create a new user
      user = await User.create({
        name,
        email,
        picture,
      });
      logger.info("New user created");
    } else {
      logger.info("User found in database");
    }

    // Step 4: Generate JWT token after registration (or login)
    const { _id } = user;
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT, // Token expiration
    });
    logger.info("JWT token generated");

    // Step 5: Return the response with token and user info
    res.status(200).json({
      message: "success",
      token, // Provide token for user authentication
      user, // Provide user details (name, email, etc.)
      picture,
    });
  } catch (err) {
    logger.error("Error during Google authentication", err); // Log the error
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message, // Include error details (only in development)
    });
  }
};
