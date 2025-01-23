import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");

  const decoded = jwt.decode(tokenWithoutBearer);

  if (!decoded) {
    return res
      .status(401)
      .json({ success: false, message: "Failed to decode token" });
  }
  req.userId = decoded._id;
  next();
};
