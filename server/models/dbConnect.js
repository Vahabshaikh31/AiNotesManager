const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.log("DB CONNECTION FAILED");
    console.log("ERR: ", err);
  });
