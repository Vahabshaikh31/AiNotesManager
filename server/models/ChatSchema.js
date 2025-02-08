import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["user", "bot"], required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const subLabelSchema = new mongoose.Schema(
  {
    subLabelId: { type: String, required: true, unique: true },
    messageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  },
  { timestamps: true }
);

const mainLabelSchema = new mongoose.Schema(
  {
    mainLabelId: { type: String, required: true, unique: true },
    subLabelIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubLabel" }],
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    otp: { type: String },
    password: { type: String, required: true },
    expiryTime: { type: Date },
    mainLabelIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "MainLabel" }],
    subscriptionPlan: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free",
    },
    subscriptionExpiry: { type: Date },
    isSubscribed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
export const SubLabel = mongoose.model("SubLabel", subLabelSchema);
export const MainLabel = mongoose.model("MainLabel", mainLabelSchema);
export const User = mongoose.model("User", userSchema);
