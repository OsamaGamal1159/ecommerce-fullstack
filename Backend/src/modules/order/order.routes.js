import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import { getUserOrders, getOrderDetails } from "./order.controller.js";
const router = express.Router();

router.get("/my-orders", protect, getUserOrders);
router.get("/:id", protect, getOrderDetails);

export default router;
