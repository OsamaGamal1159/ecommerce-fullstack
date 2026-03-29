import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import {
  addToCart,
  updateCart,
  deleteCart,
  getUserCart,
} from "./cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/", deleteCart);
router.get("/", getUserCart);

export default router;
