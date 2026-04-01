import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Subscriber", subscribersSchema);
