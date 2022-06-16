import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  // const token = req.headers["x-access-token"];
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError("No token provided", 403));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError("Invalid token", 403));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(createError("Unauthorized", 403));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError("Unauthorized", 403));
    }
  });
};