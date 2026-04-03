import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

export const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
