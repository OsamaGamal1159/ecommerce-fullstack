import express from "express";
import Product from "../../product/product.model.js";
import protect from "./../../../middlewares/auth.middleware.js";
import { admin } from "../../../middlewares/admin.middleware.js";

export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
