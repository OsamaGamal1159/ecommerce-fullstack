import Product from "./product.model.js";

// Field selection to reduce payload size
const PRODUCT_LIST_FIELDS =
  "name price discountPrice category images rating numReviews isFeatured";
const PRODUCT_FULL_FIELDS = "-__v"; // Exclude version field only

// Cache for featured products (in production, use Redis)
let featuredCache = { data: null, timestamp: 0 };
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get products with pagination and filters
 * @param {Object} query - Query parameters
 * @returns {Object} - Products and pagination info
 */
export const getProductsService = async (query) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit = 12,
      page = 1,
    } = query;

    // Build query filter (removed isPublished filter to show all products)
    let filter = {};

    if (collection && collection.toLowerCase() !== "all") {
      filter.collections = { $in: [collection] };
    }

    if (category && category.toLowerCase() !== "all") {
      filter.category = category;
    }

    if (material) {
      filter.material = { $in: material.split(",") };
    }

    if (brand) {
      filter.brand = { $in: brand.split(",") };
    }

    if (size) {
      filter.sizes = { $in: size.split(",") };
    }

    if (color) {
      filter.colors = { $in: color.split(",") };
    }

    if (gender) {
      filter.gender = gender;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Build sort
    let sort = { createdAt: -1 };
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1, numReviews: -1 };
          break;
        case "newest":
          sort = { createdAt: -1 };
          break;
      }
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const limitNum = Number(limit);

    // Execute count and find in parallel
    const [products, total] = await Promise.all([
      Product.find(filter)
        .select(PRODUCT_LIST_FIELDS)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(), // Use lean() for faster queries (returns plain JS objects)
      Product.countDocuments(filter),
    ]);

    return {
      products,
      pagination: {
        total,
        page: Number(page),
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get best selling products
 */
export const getBestSellerService = async () => {
  try {
    const bestSellers = await Product.find({})
      .select(PRODUCT_LIST_FIELDS)
      .sort({ rating: -1, numReviews: -1 })
      .limit(10)
      .lean();

    return bestSellers;
  } catch (error) {
    throw error;
  }
};

/**
 * Get new arrivals with caching
 */
export const getNewArrivalsService = async () => {
  try {
    const now = Date.now();

    // Check cache
    if (featuredCache.data && now - featuredCache.timestamp < CACHE_DURATION) {
      return featuredCache.data;
    }

    const newArrivals = await Product.find({})
      .select(PRODUCT_LIST_FIELDS)
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();

    // Update cache
    featuredCache = { data: newArrivals, timestamp: now };

    return newArrivals;
  } catch (error) {
    throw error;
  }
};

/**
 * Get featured products
 */
export const getFeaturedProductsService = async () => {
  try {
    const featured = await Product.find({ isFeatured: true })
      .select(PRODUCT_LIST_FIELDS)
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    return featured;
  } catch (error) {
    throw error;
  }
};

/**
 * Get single product with all details
 */
export const getSingleProductService = async (id) => {
  try {
    const product = await Product.findById(id)
      .select(PRODUCT_FULL_FIELDS)
      .lean();

    return product;
  } catch (error) {
    throw error;
  }
};

/**
 * Get similar products
 */
export const getSimilarProductsService = async (id) => {
  try {
    const product = await Product.findById(id).select("gender category");

    if (!product) {
      return [];
    }

    const similar = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    })
      .select(PRODUCT_LIST_FIELDS)
      .limit(8)
      .lean();

    return similar;
  } catch (error) {
    throw error;
  }
};

/**
 * Clear cache (call after product updates)
 */
export const clearProductCache = () => {
  featuredCache = { data: null, timestamp: 0 };
};
