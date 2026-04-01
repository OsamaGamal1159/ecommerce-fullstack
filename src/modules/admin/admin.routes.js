import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import { admin } from "../../middlewares/admin.middleware.js";
import {
  getAllUsers,
  addUser,
  UpdateUser,
  deleteUser,
} from "./admin.controller.js";
const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.post("/", protect, admin, addUser);
router.put("/:id", protect, admin, UpdateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
