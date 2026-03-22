import express from "express";
import userRoutes from "./modules/user/user.routes.js";
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

export default app;
