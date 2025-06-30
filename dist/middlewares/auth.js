"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configuration/config");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Token not send" });
        return;
    }
    if (!config_1.SECRET_KEY)
        return;
    try {
        jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
        next();
    }
    catch (error) {
        res.status(403).json({ error });
        return;
    }
};
exports.default = authMiddleware;
