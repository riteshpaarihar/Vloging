import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import User from "../schemas/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token or user not found" });
    }

    req.user = user; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized: " + err.message });
  }
};


export const isAdmin = (req, res, next) => {
  //console.log("REQ.USER in isAdmin middleware:", req.user);

  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied: Admins only" });
  }
  next();
};

