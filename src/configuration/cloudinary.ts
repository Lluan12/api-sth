import { v2 as cloudinary } from "cloudinary";
import { API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } from "./config";

cloudinary.config({
  cloud_name: "dn0oizzah",
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY,
});

export default cloudinary;
