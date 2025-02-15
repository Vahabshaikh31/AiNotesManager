import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["user", "bot"], required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const subSubLabelSchema = new mongoose.Schema(
  {
    subSubLabelName: { type: String, unique: true },
    messageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  },
  { timestamps: true }
);

const subLabelSchema = new mongoose.Schema(
  {
    subLabelName: { type: String, unique: true },
    subSubLabelIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubSubLabel" },
    ],
  },
  { timestamps: true }
);

const mainLabelSchema = new mongoose.Schema(
  {
    mainLabelName: { type: String, unique: true }, // Changed from mainLabelId
    subLabelIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubLabel" }],
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    picture: { type: String },
    otp: { type: String },
    password: { type: String },
    expiryTime: { type: Date },
    mainLabels: [{ type: mongoose.Schema.Types.ObjectId, ref: "MainLabel" }], // Updated field
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
export const SubSubLabel = mongoose.model("SubSubLabel", subSubLabelSchema);
export const SubLabel = mongoose.model("SubLabel", subLabelSchema);
export const MainLabel = mongoose.model("MainLabel", mainLabelSchema);
export const User = mongoose.model("User", userSchema);
