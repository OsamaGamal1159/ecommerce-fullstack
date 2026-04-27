import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./modules/user/user.model.js";
import Product from "./modules/product/product.model.js";
import Cart from "./modules/cart/cart.model.js";
import { products } from "./data/products.js";
import bcrypt from "bcryptjs";

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
    await Product.deleteMany();
    await Cart.deleteMany();

    // ✅ بيدور على admin أو بيعمل واحد جديد
    let adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      adminUser = await User.create({
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        isAdmin: true,
      });
      console.log("✅ Admin user created!");
    }

    const sampleProducts = products.map((product) => ({
      ...product,
      collections: Array.isArray(product.collections)
        ? product.collections
        : [product.collections],
      user: adminUser._id,
    }));

    await Product.insertMany(sampleProducts);
    console.log("✅ Products Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing products:", error);
    process.exit(1);
  }
};

connectDB().then(importProducts);
