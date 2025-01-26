import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }
  const tokenWithoutBearer = token.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    req.userId = decoded._id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
