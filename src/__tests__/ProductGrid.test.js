
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid/ProductGrid';

// Mock the ProductCard component
jest.mock('../components/ProductCard', () => {
  return function MockProductCard({ product }) {
    return <div data-testid="product-card">{product.name}</div>;
  };
});

describe('ProductGrid Component', () => {
  test('renders products correctly', () => {
    render(
      <BrowserRouter>
        <ProductGrid 
          filters={{}} 
          sortBy="default" 
          searchQuery=""
        />
      </BrowserRouter>
    );
    
    // Check if product cards are rendered
    expect(screen.getAllByTestId('product-card').length).toBeGreaterThan(0);
  });

  test('filters products by category', () => {
    render(
      <BrowserRouter>
        <ProductGrid 
          filters={{ category: 'Coffee Beans' }} 
          sortBy="default" 
          searchQuery=""
        />
      </BrowserRouter>
    );
    
    // All displayed products should be coffee beans
    const productCards = screen.getAllByTestId('product-card');
    productCards.forEach(card => {
      expect(card.textContent).toContain('Coffee');
    });
  });

  test('handles empty results', () => {
    render(
      <BrowserRouter>
        <ProductGrid 
          filters={{ category: 'NonexistentCategory' }} 
          sortBy="default" 
          searchQuery=""
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });
});
