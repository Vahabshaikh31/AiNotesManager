import { sendMail } from "../services/emailService.js";
import { generateOtp } from "../services/utils/otpUtils.js";
import { generateOtpEmailMessage } from "../services/utils/otpEmailTemplate.js"; // Import the template function
import { logger } from "../services/utils/logger.js";

// Function to send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    logger.error("Email is Not Provided by the User");
    return res.status(400).send("Email is required.");
  }

  const otp = generateOtp();
  logger.info("OTP Generated");

  const message = generateOtpEmailMessage(otp);

  try {
    await sendMail(email, "Your OTP for verification", message);
    logger.info("OTP sent to the user's email");
    res.status(200).send({ message: "OTP sent successfully", otp });
  } catch (error) {
    logger.info("OTP sent to the user's email", error);

    res.status(500).send("Error sending OTP");
  }
};
