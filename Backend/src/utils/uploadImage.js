import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

export const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ecommerce", // Store in ecommerce folder
        resource_type: "auto", // Auto-detect resource type
        timeout: 60000, // 60 second timeout
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary upload error:", error);
          reject(error);
        } else {
          console.log("✅ Cloudinary upload successful!");
          console.log("   Secure URL:", result.secure_url);
          console.log("   Public ID:", result.public_id);
          console.log("   Full response:", JSON.stringify(result, null, 2));
          resolve(result);
        }
      },
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
