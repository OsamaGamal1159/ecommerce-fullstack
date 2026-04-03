import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import { admin } from "../../../middlewares/admin.middleware.js";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "./orders.controller.js";

const router = express.Router();

router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

export default router;
