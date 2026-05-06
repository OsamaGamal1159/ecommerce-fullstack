/**
 * Cloudinary Image Optimization Utility
 * Generates optimized image URLs for different use cases
 */

/**
 * Generate optimized Cloudinary URL
 * @param {string} url - Original Cloudinary URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized URL
 */
export const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!url) {
    console.warn("⚠️ Empty URL passed to optimizeCloudinaryUrl");
    return "";
  }

  const {
    width = 300,
    quality = "auto",
    format = "auto",
    fit = "fill",
  } = options;

  const CLOUDINARY_CLOUD_NAME = "dtvueqy4l";
  const transformation = `c_${fit},w_${width},q_${quality},f_${format}`;

  console.log(`📸 Input URL: ${url}`);

  // If it's a full Cloudinary URL
  if (url.includes("cloudinary")) {
    // Check if transformation already exists
    if (url.includes(`w_${width}`)) {
      console.log(`✅ Already optimized, returning: ${url}`);
      return url; // Already optimized
    }

    // Match the pattern: /upload/v{version}/{public_id} or /upload/{public_id}
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    if (match) {
      const publicId = match[1];
      const optimizedUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
      console.log(`✅ Cloudinary URL optimized to: ${optimizedUrl}`);
      return optimizedUrl;
    }
  }

  // If it's just a public ID (no URL scheme or domain)
  if (!url.startsWith("http") && !url.startsWith("data:")) {
    const optimizedUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${url}`;
    console.log(`✅ Public ID converted to: ${optimizedUrl}`);
    return optimizedUrl;
  }

  // For external URLs (picsum, etc.), return as-is (can't transform non-Cloudinary URLs)
  console.log(`ℹ️ External URL, returning as-is: ${url}`);
  return url;
};

/**
 * Generate multiple sizes for responsive images
 * @param {string} url - Original image URL
 * @returns {Object} - Object with different image sizes
 */
export const getResponsiveImages = (url) => {
  return {
    thumbnail: optimizeCloudinaryUrl(url, { width: 150, quality: "auto" }),
    small: optimizeCloudinaryUrl(url, { width: 300, quality: "auto" }),
    medium: optimizeCloudinaryUrl(url, { width: 600, quality: "auto" }),
    large: optimizeCloudinaryUrl(url, { width: 900, quality: "auto" }),
    original: url,
  };
};

/**
 * Generate srcSet string for responsive images
 * @param {string} url - Original image URL
 * @returns {string} - srcSet string for use in img tags
 */
export const getSrcSet = (url) => {
  const sizes = getResponsiveImages(url);
  return `
    ${sizes.thumbnail} 150w,
    ${sizes.small} 300w,
    ${sizes.medium} 600w,
    ${sizes.large} 900w
  `.trim();
};

/**
 * Generate WebP alternatives for better compression
 * @param {string} url - Original image URL
 * @returns {Object} - Object with original and WebP formats
 */
export const getImageFormats = (url) => {
  return {
    webp: optimizeCloudinaryUrl(url, { format: "webp", width: 600 }),
    jpg: optimizeCloudinaryUrl(url, { format: "jpg", width: 600 }),
  };
};

/**
 * Transform product image data with optimization
 * @param {Array} images - Array of image objects
 * @returns {Array} - Optimized image objects
 */
export const optimizeProductImages = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return [];
  }

  return images.map((image) => {
    // Ensure image has a url property
    if (!image || !image.url) {
      console.warn("Image without URL detected:", image);
      return {
        url: "",
        altText: image?.altText || "",
        thumbnail: "",
        display: "",
        full: "",
        srcSet: "",
      };
    }

    console.log("🔧 Optimizing image URL:", image.url);

    const optimized = {
      ...image,
      url: image.url,
      thumbnail: optimizeCloudinaryUrl(image.url, { width: 150 }),
      display: optimizeCloudinaryUrl(image.url, { width: 600 }),
      full: image.url,
      srcSet: getSrcSet(image.url),
    };

    console.log("✅ Optimized image:", JSON.stringify(optimized, null, 2));
    return optimized;
  });
};
