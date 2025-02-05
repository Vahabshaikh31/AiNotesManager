import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./models/dbConnect.js";
import aiRoutes from "./routes/aiRoutes.js";
import ChatRoutes from './routes/ChatRoutes.js'
const app = express();
connectDB();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/chat', ChatRoutes)

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app; // Backend - Node.js + Express + MongoDB
