import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
  },
  otp: { type: String },
  password: { type: String },
  expiryTime: { type: Date },
});

const User = mongoose.model("User-login", userSchema);

export default User;
