export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required.");
  }

  try {
    const userOtp = await Otp.findOne({ email });

    if (!userOtp) {
      return res.status(400).send("No OTP found for this email.");
    }

    const { otp: storedOtp, expiryTime } = userOtp;

    if (Date.now() > expiryTime) {
      // Delete expired OTP
      await Otp.deleteOne({ email });
      return res.status(400).send("OTP has expired.");
    }

    if (otp !== storedOtp) {
      return res.status(400).send("Invalid OTP.");
    }

    // OTP is valid; delete it and proceed
    await Otp.deleteOne({ email });
    res.status(200).send({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send("Error verifying OTP.");
  }
};
