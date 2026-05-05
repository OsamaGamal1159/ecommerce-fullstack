import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

export const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        transformation: [
          { width: 1200, height: 1200, crop: "limit" }, // Resize to max 1200x1200
          { quality: "auto" }, // Auto quality
          { format: "auto" }, // Auto format (webp, etc.)
        ],
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
