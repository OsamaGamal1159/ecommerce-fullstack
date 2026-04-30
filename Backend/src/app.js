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
const app = express();
app.use(cors());
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

export default app;
