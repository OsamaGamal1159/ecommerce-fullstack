import express from "express";
import userRoutes from "./modules/user/user.routes.js";
import productRouter from "./modules/product/product.routes.js";
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

export default app;
