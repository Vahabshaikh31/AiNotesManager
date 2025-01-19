// Import chalk for coloring the console output
import chalk from "chalk";

// Logger configuration for the front-end (React/Vite)
const Logger = {
  log: (message) => {
    if (import.meta.env.MODE === "development") {
      console.log(chalk.blue(message)); // Blue for regular logs
    }
  },
  info: (message) => {
    if (import.meta.env.MODE === "development") {
      console.log(chalk.green(message)); // Green for info
    }
  },
  warn: (message) => {
    if (import.meta.env.MODE === "development") {
      console.warn(chalk.yellow(message)); // Yellow for warnings
    }
  },
  error: (message) => {
    if (import.meta.env.MODE === "development") {
      console.error(chalk.red(message)); // Red for errors
    }
  },
  debug: (message) => {
    if (import.meta.env.MODE === "development") {
      console.log(chalk.magenta(message)); // Magenta for debug
    }
  },
};

export default Logger;
