import axios from "axios";
import jwt from "jsonwebtoken";
import { oauth2Client } from "../services/utils/googleClient.js";
import User from "../models/userModel.js";
import { logger } from "../services/utils/logger.js";

export const googleAuth = async (req, res, next) => {
  const code = req.query.code;

  try {
    logger.info("Received Google authentication request");

    const googleRes = await oauth2Client.getToken(code);
    logger.info("Google token received");

    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    logger.info("User info received from Google");

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
      logger.info("New user created");
    } else {
      logger.info("User found in database");
    }

    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
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
