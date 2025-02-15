import app from "./app.js";
import { logger } from "./utils/logger.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
