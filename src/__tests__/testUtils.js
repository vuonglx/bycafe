import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// Mock cart context for testing
const mockCartContext = {
  cart: [],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  getCartTotal: jest.fn(() => 0),
  getCartItemCount: jest.fn(() => 0),
};

// Render with all required providers
export function renderWithProviders(ui, { 
  cartContext = mockCartContext,
  route = '/',
  ...renderOptions 
} = {}) {
  // Create a custom render function that wraps the UI with necessary providers
  function Wrapper({ children }) {
    // Set the initial route
    window.history.pushState({}, 'Test page', route);
    
    return (
      <BrowserRouter>
        <CartContext.Provider value={cartContext}>
          {children}
        </CartContext.Provider>
      </BrowserRouter>
    );
  }
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Create mock product data
export function createMockProduct(overrides = {}) {
  return {
    id: 1,
    name: 'Test Coffee',
    category: 'Coffee Beans',
    price: 18.99,
    originalPrice: 22.99,
    image: '/images/test-coffee.jpg',
    fallbackImage: 'https://example.com/fallback.jpg',
    rating: 4.5,
    reviewCount: 100,
    isNew: true,
    premium: false,
    description: 'A delicious test coffee.',
    details: {
      origin: 'Test Origin',
      roastLevel: 'Medium',
      flavor: 'Test Flavor',
      process: 'Washed',
      altitude: '1,200 meters',
      weight: '12 oz'
    },
    images: [
      '/images/test-coffee.jpg',
      '/images/test-coffee-2.jpg',
      '/images/test-coffee-3.jpg'
    ],
    fallbackImages: [
      'https://example.com/fallback.jpg',
      'https://example.com/fallback-2.jpg',
      'https://example.com/fallback-3.jpg'
    ],
    ...overrides
  };
}

// Create an array of mock products
export function createMockProducts(count = 10) {
  return Array.from({ length: count }, (_, index) => 
    createMockProduct({ 
      id: index + 1,
      name: `Test Coffee ${index + 1}`
    })
  );
}

// Export mock context for direct use
export { mockCartContext };
