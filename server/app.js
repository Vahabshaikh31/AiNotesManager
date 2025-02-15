import express from "express";
import cors from "cors";
import helmet from "helmet"; // Security headers
import cookieParser from "cookie-parser"; // For secure cookies
import session from "express-session"; // Session management
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import connectDB from "./models/dbConnect.js";

dotenv.config();
const app = express();
connectDB();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Set security headers using helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow frontend script execution
  })
);

// CORS configuration for security
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow frontend origin
    credentials: true, // Enable cookies & authentication
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Restrict headers
  })
);

// Secure session management (Replace 'secret' with a strong value)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
      sameSite: "strict", // Strict CSRF protection
      maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks expiration
    },
  })
);

// Security headers to prevent clickjacking, XSS, and other attacks
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Prevent clickjackingstricting your website from being embedded inside an <iframe> on another website.
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Prevents MIME-type sniffing attacks, which is when browsers try to guess the content type instead of relying on the Content-Type header.
  res.setHeader("Referrer-Policy", "no-referrer");
  // Prevents referrer leakage, meaning when a user clicks a link from your website, the destination website won't receive the full URL of your page as a referrer.
  next();
});

// Routesx
app.use("/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/pdf", pdfRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
