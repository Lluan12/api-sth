import cloudinary from "../configuration/cloudinary";
import streamifier from "streamifier";

export function uploadCloudfary(id: string, file: Express.Multer.File): Promise<any> {
  return new Promise((resolve, reject) => {
    const name = file.originalname.split(".")[0]
    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads/" + id, public_id: name, overwrite: true }, // opcional
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}
