import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import { admin } from "../../../middlewares/admin.middleware.js";
import { getAdminProducts } from "./produtcts.controller.js";


const router = express.Router();

router.get("/", protect, admin, getAdminProducts);

export default router;
