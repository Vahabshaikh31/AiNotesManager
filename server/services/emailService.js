import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { emailConfig } from "../config/emailConfig.js";
import { logger } from "../utils/logger.js";
dotenv.config();
const transport = nodemailer.createTransport(emailConfig);

export const sendMail = async (to, subject, message) => {
  try {
    const info = await transport.sendMail({
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      html: message,
    });
    logger.info("Email sent", { messageId: info.messageId });
  } catch (error) {
    logger.error("Error sending email", { error: error.message });
    throw error;
  }
};
