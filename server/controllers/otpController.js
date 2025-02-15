import { sendMail } from "../services/emailService.js";
import { generateOtp } from "../utils/otpUtils.js";
import { generateOtpEmailMessage } from "../utils/otpEmailTemplate.js";
import { logger } from "../utils/logger.js";
import { User } from "../models/ChatSchema.js";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../services/tokenGenerate.js";
import { generateUsername } from "../services/generateUsername.js";

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    logger.warn("Email is required for OTP request.");
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.password) {
      logger.info(`User already exists: ${email}`);
      return res.status(200).json({ message: "User already exists", email });
    }

    const otp = generateOtp();
    const expiryTime = Date.now() + 5 * 60 * 1000;
    const message = generateOtpEmailMessage(otp);

    await User.deleteOne({ email }); // Remove old data if exists
    await User.create({ email, otp, expiryTime });
    await sendMail(email, "Your OTP for verification", message);

    logger.info(`OTP sent successfully to ${email}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    logger.error(`Error sending OTP for ${email}: ${error.message}`);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    logger.warn("Email or OTP is missing.");
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  try {
    const userOtp = await User.findOne({ email });

    if (!userOtp) {
      logger.warn(`No OTP found for ${email}`);
      return res.status(400).json({ message: "No OTP found for this email." });
    }

    if (Date.now() > userOtp.expiryTime) {
      logger.warn(`OTP expired for ${email}`);
      return res.status(400).json({ message: "OTP has expired." });
    }

    if (otp !== userOtp.otp) {
      logger.warn(`Invalid OTP for ${email}`);
      return res.status(400).json({ message: "Invalid OTP." });
    }

    await User.deleteOne({ email });
    logger.info(`OTP verified successfully for ${email}`);
    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    logger.error(`Error verifying OTP for ${email}: ${error.message}`);
    res.status(500).json({ message: "Error verifying OTP." });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn("Email, name, or password is missing during registration.");
    return res
      .status(400)
      .json({ message: "Email, name, and password are required." });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      logger.info(`User already exists: ${email}`);
      return res.status(200).json({ message: "User already exists", email });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Async hashing
    const username = generateUsername(email);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const { _id } = user;
    const token = tokenGenerator(_id, username);

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    logger.error(
      `Error registering user with email ${email}: ${error.message}`
    );
    res.status(500).json({ message: "Error registering user." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn("Email or password is missing during login.");
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`User not found: ${email}`);
      return res.status(404).json({ message: "User not found", email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn(`Invalid password attempt for ${email}`);
      return res.status(400).json({ message: "Invalid password." });
    }

    const { _id } = user;
    const token = tokenGenerator(_id);
    logger.info(`User logged in successfully: ${email}`);

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    logger.error(`Error logging in user with email ${email}: ${error.message}`);
    res.status(500).json({ message: "Error logging in user." });
  }
};
