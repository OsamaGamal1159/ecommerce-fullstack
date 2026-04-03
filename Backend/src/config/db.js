import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected 🔥");
  } catch (err) {
    console.error(err);
    process.exit(1); 
  }
};
