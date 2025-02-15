import jwt from "jsonwebtoken";

export const tokenGenerator = (_id, username) => {
  return jwt.sign({ _id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT, // Token expiration
  });
};
