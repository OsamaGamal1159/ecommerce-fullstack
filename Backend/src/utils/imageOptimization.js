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
  if (!url) return "";

  const {
    width = 300,
    quality = "auto",
    format = "auto",
    fit = "fill",
  } = options;

  // If it's already a Cloudinary URL, extract the public ID and rebuild with transformations
  if (url.includes("cloudinary")) {
    // Match the pattern: /upload/v{version}/{public_id}
    const match = url.match(/\/upload\/(.*?)\//);
    if (match) {
      const cloudinaryPath = match[0];
      const publicId = url.substring(
        url.indexOf(cloudinaryPath) + cloudinaryPath.length,
      );

      return url.replace(
        `${cloudinaryPath}${publicId}`,
        `${cloudinaryPath}c_${fit},w_${width},q_${quality},f_${format}/${publicId}`,
      );
    }
  }

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
  if (!images || !Array.isArray(images)) {
    return [];
  }

  return images.map((image) => ({
    ...image,
    thumbnail: optimizeCloudinaryUrl(image.url, { width: 150 }),
    display: optimizeCloudinaryUrl(image.url, { width: 600 }),
    full: image.url,
    srcSet: getSrcSet(image.url),
  }));
};
