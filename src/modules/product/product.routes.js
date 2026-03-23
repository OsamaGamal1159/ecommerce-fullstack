import express from "express";
import {
  createProduct
} from "./product.controller.js";
import  protect  from "../../middlewares/auth.middleware.js";
import { admin } from "../../middlewares/admin.middelware.js";
const router = express.Router();

router.get("/", protect,admin, createProduct);

export default router;
