import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock any context providers that App might need
jest.mock('../context/CartContext', () => ({
  CartContext: {
    Provider: ({ children }) => children,
  },
  useCart: () => ({
    cart: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    getCartTotal: () => 0,
    getCartItemCount: () => 0,
  }),
}));

test('renders the App component', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // This is a basic test to ensure the App renders without crashing
  // You would typically check for specific elements here
  expect(document.body).toBeInTheDocument();
});
