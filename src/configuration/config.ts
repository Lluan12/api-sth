import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME;
export const SECRET_KEY = process.env.SECRET_KEY;
export const SALT = process.env.SALT;
