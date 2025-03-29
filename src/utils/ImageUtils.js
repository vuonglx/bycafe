/**
 * ImageUtils.js
 * 
 * Utility functions for handling images in the ByCafe e-commerce application.
 * Implements a multi-level fallback system for image loading.
 */

// Default placeholder image that is guaranteed to work
export const DEFAULT_PLACEHOLDER = '/images/placeholder-product.jpg';

/**
 * Determines the appropriate image source based on error states
 * 
 * @param {Object} item - The item containing image URLs
 * @param {string} item.imageUrl - Primary image URL
 * @param {string} item.fallbackImageUrl - Fallback image URL
 * @param {Object} imageErrors - Object tracking image loading errors
 * @param {string} id - Unique identifier for the item
 * @param {string} type - Type of image (e.g., 'product', 'banner', 'category')
 * @returns {string} - The appropriate image URL to use
 */
export const getImageSource = (item, imageErrors, id, type) => {
  const errorKey = `${type}_${id}`;
  
  if (imageErrors[errorKey]) {
    return item.fallbackImageUrl || DEFAULT_PLACEHOLDER;
  }
  
  return item.imageUrl;
};

/**
 * Creates an error handler function for images
 * 
 * @param {Function} setImageErrors - State setter function for image errors
 * @param {string} id - Unique identifier for the item
 * @param {string} type - Type of image (e.g., 'product', 'banner', 'category')
 * @returns {Function} - Error handler function for the image
 */
export const createImageErrorHandler = (setImageErrors, id, type) => {
  return () => {
    setImageErrors(prev => ({
      ...prev,
      [`${type}_${id}`]: true
    }));
  };
};

/**
 * Preloads an image to check if it loads successfully
 * 
 * @param {string} src - Image URL to preload
 * @returns {Promise} - Promise that resolves if image loads, rejects if it fails
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Attempts to load an image with fallbacks
 * 
 * @param {string} primarySrc - Primary image URL
 * @param {string} fallbackSrc - Fallback image URL
 * @param {string} defaultSrc - Default placeholder image URL
 * @returns {Promise<string>} - Promise that resolves with the URL of the first successfully loaded image
 */
export const loadImageWithFallback = async (primarySrc, fallbackSrc, defaultSrc = DEFAULT_PLACEHOLDER) => {
  try {
    return await preloadImage(primarySrc);
  } catch (error) {
    try {
      return await preloadImage(fallbackSrc);
    } catch (fallbackError) {
      return defaultSrc;
    }
  }
};
