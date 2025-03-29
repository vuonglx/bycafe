/**
 * ProductDetailPage.js
 * 
 * This component displays detailed information about a specific product.
 * It retrieves the product ID from the URL parameters and displays
 * comprehensive product information including:
 * - Product images
 * - Product details (name, price, description)
 * - Product specifications
 * - Add to cart functionality
 * - Related products
 */

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getDeploymentSafeImageUrl, preloadImage } from '../utils/DeploymentImageHelper';
import '../styles/ProductDetailPage.css';

// Sample product data - in a real app, this would come from an API
const sampleProducts = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    category: 'Coffee Beans',
    price: 18.99,
    originalPrice: 22.99,
    image: '/images/ethiopian-yirgacheffe.jpg',
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    description: 'Our Ethiopian Yirgacheffe is a bright and complex coffee with floral notes, citrus acidity, and a smooth, clean finish. Sourced from small farms in the Yirgacheffe region of Ethiopia, this coffee is carefully roasted to highlight its unique characteristics.',
    details: {
      origin: 'Ethiopia, Yirgacheffe region',
      roastLevel: 'Medium',
      flavor: 'Floral, Citrus, Berries',
      process: 'Washed',
      altitude: '1,800 - 2,200 meters',
      weight: '12 oz (340g)'
    },
    images: [
      '/images/ethiopian-yirgacheffe.jpg',
      '/images/coffee-beans-detail1.jpg',
      '/images/coffee-beans-detail2.jpg'
    ]
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    category: 'Coffee Beans',
    price: 16.99,
    image: '/images/colombian-supremo.jpg',
    rating: 4.5,
    reviewCount: 89,
    description: 'Our Colombian Supremo offers a well-balanced flavor profile with caramel sweetness, medium body, and a clean, smooth finish. Sourced from the highlands of Colombia, this coffee is perfect for everyday drinking.',
    details: {
      origin: 'Colombia, Huila region',
      roastLevel: 'Medium',
      flavor: 'Caramel, Nutty, Chocolate',
      process: 'Washed',
      altitude: '1,500 - 1,900 meters',
      weight: '12 oz (340g)'
    },
    images: [
      '/images/colombian-supremo.jpg',
      '/images/coffee-beans-detail1.jpg',
      '/images/coffee-beans-detail2.jpg'
    ]
  },
  {
    id: 3,
    name: 'Chemex Pour-Over',
    category: 'Brewing Equipment',
    price: 45.99,
    originalPrice: 59.99,
    image: '/images/chemex-pour-over.jpg',
    rating: 4.9,
    reviewCount: 56,
    description: 'The classic Chemex Pour-Over Coffee Maker uses a unique, bonded paper filter that removes most of the coffee oils, resulting in a clean, pure, flavorful cup of coffee without bitterness or sediment.',
    details: {
      material: 'Non-porous Borosilicate glass',
      capacity: '6 cups (30 oz)',
      includes: 'Coffee maker, polished wood collar with leather tie',
      dimensions: '5.25" W x 8.25" H x 5.25" D',
      weight: '1.5 lbs'
    },
    images: [
      '/images/chemex-pour-over.jpg',
      '/images/brewing-equipment-detail1.jpg',
      '/images/brewing-equipment-detail2.jpg'
    ]
  },
  {
    id: 4,
    name: 'Espresso Blend',
    category: 'Coffee Beans',
    price: 19.99,
    image: '/images/kenya-aa.jpg',
    rating: 4.7,
    reviewCount: 102,
    premium: true,
    description: 'Our premium Espresso Blend is crafted specifically for espresso brewing methods, featuring a rich, bold flavor with notes of dark chocolate, caramel, and a hint of citrus. Perfect for espresso machines and moka pots.',
    details: {
      origin: 'Brazil, Colombia, Ethiopia blend',
      roastLevel: 'Espresso Roast (Medium-Dark)',
      flavor: 'Dark Chocolate, Caramel, Citrus',
      process: 'Mixed (Washed and Natural)',
      altitude: 'Various',
      weight: '12 oz (340g)'
    },
    images: [
      '/images/kenya-aa.jpg',
      '/images/coffee-beans-detail1.jpg',
      '/images/coffee-beans-detail2.jpg'
    ]
  }
];

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [imageStatus, setImageStatus] = useState({});
  const { addToCart } = useContext(CartContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProduct = () => {
      setLoading(true);
      try {
        // Find the product with the matching ID
        const foundProduct = sampleProducts.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
          setImageStatus({});
          setActiveImage(0);
          
          // Find related products (same category)
          const related = sampleProducts
            .filter(p => p.id !== parseInt(id) && p.category === foundProduct.category)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Preload all images when product changes
  useEffect(() => {
    if (!product) return;

    const loadProductImages = async () => {
      const newStatus = {};
      
      // Preload main product images
      if (product.images && product.images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
          try {
            // Get deployment-safe image URL
            const safeImageUrl = getDeploymentSafeImageUrl(product.images[i]);
            
            await preloadImage(safeImageUrl);
            newStatus[`main_${i}`] = { loaded: true, src: safeImageUrl };
          } catch (error) {
            console.warn(`Failed to load product image: ${product.images[i]}`);
            newStatus[`main_${i}`] = { loaded: false, src: product.images[i] };
          }
        }
      }
      
      // Preload related product images
      for (const relatedProduct of relatedProducts) {
        try {
          // Get deployment-safe image URL
          const safeImageUrl = getDeploymentSafeImageUrl(relatedProduct.image);
          
          await preloadImage(safeImageUrl);
          newStatus[`related_${relatedProduct.id}`] = { loaded: true, src: safeImageUrl };
        } catch (error) {
          console.warn(`Failed to load related product image: ${relatedProduct.image}`);
          newStatus[`related_${relatedProduct.id}`] = { loaded: false, src: relatedProduct.image };
        }
      }
      
      setImageStatus(newStatus);
    };
    
    loadProductImages();
  }, [product, relatedProducts]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleAddToCart = () => {
    if (product) {
      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Show a confirmation message or update the UI
      alert(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
    }
  };

  // Handle image error
  const handleImageError = (index, type = 'main') => {
    console.warn(`Image error for ${type}_${index}`);
    setImageStatus(prev => ({
      ...prev,
      [`${type}_${index}`]: { ...prev[`${type}_${index}`], loaded: false }
    }));
  };

  // Get the image source for an item
  const getImageSource = (index, type = 'main') => {
    const key = `${type}_${index}`;
    
    // If we have preloaded status, use it
    if (imageStatus[key]) {
      return imageStatus[key].src;
    }
    
    // Otherwise use the deployment-safe image URL
    if (type === 'main') {
      return getDeploymentSafeImageUrl(product?.images?.[index]);
    } else if (type === 'related') {
      const relatedProduct = relatedProducts.find(p => p.id === index);
      return getDeploymentSafeImageUrl(relatedProduct?.image);
    }
    
    return '';
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Product Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={getImageSource(activeImage)} 
              alt={product.name} 
              onError={() => handleImageError(activeImage)}
              className={imageStatus[`main_${activeImage}`]?.loaded === false ? 'image-error' : ''}
            />
          </div>
          
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={getImageSource(index)} 
                  alt={`${product.name} - View ${index + 1}`}
                  onError={() => handleImageError(index)}
                  className={imageStatus[`main_${index}`]?.loaded === false ? 'image-error' : ''}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info Section */}
        <div className="product-info">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / 
            <Link to="/catalog">Shop</Link> / 
            <Link to={`/catalog?category=${product.category}`}>{product.category}</Link> / 
            <span>{product.name}</span>
          </div>
          
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-meta">
            <div className="product-rating">
              <div className="stars" style={{ '--rating': product.rating }}>
                <span className="star-count">{product.rating}</span>
              </div>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>
            
            {product.isNew && <span className="badge new">New</span>}
            {product.premium && <span className="badge premium">Premium</span>}
          </div>
          
          <div className="product-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.originalPrice && (
              <span className="discount-percentage">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            )}
          </div>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn decrease" 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input 
                  id="quantity" 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                />
                <button 
                  className="quantity-btn increase" 
                  onClick={() => setQuantity(prev => prev + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            <button className="btn btn-primary add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            
            <button className="btn-icon wishlist" aria-label="Add to wishlist">
              <span className="heart-icon">♡</span>
            </button>
          </div>
          
          <div className="product-details">
            <h3>Product Details</h3>
            <ul>
              {Object.entries(product.details).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map(relatedProduct => (
              <div className="related-product" key={relatedProduct.id}>
                <Link to={`/product/${relatedProduct.id}`} className="related-product-image">
                  <img 
                    src={getImageSource(relatedProduct.id, 'related')} 
                    alt={relatedProduct.name}
                    onError={() => handleImageError(relatedProduct.id, 'related')}
                    className={imageStatus[`related_${relatedProduct.id}`]?.loaded === false ? 'image-error' : ''}
                  />
                </Link>
                <div className="related-product-info">
                  <h3>
                    <Link to={`/product/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                  </h3>
                  <div className="related-product-price">
                    ${relatedProduct.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
