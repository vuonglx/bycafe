import React from 'react';

const FeaturedProducts = ({ products, columns = { desktop: 4, tablet: 3, mobile: 2 } }) => {
  return (
    <div className="featured-products">
      <div className="products-grid" style={{
        gridTemplateColumns: `repeat(${columns.mobile}, 1fr)`
      }}>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.imageUrl} 
              alt={product.title}
              loading="lazy"
            />
            <div className="product-info">
              <h3>{product.title}</h3>
              <div className="price">${product.price}</div>
              <div className="rating">★ {product.rating}</div>
              {product.isNew && <span className="new-badge">New</span>}
              {product.discount && <span className="discount-badge">{product.discount}% OFF</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
