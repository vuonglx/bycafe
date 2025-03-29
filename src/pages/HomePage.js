// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import { getDeploymentSafeImageUrl, preloadImage, validateImage } from '../utils/DeploymentImageHelper';
import { bannerSlides, featuredProducts, categories } from '../data/mockData';

function HomePage() {
  // State to track image loading status
  const [imageStatus, setImageStatus] = useState({});
  
  // Preload and validate all images on component mount
  useEffect(() => {
    const preloadAllImages = async () => {
      const newStatus = {};
      
      // Preload banner images
      for (const slide of bannerSlides) {
        try {
          const safeImageUrl = getDeploymentSafeImageUrl(slide.imageUrl);
          await preloadImage(safeImageUrl);
          newStatus[`banner_${slide.id}`] = { loaded: true, src: safeImageUrl };
        } catch (error) {
          console.warn(`Failed to load banner image: ${slide.imageUrl}`);
          newStatus[`banner_${slide.id}`] = { loaded: false, src: slide.imageUrl };
        }
      }
      
      // Preload category images
      for (const category of categories) {
        try {
          const safeImageUrl = getDeploymentSafeImageUrl(category.imageUrl);
          await preloadImage(safeImageUrl);
          newStatus[`category_${category.id}`] = { loaded: true, src: safeImageUrl };
        } catch (error) {
          console.warn(`Failed to load category image: ${category.imageUrl}`);
          newStatus[`category_${category.id}`] = { loaded: false, src: category.imageUrl };
        }
      }
      
      // Preload product images
      for (const product of featuredProducts) {
        try {
          const safeImageUrl = getDeploymentSafeImageUrl(product.imageUrl);
          await preloadImage(safeImageUrl);
          newStatus[`product_${product.id}`] = { loaded: true, src: safeImageUrl };
        } catch (error) {
          console.warn(`Failed to load product image: ${product.imageUrl}`);
          newStatus[`product_${product.id}`] = { loaded: false, src: product.imageUrl };
        }
      }
      
      setImageStatus(newStatus);
    };
    
    preloadAllImages();
  }, []);
  
  // Handle image error
  const handleImageError = (id, type) => {
    console.warn(`Image error for ${type}_${id}`);
    setImageStatus(prev => ({
      ...prev,
      [`${type}_${id}`]: { ...prev[`${type}_${id}`], loaded: false }
    }));
  };
  
  // Get the image source for an item
  const getImageSource = (item, type) => {
    const key = `${type}_${item.id}`;
    
    // If we have preloaded status, use it
    if (imageStatus[key]) {
      return imageStatus[key].src;
    }
    
    // Otherwise use the deployment-safe image URL
    return getDeploymentSafeImageUrl(item.imageUrl);
  };

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-carousel">
          {bannerSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`hero-slide ${index === 0 ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${getImageSource(slide, 'banner')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <Link to={slide.ctaLink} className="btn btn-primary">{slide.ctaText}</Link>
              </div>
            </div>
          ))}
          <div className="carousel-controls">
            <button className="carousel-arrow prev" aria-label="Previous slide">
              <span>&#10094;</span>
            </button>
            <div className="carousel-indicators">
              {bannerSlides.map((slide, index) => (
                <button 
                  key={slide.id} 
                  className={`carousel-indicator ${index === 0 ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <button className="carousel-arrow next" aria-label="Next slide">
              <span>&#10095;</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/catalog" className="view-all">View All Categories</Link>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/catalog?category=${category.id}`} className="category-card" key={category.id}>
              <div 
                className="category-image" 
                style={{ 
                  backgroundImage: `url(${getImageSource(category, 'category')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <span className="category-icon">{category.icon}</span>
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/catalog" className="view-all">View All Products</Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-badges">
                {product.isNew && <span className="badge new">New</span>}
                {product.isSale && <span className="badge sale">Sale</span>}
              </div>
              <Link to={`/product/${product.id}`} className="product-image">
                <img 
                  src={getImageSource(product, 'product')} 
                  alt={product.title}
                  onError={() => handleImageError(product.id, 'product')}
                />
              </Link>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <div className="product-rating">
                  <div className="stars" style={{ '--rating': product.rating }}>
                    <span className="star-count">{product.rating}</span>
                  </div>
                  <span className="review-count">({product.reviewCount})</span>
                </div>
                <div className="product-price">
                  {product.originalPrice ? (
                    <>
                      <span className="current-price">${product.price.toFixed(2)}</span>
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="current-price">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="product-actions">
                  <button className="btn btn-primary add-to-cart">Add to Cart</button>
                  <button className="btn btn-icon wishlist" aria-label="Add to wishlist">
                    <span className="heart-icon">♡</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
        </div>
        <div className="testimonials-container">
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"The Ethiopian Yirgacheffe is absolutely divine. The fruity notes and smooth finish make it my go-to morning coffee."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JD</div>
              <div className="author-info">
                <h4>Jane Doe</h4>
                <div className="stars" style={{ '--rating': 5 }}></div>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"ByCafe's Precision Coffee Grinder changed my brewing game completely. Consistent grind size every time!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JS</div>
              <div className="author-info">
                <h4>John Smith</h4>
                <div className="stars" style={{ '--rating': 4.5 }}></div>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"Fast shipping, excellent customer service, and the coffee is always fresh. I'm a customer for life!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">AJ</div>
              <div className="author-info">
                <h4>Alex Johnson</h4>
                <div className="stars" style={{ '--rating': 5 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive offers, brewing tips, and new product announcements.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage;