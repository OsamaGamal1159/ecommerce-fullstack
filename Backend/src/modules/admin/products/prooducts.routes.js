import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import { admin } from "../../../middlewares/admin.middleware.js";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./produtcts.controller.js";

const router = express.Router();

router.get("/", protect, admin, getAdminProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
