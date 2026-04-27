import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    brand: { type: String },
    sizes: { type: [String], default: [], required: true },
    colors: { type: [String], default: [], required: true },
    collections: { type: [String], default: [], required: true },
    material: { type: String },
    gender: { type: String, enum: ["Men", "Women", "unisex"] },
    countInStock: { type: Number, default: 0 },
    images: [
      { url: { type: String, required: true }, altText: { type: String } },
    ],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: [String], default: [] },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },

    weight: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
