import express from "express";
import { upload } from "../../middlewares/upload.js";
import { uploadImageController } from "./upload.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadImageController);

export default router;
