/**
 * ProductCard.js
 * 
 * This component displays a single product in a card format for the product catalog.
 * It shows product details including:
 * - Product image
 * - Category
 * - Name
 * - Rating and review count
 * - Price (with original price if on sale)
 * - Action buttons (add to cart, add to wishlist)
 * 
 * The component also displays badges for special product attributes (new, sale, premium).
 */

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getDeploymentSafeImageUrl, preloadImage } from '../utils/DeploymentImageHelper';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  
  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Load and validate the image
  useEffect(() => {
    const loadImage = async () => {
      try {
        // Get deployment-safe image URL
        const safeImageUrl = getDeploymentSafeImageUrl(product.image || product.imageUrl);
        
        // Try to load the image
        await preloadImage(safeImageUrl);
        setImageSrc(safeImageUrl);
        setImageLoaded(true);
      } catch (error) {
        console.warn(`Failed to load product image: ${product.image || product.imageUrl}`);
        setImageLoaded(false);
        setImageSrc(product.image || product.imageUrl);
      }
    };

    loadImage();
  }, [product]);

  // Handle image loading error
  const handleImageError = () => {
    console.warn(`Image error for product ${product.id}`);
    setImageLoaded(false);
  };

  // Add to cart handler
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    // Show a confirmation message or update the UI
    // This could be replaced with a toast notification in a real app
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          {/* Product badges */}
          {product.isNew && <span className="badge new">New</span>}
          {discountPercentage > 0 && <span className="badge sale">{discountPercentage}% Off</span>}
          {product.premium && <span className="badge premium">Premium</span>}
          
          {/* Product image with error handling */}
          <img 
            src={imageSrc} 
            alt={product.name} 
            onError={handleImageError}
            className={!imageLoaded ? 'image-error' : ''}
          />
        </div>
        
        <div className="product-info">
          {product.category && (
            <span className="product-category">{product.category}</span>
          )}
          
          <h3 className="product-name">{product.name}</h3>
          
          {/* Product rating */}
          {product.rating && (
            <div className="product-rating">
              <div className="stars" style={{ '--rating': product.rating }}>
                <span className="star-count">{product.rating}</span>
              </div>
              {product.reviewCount && (
                <span className="review-count">({product.reviewCount})</span>
              )}
            </div>
          )}
          
          {/* Product price */}
          <div className="product-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Product actions */}
      <div className="product-actions">
        <button 
          className="btn btn-primary add-to-cart" 
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
        <button 
          className="btn-icon wishlist" 
          aria-label={`Add ${product.name} to wishlist`}
          onClick={(e) => e.preventDefault()}
        >
          <span className="heart-icon">♡</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;