import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./models/dbConnect.js";

const app = express();
connectDB();

// Middlewares
app.use(express.json());

// Set the Cross-Origin-Opener-Policy header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

app.use("/api/otp", otpRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app; // Export the app for use in server.js
