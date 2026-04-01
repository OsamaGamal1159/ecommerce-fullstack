import express from "express";
import userRoutes from "./modules/user/user.routes.js";
import productRouter from "./modules/product/product.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import checkoutRouter from "./modules/checkout/checkout.routes.js";
import orderRouter from "./modules/order/order.routes.js";
import uploadRouter from "./modules/uploads/upload.routers.js";
import subscribeRouter from "./modules/subscribers/subscribers.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";
const app = express();
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

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

export default app;
