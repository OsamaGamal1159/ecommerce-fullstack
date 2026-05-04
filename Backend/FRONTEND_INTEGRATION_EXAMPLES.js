/**
 * Product API Integration Examples
 * Frontend examples for consuming optimized endpoints
 */

// ============================================
// 1. PAGINATED PRODUCT LIST
// ============================================

export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams({
    page: filters.page || 1,
    limit: filters.limit || 12,
    ...(filters.category && { category: filters.category }),
    ...(filters.sortBy && { sortBy: filters.sortBy }),
    ...(filters.minPrice && { minPrice: filters.minPrice }),
    ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
  });

  try {
    const response = await fetch(`/api/products?${params}`);
    const data = await response.json();

    return {
      products: data.products,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Usage in React:
// const { products, pagination } = await fetchProducts({
//   page: 1,
//   category: 'Men',
//   sortBy: 'popularity'
// });

// ============================================
// 2. INFINITE SCROLL IMPLEMENTATION
// ============================================

export const useInfiniteScroll = () => {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await fetchProducts({ page, limit: 12 });
      setProducts((prev) => [...prev, ...data.products]);
      setPage((prev) => prev + 1);

      if (data.pagination.page >= data.pagination.pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more:", error);
    }
    setLoading(false);
  };

  return { products, loadMore, hasMore, loading };
};

// ============================================
// 3. OPTIMIZED IMAGE DISPLAY
// ============================================

export const OptimizedProductImage = ({ imageUrl, altText }) => {
  // Cloudinary URL parameters for responsive images
  const sizes = {
    small: `${imageUrl}?w=300&q=auto&f=auto`,
    medium: `${imageUrl}?w=600&q=auto&f=auto`,
    large: `${imageUrl}?w=900&q=auto&f=auto`,
  };

  const srcSet = `
    ${sizes.small} 300w,
    ${sizes.medium} 600w,
    ${sizes.large} 900w
  `;

  return (
    <img
      src={sizes.medium}
      srcSet={srcSet}
      sizes="(max-width: 640px) 300px, (max-width: 1024px) 600px, 900px"
      alt={altText}
      loading="lazy"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

// ============================================
// 4. LAZY LOADING WITH INTERSECTION OBSERVER
// ============================================

export const LazyProductImage = ({ imageUrl, altText }) => {
  const [src, setSrc] = React.useState("");
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSrc(imageUrl);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px" },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [imageUrl]);

  return (
    <img
      ref={imgRef}
      src={src || "placeholder.jpg"}
      alt={altText}
      loading="lazy"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

// ============================================
// 5. FETCH SINGLE PRODUCT WITH IMAGES
// ============================================

export const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();

    // Optimize images in response
    if (product.images) {
      product.images = product.images.map((img) => ({
        ...img,
        thumbnail: `${img.url}?w=150&q=auto&f=auto`,
        display: `${img.url}?w=600&q=auto&f=auto`,
        full: img.url,
      }));
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// ============================================
// 6. SIMILAR PRODUCTS
// ============================================

export const fetchSimilarProducts = async (productId) => {
  try {
    const response = await fetch(`/api/products/similar/${productId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching similar products:", error);
    throw error;
  }
};

// ============================================
// 7. BEST SELLERS
// ============================================

export const fetchBestSellers = async () => {
  try {
    const response = await fetch("/api/products/best-seller");
    return await response.json();
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    throw error;
  }
};

// ============================================
// 8. NEW ARRIVALS (CACHED)
// ============================================

export const fetchNewArrivals = async () => {
  try {
    const response = await fetch("/api/products/new-arrivals");
    return await response.json();
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    throw error;
  }
};

// ============================================
// 9. PRODUCT LIST WITH FILTERS (REDUX INTEGRATION)
// ============================================

export const loadFilteredProducts =
  ({ page = 1, filters = {} }) =>
  async (dispatch) => {
    dispatch({ type: "PRODUCTS_LOADING" });

    try {
      const data = await fetchProducts({ page, ...filters });

      dispatch({
        type: "PRODUCTS_SUCCESS",
        payload: {
          products: data.products,
          pagination: data.pagination,
        },
      });
    } catch (error) {
      dispatch({
        type: "PRODUCTS_ERROR",
        payload: error.message,
      });
    }
  };

// ============================================
// 10. INFINITE SCROLL WITH REDUX
// ============================================

export const loadMoreProducts =
  ({ page, filters }) =>
  async (dispatch, getState) => {
    const { products: existingProducts } = getState().products;

    try {
      const data = await fetchProducts({ page, ...filters });

      dispatch({
        type: "PRODUCTS_APPEND",
        payload: {
          products: [...existingProducts, ...data.products],
          pagination: data.pagination,
        },
      });
    } catch (error) {
      console.error("Error loading more products:", error);
    }
  };

// ============================================
// REACT COMPONENT EXAMPLES
// ============================================

/**
 * Product List Component with Pagination
 */
export const ProductList = ({ category = "all" }) => {
  const [products, setProducts] = React.useState([]);
  const [pagination, setPagination] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const loadProducts = async (pageNum) => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        page: pageNum,
        category: category !== "all" ? category : undefined,
      });
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    loadProducts(1);
  }, [category]);

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {loading && <div>Loading...</div>}

      <Pagination
        current={pagination.page}
        total={pagination.pages}
        onPageChange={(pageNum) => {
          setPage(pageNum);
          loadProducts(pageNum);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

/**
 * Product Card Component with Lazy Loading
 */
export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <LazyProductImage
          imageUrl={product.images[0]?.url}
          altText={product.images[0]?.altText || product.name}
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="rating">
          <span className="stars">{"⭐".repeat(product.rating)}</span>
          <span className="reviews">({product.numReviews})</span>
        </div>
        <div className="price">
          <span className="current">${product.price}</span>
          {product.discountPrice && (
            <span className="discount">${product.discountPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};
