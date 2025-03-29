/**
 * ProductGrid.js
 * 
 * This component displays a grid of products based on filtering, sorting, and search criteria.
 * It handles filtering products by various criteria, sorting them according to user preference,
 * and displaying them in a responsive grid layout.
 * 
 * If no products match the current filters/search, it displays a "No products found" message.
 */

import React from 'react';
import ProductCard from '../ProductCard';
import '../../styles/ProductGrid.css';

// Sample product data - in a real app, this would come from an API or props
const sampleProducts = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    category: 'Coffee Beans',
    price: 18.99,
    originalPrice: 22.99,
    image: '/images/ethiopian-yirgacheffe.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1559525323-cbb5269e4497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    origin: 'Ethiopia',
    roastLevel: 'Medium'
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    category: 'Coffee Beans',
    price: 16.99,
    image: '/images/colombian-supremo.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    reviewCount: 89,
    origin: 'Colombia',
    roastLevel: 'Medium'
  },
  {
    id: 3,
    name: 'Chemex Pour-Over',
    category: 'Brewing Equipment',
    price: 45.99,
    originalPrice: 59.99,
    image: '/images/chemex-pour-over.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 56
  },
  {
    id: 4,
    name: 'Espresso Blend',
    category: 'Coffee Beans',
    price: 19.99,
    image: '/images/kenya-aa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1587734361993-0490df9a84b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviewCount: 102,
    premium: true,
    origin: 'Brazil',
    roastLevel: 'Espresso Roast'
  },
  {
    id: 5,
    name: 'Ceramic Coffee Mug',
    category: 'Accessories',
    price: 12.99,
    originalPrice: 16.99,
    image: '/images/ceramic-mug.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: 6,
    name: 'Coffee Grinder',
    category: 'Brewing Equipment',
    price: 49.99,
    image: '/images/coffee-grinder.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 45,
    isNew: true
  },
  {
    id: 7,
    name: 'Kenya AA',
    category: 'Coffee Beans',
    price: 21.99,
    image: '/images/kenya-aa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1621555470436-d36e9683bae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 67,
    premium: true,
    origin: 'Kenya',
    roastLevel: 'Light Roast'
  },
  {
    id: 8,
    name: 'Coffee Gift Set',
    category: 'Gift Sets',
    price: 59.99,
    originalPrice: 79.99,
    image: '/images/coffee-gift-set.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviewCount: 34
  },
  {
    id: 9,
    name: 'Dark Roast Blend',
    category: 'Coffee Beans',
    price: 17.99,
    image: '/images/dark-roast-blend.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    reviewCount: 92,
    origin: 'Mixed',
    roastLevel: 'Dark Roast'
  },
  {
    id: 10,
    name: 'French Press',
    category: 'Brewing Equipment',
    price: 34.99,
    image: '/images/french-press.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviewCount: 63
  },
  {
    id: 11,
    name: 'Coffee Scale',
    category: 'Accessories',
    price: 24.99,
    image: '/images/coffee-scale.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1517705600644-e86f11e8b1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    reviewCount: 42,
    isNew: true
  },
  {
    id: 12,
    name: 'Guatemala Antigua',
    category: 'Coffee Beans',
    price: 18.99,
    image: '/images/guatemala-antigua.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 75,
    origin: 'Guatemala',
    roastLevel: 'Medium Roast'
  }
];

function ProductGrid({ filters, sortBy, searchQuery }) {
  /**
   * Filter products based on the selected filters, sort criteria, and search query
   * 
   * This is a simplified version - in a real app, this would likely be more complex
   * and potentially handled on the server side for large product catalogs
   */
  const filteredProducts = sampleProducts.filter(product => {
    // Apply search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filters if any are selected
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(product.category)) {
        return false;
      }
    }
    
    // Apply price filters if any are selected
    if (filters.price && filters.price.length > 0) {
      const price = product.price;
      let matchesPrice = false;
      
      for (const priceRange of filters.price) {
        if (priceRange === 'Under $15' && price < 15) {
          matchesPrice = true;
        } else if (priceRange === '$15 - $30' && price >= 15 && price <= 30) {
          matchesPrice = true;
        } else if (priceRange === '$30 - $50' && price > 30 && price <= 50) {
          matchesPrice = true;
        } else if (priceRange === 'Over $50' && price > 50) {
          matchesPrice = true;
        }
      }
      
      if (!matchesPrice) {
        return false;
      }
    }
    
    // Apply roast level filters if any are selected
    if (filters.roastLevel && filters.roastLevel.length > 0 && product.roastLevel) {
      if (!filters.roastLevel.includes(product.roastLevel)) {
        return false;
      }
    }
    
    // Apply origin filters if any are selected
    if (filters.origin && filters.origin.length > 0 && product.origin) {
      if (!filters.origin.includes(product.origin)) {
        return false;
      }
    }
    
    // Product passed all filters
    return true;
  });
  
  /**
   * Sort the filtered products based on the selected sort criteria
   */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'newest') {
      // For demo purposes, we'll use isNew as a proxy for "newest"
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return b.reviewCount - a.reviewCount; // Secondary sort by popularity
    } else {
      // Default: popularity (using review count as a proxy)
      return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="product-grid">
      {sortedProducts.length > 0 ? (
        // Map through sorted products and render a ProductCard for each
        sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        // Display a message when no products match the current filters
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
