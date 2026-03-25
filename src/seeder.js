import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./modules/user/user.model.js";
import Product from "./modules/product/product.model.js";
import Cart from "./modules/cart/cart.model.js";
import { products } from "./data/products.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const importProducts = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      throw new Error("No admin user found! Create an admin first.");
    }

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser._id,
    }));

    await Product.insertMany(sampleProducts);

    console.log("Products Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing products:", error);
    process.exit(1);
  }
};

connectDB().then(importProducts);
