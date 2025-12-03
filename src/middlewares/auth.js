// src/middlewares/auth.js
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = payload; // payload.sub, payload.email, etc
    return next();
  } catch (err) {
    logger.warn({ message: "Auth failed", err: err.message });
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
