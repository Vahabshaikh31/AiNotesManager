// Import the logger and morgan logger
import express from "express";
import { logger, morganLogger } from "./utils/logger.js";

const app = express();

// Use the morganLogger for logging HTTP requests
app.use(morganLogger);

// Example route
app.get("/", (req, res) => {
  logger.info("Sample route accessed");
  res.send("Hello from the server!");
});

// Another route with an error
app.post("/error", (req, res) => {
  logger.error("An error occurred during a post request");
  res.status(500).send("Something went wrong!");
});

app.listen(3000, () => {
  logger.info("Server running on http://localhost:5000");
});
