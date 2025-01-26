import { logger } from "./logger.js";

export const handleSuccess = (res, message, data = {}) => {
  res.status(200).send({ message, ...data });
};
export const handleError = (res, errorMessage, status = 500) => {
  logger.error(errorMessage);
  res.status(status).send(errorMessage);
};
