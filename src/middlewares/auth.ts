import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configuration/config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Token not send" });
    return;
  }

  if (!SECRET_KEY) return;
  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    res.status(403).json({ error });
    return;
  }
};

export default authMiddleware;
