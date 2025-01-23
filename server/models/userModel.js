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
});

const User = mongoose.model("social-login", userSchema);

export default User;
