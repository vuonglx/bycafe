import React from 'react';
import ProductInfo from '../components/ProductInfo';
import ImageGallery from '../components/ImageGallery';
import Reviews from '../components/Reviews';
import RelatedProducts from '../components/RelatedProducts';
import ActionButtons from '../components/ActionButtons';

function ProductDetailsPage() {
  const product = {
    id: '1',
    name: 'Sample Product',
    sku: 'SP12345',
    price: 99.99,
    description: 'This is a sample product description.',
    specifications: {
      material: 'Plastic',
      dimensions: '10 x 5 x 3 cm',
      weight: '0.5 kg'
    },
    images: [
      'https://via.placeholder.com/800',
      'https://via.placeholder.com/800',
      'https://via.placeholder.com/800'
    ],
    rating: 4.5,
    reviews: [],
    relatedProducts: []
  };

  return (
    <div className="product-details">
      <div className="main-content">
        <ImageGallery images={product.images} />
        <ProductInfo product={product} />
        <ActionButtons product={product} />
      </div>
      <div className="secondary-content">
        <Reviews productId={product.id} />
        <RelatedProducts products={product.relatedProducts} />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
