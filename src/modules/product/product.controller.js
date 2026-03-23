import Product from "./product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      sku,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      countInStock,
      image,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      isFeatured,
      isPublished,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      category,
      sku,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      countInStock,
      image,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      isFeatured,
      isPublished,
      weight,
      user: req.user._id,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
