import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  similarProduct,
  bestSeller,
  singleProduct,
  newArrivals,
} from "./product.controller.js";
import protect from "../../middlewares/auth.middleware.js";
import { admin } from "../../middlewares/admin.middelware.js";
const router = express.Router();

router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/", getProducts);
router.get("/similar/:id", similarProduct);
router.get("/best-seller", bestSeller);
router.get("/new-arrivals", newArrivals);
router.get("/:id", singleProduct);

export default router;
