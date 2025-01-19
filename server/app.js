import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

app.use("/api/auth/", authRoutes);
app.use("/api/otp", otpRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app; // Export the app for use in server.js
