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

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
    }),
  ],
});

if (process.env.NODE_ENV === "development") {
  morganLogger = morgan(":method :url :status :response-time ms", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  });
}
