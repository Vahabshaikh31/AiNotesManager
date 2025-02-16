const colors = {
  info: "\x1b[34m", // Blue
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  debug: "\x1b[36m", // Cyan
  reset: "\x1b[0m", // Reset to default color
};

const log = (level, message, data = null) => {
  if (process.env.NODE_ENV !== "development") return; // Log only in development mode

  const timestamp = new Date().toISOString();
  const color = colors[level] || colors.reset;
  const logMessage = `${color}[${timestamp}] [${level.toUpperCase()}] ${message}${
    colors.reset
  }`;

  if (data) {
    console.log(logMessage, data);
  } else {
    console.log(logMessage);
  }
};

// Logger functions
export const Logger = {
  info: (message, data = null) => log("info", message, data),
  warn: (message, data = null) => log("warn", message, data),
  error: (message, data = null) => log("error", message, data),
  debug: (message, data = null) => log("debug", message, data),
};
