/**
 * ImageTester.js
 * 
 * Utility for testing image loading in the ByCafe application.
 * This can be used to verify that all images load correctly before deployment.
 */

import { DEFAULT_PLACEHOLDER, BANNER_PLACEHOLDERS, PRODUCT_PLACEHOLDERS, CATEGORY_PLACEHOLDERS } from '../constants/ImageConstants';

/**
 * Tests if an image URL is loadable
 * 
 * @param {string} src - Image URL to test
 * @returns {Promise<boolean>} - Promise that resolves to true if image loads, false if it fails
 */
export const testImageUrl = (src) => {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

/**
 * Tests all images in a data collection
 * 
 * @param {Array} items - Array of items with image URLs
 * @param {string} imageUrlKey - Key for the primary image URL in each item
 * @param {string} fallbackUrlKey - Key for the fallback image URL in each item
 * @param {string} itemType - Type of item (e.g., 'product', 'banner', 'category')
 * @returns {Promise<Array>} - Promise that resolves to an array of test results
 */
export const testImagesInCollection = async (items, imageUrlKey, fallbackUrlKey, itemType) => {
  const results = [];
  
  for (const item of items) {
    const id = item.id;
    const name = item.name || item.title || `Item ${id}`;
    const primaryUrl = item[imageUrlKey];
    const fallbackUrl = item[fallbackUrlKey];
    
    // Test primary image
    const primaryLoads = await testImageUrl(primaryUrl);
    
    // Test fallback image if primary fails
    let fallbackLoads = false;
    if (!primaryLoads && fallbackUrl) {
      fallbackLoads = await testImageUrl(fallbackUrl);
    }
    
    // Determine placeholder URL based on item type
    let placeholderUrl = DEFAULT_PLACEHOLDER;
    if (itemType === 'banner' && item.title) {
      const bannerType = item.title.toLowerCase().includes('coffee') ? 'coffee' : 
                        item.title.toLowerCase().includes('equipment') ? 'equipment' : 'sale';
      placeholderUrl = BANNER_PLACEHOLDERS[bannerType] || DEFAULT_PLACEHOLDER;
    } else if (itemType === 'category' && item.id) {
      placeholderUrl = CATEGORY_PLACEHOLDERS[item.id] || DEFAULT_PLACEHOLDER;
    } else if (itemType === 'product' && item.category) {
      placeholderUrl = PRODUCT_PLACEHOLDERS[item.category] || DEFAULT_PLACEHOLDER;
    }
    
    // Test placeholder image if both primary and fallback fail
    let placeholderLoads = false;
    if (!primaryLoads && !fallbackLoads) {
      placeholderLoads = await testImageUrl(placeholderUrl);
    }
    
    // Determine final image source
    let finalImageSource = primaryLoads ? primaryUrl : 
                          fallbackLoads ? fallbackUrl : 
                          placeholderLoads ? placeholderUrl : 
                          DEFAULT_PLACEHOLDER;
    
    // Check if default placeholder loads
    const defaultPlaceholderLoads = await testImageUrl(DEFAULT_PLACEHOLDER);
    
    results.push({
      id,
      name,
      type: itemType,
      primaryUrl,
      primaryLoads,
      fallbackUrl,
      fallbackLoads,
      placeholderUrl,
      placeholderLoads,
      finalImageSource,
      defaultPlaceholderLoads,
      status: primaryLoads ? 'primary' : 
              fallbackLoads ? 'fallback' : 
              placeholderLoads ? 'placeholder' : 
              defaultPlaceholderLoads ? 'default' : 'failed'
    });
  }
  
  return results;
};

/**
 * Logs image test results to the console in a readable format
 * 
 * @param {Array} results - Array of test results
 */
export const logImageTestResults = (results) => {
  console.group('Image Loading Test Results');
  
  // Count by status
  const statusCounts = results.reduce((counts, result) => {
    counts[result.status] = (counts[result.status] || 0) + 1;
    return counts;
  }, {});
  
  console.log('Summary:');
  console.log(`Total images tested: ${results.length}`);
  console.log(`Primary images loaded: ${statusCounts.primary || 0}`);
  console.log(`Fallback images used: ${statusCounts.fallback || 0}`);
  console.log(`Placeholder images used: ${statusCounts.placeholder || 0}`);
  console.log(`Default placeholder used: ${statusCounts.default || 0}`);
  console.log(`Failed images: ${statusCounts.failed || 0}`);
  
  // Group by type
  const typeGroups = results.reduce((groups, result) => {
    if (!groups[result.type]) {
      groups[result.type] = [];
    }
    groups[result.type].push(result);
    return groups;
  }, {});
  
  // Log details by type
  Object.keys(typeGroups).forEach(type => {
    console.group(`${type.charAt(0).toUpperCase() + type.slice(1)} Images`);
    typeGroups[type].forEach(result => {
      console.group(`${result.name} (${result.id})`);
      console.log(`Status: ${result.status}`);
      console.log(`Primary URL: ${result.primaryUrl} (${result.primaryLoads ? 'OK' : 'FAILED'})`);
      if (result.fallbackUrl) {
        console.log(`Fallback URL: ${result.fallbackUrl} (${result.fallbackLoads ? 'OK' : 'FAILED'})`);
      }
      console.log(`Final source: ${result.finalImageSource}`);
      console.groupEnd();
    });
    console.groupEnd();
  });
  
  console.groupEnd();
};

/**
 * Runs a comprehensive test of all images in the application
 * 
 * @param {Object} data - Object containing all data collections to test
 * @returns {Promise<Object>} - Promise that resolves to an object with test results
 */
export const runImageTests = async (data) => {
  const { banners, categories, products } = data;
  
  const bannerResults = await testImagesInCollection(banners, 'imageUrl', 'fallbackImageUrl', 'banner');
  const categoryResults = await testImagesInCollection(categories, 'imageUrl', 'fallbackImageUrl', 'category');
  const productResults = await testImagesInCollection(products, 'imageUrl', 'fallbackImageUrl', 'product');
  
  const allResults = [...bannerResults, ...categoryResults, ...productResults];
  
  logImageTestResults(allResults);
  
  return {
    bannerResults,
    categoryResults,
    productResults,
    allResults
  };
};

export default {
  testImageUrl,
  testImagesInCollection,
  logImageTestResults,
  runImageTests
};
