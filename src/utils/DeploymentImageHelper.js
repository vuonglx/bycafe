/**
 * DeploymentImageHelper.js
 * 
 * Utility functions specifically designed to ensure images load correctly
 * when the application is deployed to Netlify or other hosting platforms.
 */

/**
 * Checks if the application is running in a production environment
 * 
 * @returns {boolean} - True if in production, false otherwise
 */
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Checks if the application is running on Netlify
 * 
 * @returns {boolean} - True if on Netlify, false otherwise
 */
export const isNetlify = () => {
  return typeof window !== 'undefined' && 
         window.location.hostname.includes('netlify.app');
};

/**
 * Gets the appropriate image URL based on the deployment environment
 * 
 * @param {string} imageUrl - Image URL (local path)
 * @returns {string} - The appropriate image URL for the current environment
 */
export const getDeploymentSafeImageUrl = (imageUrl) => {
  // Ensure the image URL starts with a slash for proper path resolution
  if (imageUrl && !imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
    return `/${imageUrl}`;
  }
  
  return imageUrl;
};

/**
 * Preloads an image to ensure it's cached
 * 
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('No image source provided'));
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Validates if an image exists and can be loaded
 * 
 * @param {string} src - Image source URL
 * @returns {Promise<boolean>} - Promise that resolves to true if image exists
 */
export const validateImage = async (src) => {
  try {
    await preloadImage(src);
    return true;
  } catch (error) {
    console.warn(`Image validation failed for: ${src}`);
    return false;
  }
};

export default {
  isProduction,
  isNetlify,
  getDeploymentSafeImageUrl,
  preloadImage,
  validateImage
};
