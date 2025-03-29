import React from 'react';
import '../../styles/ProductInfo.css';

function ProductInfo({ product }) {
  return (
    <div className="product-info">
      <h1>{product.name}</h1>
      <div className="sku-price">
        <span>SKU: {product.sku}</span>
        <span className="price">${product.price.toFixed(2)}</span>
      </div>
      <div className="description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>
      <div className="specifications">
        <h3>Specifications</h3>
        <ul>
          {Object.entries(product.specifications).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductInfo;
