import React from 'react';
import ProductCard from '../components/ProductCard';
function ProductCatalog() {  // Temporary mock data - replace with actual data later
  const products = [    { id: 1, name: 'Product 1', price: 99.99, image: 'placeholder.jpg' },
    { id: 2, name: 'Product 2', price: 149.99, image: 'placeholder.jpg' },  ];
  return (
    <div className="product-catalog">      <h1>Our Products</h1>
      <div className="products-grid">        {products.map(product => (
          <ProductCard key={product.id} product={product} />        ))}
      </div>    </div>
  );}

export default ProductCatalog;












