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
    // First, find or create admin user
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

    // Clear existing products to remove corrupted data
    console.log("🔄 Clearing existing products...");
    await Product.deleteMany({});
    console.log("✅ Cleared all products from database");

    // Add admin user to all products
    const productsWithAdmin = products.map((product) => ({
      ...product,
      user: adminUser._id,
    }));

    // Insert fresh seed data
    console.log("📥 Seeding products from seed data...");
    const createdProducts = await Product.insertMany(productsWithAdmin);
    console.log(`✅ Successfully seeded ${createdProducts.length} products`);

    // Log first product's images for debugging
    if (createdProducts.length > 0) {
      console.log("\n📸 First product images:");
      console.log(JSON.stringify(createdProducts[0].images, null, 2));
    }

    // Clear and setup carts
    await Cart.deleteMany({});
    process.exit();
  } catch (error) {
    console.error("Error importing products:", error);
    process.exit(1);
  }
};

connectDB().then(importProducts);
