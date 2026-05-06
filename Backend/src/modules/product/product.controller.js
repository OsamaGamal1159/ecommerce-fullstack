import Product from "./product.model.js";
import {
  getProductsService,
  getBestSellerService,
  getNewArrivalsService,
  getFeaturedProductsService,
  getSingleProductService,
  getSimilarProductsService,
  clearProductCache,
} from "./product.service.js";
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
      images,
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
      images,
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
    clearProductCache(); // Clear cache on product creation

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

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
      images,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      isFeatured,
      isPublished,
      weight,
    } = req.body;

    // Log incoming images for debugging
    console.log(
      "📥 Received images for update:",
      JSON.stringify(images, null, 2),
    );

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.category = category ?? product.category;
    product.sku = sku ?? product.sku;
    product.brand = brand ?? product.brand;
    product.sizes = sizes ?? product.sizes;
    product.colors = colors ?? product.colors;
    product.collections = collections ?? product.collections;
    product.material = material ?? product.material;
    product.gender = gender ?? product.gender;
    product.countInStock = countInStock ?? product.countInStock;
    product.images = images ?? product.images;
    product.tags = tags ?? product.tags;
    product.metaTitle = metaTitle ?? product.metaTitle;
    product.metaDescription = metaDescription ?? product.metaDescription;
    product.metaKeywords = metaKeywords ?? product.metaKeywords;
    product.dimensions = dimensions ?? product.dimensions;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.weight = weight ?? product.weight;

    // Log images before save
    console.log(
      "💾 Images before save:",
      JSON.stringify(product.images, null, 2),
    );

    const updatedProduct = await product.save();

    // Log images after save
    console.log(
      "✅ Images after save:",
      JSON.stringify(updatedProduct.images, null, 2),
    );

    clearProductCache(); // Clear cache on product update

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    clearProductCache(); // Clear cache on product deletion

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getProducts = async (req, res) => {
  try {
    const result = await getProductsService(req.query);
    // Log first product to debug images
    if (result.products && result.products.length > 0) {
      console.log(
        "First product images:",
        JSON.stringify(result.products[0].images, null, 2),
      );
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const bestSeller = async (req, res) => {
  try {
    const bestSellers = await getBestSellerService();
    res.json(bestSellers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching best sellers", error: error.message });
  }
};

export const newArrivals = async (req, res) => {
  try {
    const newArrivalsList = await getNewArrivalsService();
    res.json(newArrivalsList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching new arrivals", error: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getSingleProductService(id);
    if (product) {
      console.log("Single product images:", product.images);
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const similarProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const similarProducts = await getSimilarProductsService(id);
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching similar products",
      error: error.message,
    });
  }
};
