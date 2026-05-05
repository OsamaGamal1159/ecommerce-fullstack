import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    discountPrice: { type: Number },
    category: { type: String, required: true, index: true },
    sku: { type: String, unique: true, required: true, index: true },
    brand: { type: String, index: true },
    sizes: { type: [String], default: [], required: true },
    colors: { type: [String], default: [], required: true },
    collections: { type: [String], default: [], required: true, index: true },
    material: { type: String },
    gender: { type: String, enum: ["Men", "Women", "unisex"], index: true },
    countInStock: { type: Number, default: 0 },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String },
      },
    ],
    rating: { type: Number, default: 0, min: 0, max: 5, index: true },
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
    isFeatured: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: false, index: true },

    weight: Number,
  },
  { timestamps: true },
);

// Compound indexes for common queries
productSchema.index({ category: 1, isFeatured: 1 });
productSchema.index({ gender: 1, category: 1 });
productSchema.index({ collections: 1, isPublished: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ price: 1, category: 1 });

export default mongoose.model("Product", productSchema);
