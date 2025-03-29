
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Mock the CartContext
jest.mock('../context/CartContext', () => ({
  CartContext: {
    Consumer: ({ children }) => children({
      addToCart: jest.fn(),
      cart: []
    })
  }
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Coffee',
    category: 'Coffee Beans',
    price: 18.99,
    originalPrice: 22.99,
    image: '/images/test-coffee.jpg',
    fallbackImage: '/images/fallback.jpg',
    rating: 4.5,
    reviewCount: 100,
    isNew: true
  };

  test('renders product information correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText('$' + mockProduct.price.toFixed(2))).toBeInTheDocument();
  });

  test('displays badges correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('New')).toBeInTheDocument();
    
    const discountPercentage = Math.round(
      ((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100
    );
    expect(screen.getByText(discountPercentage + '% Off')).toBeInTheDocument();
  });

  test('links to product detail page', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    const productLink = screen.getByRole('link', { name: mockProduct.name });
    expect(productLink.getAttribute('href')).toBe('/product/' + mockProduct.id);
  });
});
