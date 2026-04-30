import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (uri) => {
  if (isConnected) return;
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("DB connected 🔥");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
};