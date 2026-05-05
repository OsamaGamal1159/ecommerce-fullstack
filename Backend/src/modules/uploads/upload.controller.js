import { streamUpload } from "../../utils/uploadImage.js";

export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await streamUpload(req.file.buffer);

    if (!result || !result.secure_url) {
      console.log("Upload failed, no secure_url returned:", result);
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR ", error);
    res.status(500).json({ message: error.message });
  }
};
