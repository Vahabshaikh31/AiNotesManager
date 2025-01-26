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
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true, sparse: true },
//   password: { type: String },
//   name: { type: String, required: true },
//   socialLogin: {
//     google: {
//       id: { type: String, unique: true }, // Google OAuth ID
//       token: { type: String }, // Optional: Access token if you store it
//     },
//     github: {
//       id: { type: String, unique: true }, // GitHub OAuth ID
//       token: { type: String }, // Optional: Access token
//     },
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User-login", userSchema);

// export default User;
