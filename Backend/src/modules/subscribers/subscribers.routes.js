import express from "express";
import { subscribe } from "./subscribers.controller.js";

const router = express.Router();

router.post("/subscribe", subscribe);


export default router;
