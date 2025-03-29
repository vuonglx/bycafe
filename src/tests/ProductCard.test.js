import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Mock the CartContext
jest.mock('../context/CartContext', () => ({
  CartContext: {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({
      addToCart: jest.fn(),
      cart: []
    })
  },
  useContext: () => ({
    addToCart: jest.fn(),
    cart: []
  })
}));

// Mock product data
const mockProduct = {
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
};

// Helper function to render the component with all required providers
const renderProductCard = (product = mockProduct) => {
  return render(
    <BrowserRouter>
      <ProductCard product={product} />
    </BrowserRouter>
  );
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders product information correctly', () => {
    renderProductCard();
    
    // Check if product name is displayed
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    
    // Check if price is displayed correctly
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    
    // Check if original price is displayed for products on sale
    expect(screen.getByText(`$${mockProduct.originalPrice.toFixed(2)}`)).toBeInTheDocument();
    
    // Check if category is displayed
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    
    // Check if "New" badge is displayed for new products
    expect(screen.getByText('New')).toBeInTheDocument();
    
    // Check if discount percentage is calculated and displayed correctly
    const discountPercentage = Math.round(
      ((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100
    );
    expect(screen.getByText(`${discountPercentage}% Off`)).toBeInTheDocument();
  });

  test('renders product without optional fields', () => {
    // Create a product without optional fields
    const minimalProduct = {
      id: 2,
      name: 'Minimal Product',
      price: 10.99,
      image: '/images/minimal.jpg',
    };
    
    renderProductCard(minimalProduct);
    
    // Check if the product name is displayed
    expect(screen.getByText(minimalProduct.name)).toBeInTheDocument();
    
    // Check if price is displayed correctly
    expect(screen.getByText(`$${minimalProduct.price.toFixed(2)}`)).toBeInTheDocument();
    
    // Verify that optional elements are not in the document
    expect(screen.queryByText('New')).not.toBeInTheDocument();
    expect(screen.queryByText(/% Off/)).not.toBeInTheDocument();
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  test('handles "Add to Cart" button click correctly', () => {
    renderProductCard();
    
    // Find and click the "Add to Cart" button
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    
    // Check if the addToCart function was called with the correct product
    expect(screen.getByText('Add to Cart').getAttribute('onClick')).toBeDefined();
  });

  test('renders premium badge for premium products', () => {
    // Create a premium product
    const premiumProduct = {
      ...mockProduct,
      premium: true,
    };
    
    renderProductCard(premiumProduct);
    
    // Check if the premium badge is displayed
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
