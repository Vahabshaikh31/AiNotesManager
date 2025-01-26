import jwt from "jsonwebtoken";

export const tokenGenerator = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT, // Token expiration
  });
};
