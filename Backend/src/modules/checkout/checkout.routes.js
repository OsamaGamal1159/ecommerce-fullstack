import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import {
  createCheckout,
  updateCheckout,
  createOrderFromCheckout,
} from "./checkout.controller.js";

const router = express.Router();

router.post("/", protect, createCheckout);
router.put("/:id/pay", protect, updateCheckout);
router.post("/:id/finalize", protect, createOrderFromCheckout);

export default router;
