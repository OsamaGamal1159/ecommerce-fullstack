import express from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.routes.js";
import productRouter from "./modules/product/product.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import checkoutRouter from "./modules/checkout/checkout.routes.js";
import orderRouter from "./modules/order/order.routes.js";
import uploadRouter from "./modules/uploads/upload.routes.js";
import subscribeRouter from "./modules/subscribers/subscribers.routes.js";
import adminRouter from "./modules/admin/users/user.routes.js";
import adminOrderRouter from "./modules/admin/orders/orders.routes.js";
import adminProductRouter from "./modules/admin/products/prooducts.routes.js";
import Product from "./modules/product/product.model.js";
const app = express();

// Configure CORS for Vercel deployment
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ecommerce-fullstack-lyart.vercel.app",
    "https://ecommerce-fullstack-1uv3-fdd6mlbxm.vercel.app",
    /^https:\/\/ecommerce-fullstack.*\.vercel\.app$/,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", subscribeRouter);

// Admin
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/products", adminProductRouter);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Debug endpoint - check database status
app.get("/api/debug/db-status", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    const sampleProducts = await Product.find({}).limit(3).lean();

    res.json({
      status: "connected",
      totalProducts,
      sample: sampleProducts,
      message:
        totalProducts === 0
          ? "⚠️ No products in database! Run seeder: npm run seed"
          : "✓ Database has products",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      hint: "Check MongoDB connection string in .env",
    });
  }
});

export default app;
