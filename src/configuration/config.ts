import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI;
export const DB_NAME = process.env.DB_NAME;
export const SECRET_KEY = process.env.SECRET_KEY;
export const SALT = process.env.SALT;
export const API_KEY_CLOUDINARY = process.env.API_KEY_CLOUDINARY;
export const API_SECRET_CLOUDINARY = process.env.API_SECRET_CLOUDINARY;
