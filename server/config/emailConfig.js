import dotenv from "dotenv";
dotenv.config();

export const emailConfig = {
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL, // Replace with your Gmail
    pass: process.env.EMAIL_PASS, // Consider using environment variables
  },
};
