/**
 * ImageConstants.js
 * 
 * Constants for image handling in the ByCafe e-commerce application.
 * Provides fallback image URLs that are guaranteed to work in production.
 */

// Default placeholder image from a reliable CDN
export const DEFAULT_PLACEHOLDER = 'https://via.placeholder.com/300x300?text=ByCafe';

// Banner placeholder images
export const BANNER_PLACEHOLDERS = {
  coffee: 'https://via.placeholder.com/1200x400?text=Premium+Coffee',
  equipment: 'https://via.placeholder.com/1200x400?text=Brewing+Equipment',
  sale: 'https://via.placeholder.com/1200x400?text=Sale'
};

// Product placeholder images
export const PRODUCT_PLACEHOLDERS = {
  coffee: 'https://via.placeholder.com/300x300?text=Coffee',
  equipment: 'https://via.placeholder.com/300x300?text=Equipment',
  accessories: 'https://via.placeholder.com/300x300?text=Accessories',
  gifts: 'https://via.placeholder.com/300x300?text=Gifts'
};

// Category placeholder images
export const CATEGORY_PLACEHOLDERS = {
  coffee: 'https://via.placeholder.com/400x300?text=Coffee+Category',
  equipment: 'https://via.placeholder.com/400x300?text=Equipment+Category',
  accessories: 'https://via.placeholder.com/400x300?text=Accessories+Category',
  gifts: 'https://via.placeholder.com/400x300?text=Gifts+Category'
};
