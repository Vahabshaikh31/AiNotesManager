import winston from "winston";
import chalk from "chalk";
import morgan from "morgan";

morgan.token("status", (req, res) => {
  const statusCode = res.statusCode;
  if (statusCode >= 400 && statusCode < 500) {
    return chalk.yellow(statusCode);
  } else if (statusCode >= 500) {
    return chalk.red(statusCode);
  }
  return chalk.green(statusCode);
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "server/logs/app.log",
      level: "info",
    }),
  ],
});

const morganLogger = morgan(":method :url :status :response-time ms", {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

export { logger, morganLogger };
