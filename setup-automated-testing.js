/**
 * Automated Testing Setup for ByCafe E-commerce Application
 * 
 * This script sets up Cypress for E2E testing and configures React Testing Library
 * for component testing with React 19 compatibility.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.blue}Setting up ByCafe Automated Testing Environment${colors.reset}\n`);

// Step 1: Install Cypress for E2E testing
console.log(`${colors.yellow}Installing Cypress for end-to-end testing...${colors.reset}`);
try {
  execSync('npm install --save-dev cypress', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Cypress installed successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to install Cypress: ${error.message}${colors.reset}\n`);
}

// Step 2: Install React Testing Library and related packages
console.log(`${colors.yellow}Installing React Testing Library and related packages...${colors.reset}`);
try {
  execSync('npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event', { stdio: 'inherit' });
  console.log(`${colors.green}✓ React Testing Library installed successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to install React Testing Library: ${error.message}${colors.reset}\n`);
}

// Step 3: Update package.json with test scripts
console.log(`${colors.yellow}Updating package.json with test scripts...${colors.reset}`);
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  packageJson.scripts = {
    ...packageJson.scripts,
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:e2e": "cypress run",
    "test:component": "react-scripts test"
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log(`${colors.green}✓ package.json updated successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to update package.json: ${error.message}${colors.reset}\n`);
}

// Step 4: Initialize Cypress
console.log(`${colors.yellow}Initializing Cypress...${colors.reset}`);
try {
  execSync('npx cypress open', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Cypress initialized successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to initialize Cypress: ${error.message}${colors.reset}\n`);
}

// Step 5: Create Cypress test files
console.log(`${colors.yellow}Creating Cypress test files...${colors.reset}`);

// E2E test for home page
const homePageTest = `
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the hero section', () => {
    cy.get('.hero-section').should('be.visible');
  });

  it('displays featured products', () => {
    cy.get('.featured-products .product-card').should('have.length.at.least', 1);
  });

  it('has working navigation links', () => {
    cy.get('nav a').should('have.length.at.least', 3);
    cy.get('nav a').first().click();
    cy.url().should('include', '/');
  });
});
`;

// E2E test for product catalog
const productCatalogTest = `
describe('Product Catalog', () => {
  beforeEach(() => {
    cy.visit('/catalog');
  });

  it('displays product grid', () => {
    cy.get('.product-grid').should('be.visible');
    cy.get('.product-card').should('have.length.at.least', 1);
  });

  it('can filter products', () => {
    cy.get('.filter-panel').should('be.visible');
    // Test category filter if available
    cy.get('.filter-panel .category-filter').first().click({force: true});
    cy.wait(500); // Wait for filter to apply
    cy.get('.product-grid').should('be.visible');
  });

  it('can sort products', () => {
    cy.get('select.sort-select').select('price-asc');
    cy.wait(500); // Wait for sorting to apply
    cy.get('.product-grid').should('be.visible');
  });
});
`;

// E2E test for product detail page
const productDetailTest = `
describe('Product Detail Page', () => {
  beforeEach(() => {
    // Visit the first product we find
    cy.visit('/catalog');
    cy.get('.product-card a').first().click();
  });

  it('displays product details', () => {
    cy.get('.product-detail-container').should('be.visible');
    cy.get('.product-title').should('be.visible');
    cy.get('.product-price').should('be.visible');
    cy.get('.product-description').should('be.visible');
  });

  it('has working image gallery', () => {
    cy.get('.main-image img').should('be.visible');
    cy.get('.image-thumbnails .thumbnail').should('have.length.at.least', 1);
    
    // Click on a thumbnail if there are multiple
    cy.get('.image-thumbnails .thumbnail').its('length').then((length) => {
      if (length > 1) {
        cy.get('.image-thumbnails .thumbnail').eq(1).click();
        cy.get('.image-thumbnails .thumbnail.active').eq(1).should('exist');
      }
    });
  });

  it('can add product to cart', () => {
    cy.get('.quantity-selector input').clear().type('2');
    cy.get('.add-to-cart-btn').click();
    // Check for confirmation (could be an alert, toast, or cart update)
    cy.on('window:alert', (text) => {
      expect(text).to.include('added to cart');
    });
  });
});
`;

// E2E test for shopping cart
const shoppingCartTest = `
describe('Shopping Cart', () => {
  beforeEach(() => {
    // Add a product to cart first
    cy.visit('/catalog');
    cy.get('.product-card').first().find('.add-to-cart').click();
    cy.visit('/cart');
  });

  it('displays added products', () => {
    cy.get('.cart-items').should('be.visible');
    cy.get('.cart-item').should('have.length.at.least', 1);
  });

  it('can update product quantity', () => {
    cy.get('.cart-item').first().find('.quantity-input input').clear().type('3');
    cy.get('.cart-item').first().find('.quantity-input input').should('have.value', '3');
  });

  it('can remove products', () => {
    const initialCount = cy.get('.cart-item').its('length');
    cy.get('.cart-item').first().find('.remove-item').click();
    cy.get('.cart-item').its('length').should('be.lt', initialCount);
  });

  it('displays correct total', () => {
    cy.get('.cart-summary .total-price').should('be.visible');
  });
});
`;

// E2E test for checkout process
const checkoutTest = `
describe('Checkout Process', () => {
  beforeEach(() => {
    // Add a product to cart and go to checkout
    cy.visit('/catalog');
    cy.get('.product-card').first().find('.add-to-cart').click();
    cy.visit('/cart');
    cy.get('.checkout-button').click();
  });

  it('displays checkout form', () => {
    cy.get('.checkout-form').should('be.visible');
  });

  it('requires shipping information', () => {
    // Try to proceed without filling required fields
    cy.get('.next-step-button').click();
    cy.get('.form-error').should('be.visible');
  });

  it('can complete a checkout with valid information', () => {
    // Fill shipping information
    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="address"]').type('123 Test St');
    cy.get('input[name="city"]').type('Test City');
    cy.get('input[name="zipCode"]').type('12345');
    
    // Proceed to payment
    cy.get('.next-step-button').click();
    
    // Fill payment information (simplified for test)
    cy.get('input[name="cardNumber"]').type('4111111111111111');
    cy.get('input[name="cardName"]').type('Test User');
    cy.get('input[name="expiryDate"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');
    
    // Complete order
    cy.get('.place-order-button').click();
    
    // Verify order confirmation
    cy.url().should('include', '/order-confirmation');
    cy.get('.order-confirmation').should('be.visible');
  });
});
`;

try {
  // Create cypress/e2e directory if it doesn't exist
  if (!fs.existsSync('cypress/e2e')) {
    fs.mkdirSync('cypress/e2e', { recursive: true });
  }
  
  // Write test files
  fs.writeFileSync('cypress/e2e/home_page.cy.js', homePageTest);
  fs.writeFileSync('cypress/e2e/product_catalog.cy.js', productCatalogTest);
  fs.writeFileSync('cypress/e2e/product_detail.cy.js', productDetailTest);
  fs.writeFileSync('cypress/e2e/shopping_cart.cy.js', shoppingCartTest);
  fs.writeFileSync('cypress/e2e/checkout.cy.js', checkoutTest);
  
  console.log(`${colors.green}✓ Cypress test files created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create Cypress test files: ${error.message}${colors.reset}\n`);
}

// Step 6: Create React Testing Library component tests
console.log(`${colors.yellow}Creating React Testing Library component tests...${colors.reset}`);

// ProductCard component test
const productCardTest = `
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
`;

// ProductGrid component test
const productGridTest = `
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
`;

// FilterPanel component test
const filterPanelTest = `
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '../components/FilterPanel/FilterPanel';

describe('FilterPanel Component', () => {
  const mockFilters = {};
  const mockSetFilters = jest.fn();
  const mockCategories = ['Coffee Beans', 'Brewing Equipment', 'Accessories'];
  const mockOrigins = ['Ethiopia', 'Colombia', 'Brazil'];
  const mockRoastLevels = ['Light', 'Medium', 'Dark'];

  beforeEach(() => {
    mockSetFilters.mockClear();
  });

  test('renders filter options correctly', () => {
    render(
      <FilterPanel 
        filters={mockFilters}
        setFilters={mockSetFilters}
        categories={mockCategories}
        origins={mockOrigins}
        roastLevels={mockRoastLevels}
      />
    );
    
    // Check if filter sections are rendered
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Origin')).toBeInTheDocument();
    expect(screen.getByText('Roast Level')).toBeInTheDocument();
    
    // Check if filter options are rendered
    mockCategories.forEach(category => {
      expect(screen.getByLabelText(category)).toBeInTheDocument();
    });
  });

  test('updates filters when options are selected', () => {
    render(
      <FilterPanel 
        filters={mockFilters}
        setFilters={mockSetFilters}
        categories={mockCategories}
        origins={mockOrigins}
        roastLevels={mockRoastLevels}
      />
    );
    
    // Select a category filter
    fireEvent.click(screen.getByLabelText('Coffee Beans'));
    
    // Check if setFilters was called with the correct arguments
    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ category: 'Coffee Beans' })
    );
  });

  test('clears all filters', () => {
    render(
      <FilterPanel 
        filters={{ category: 'Coffee Beans' }}
        setFilters={mockSetFilters}
        categories={mockCategories}
        origins={mockOrigins}
        roastLevels={mockRoastLevels}
      />
    );
    
    // Click the clear filters button
    fireEvent.click(screen.getByText('Clear Filters'));
    
    // Check if setFilters was called with an empty object
    expect(mockSetFilters).toHaveBeenCalledWith({});
  });
});
`;

try {
  // Create src/__tests__ directory if it doesn't exist
  if (!fs.existsSync('src/__tests__')) {
    fs.mkdirSync('src/__tests__', { recursive: true });
  }
  
  // Write test files
  fs.writeFileSync('src/__tests__/ProductCard.test.js', productCardTest);
  fs.writeFileSync('src/__tests__/ProductGrid.test.js', productGridTest);
  fs.writeFileSync('src/__tests__/FilterPanel.test.js', filterPanelTest);
  
  console.log(`${colors.green}✓ React Testing Library component tests created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create component tests: ${error.message}${colors.reset}\n`);
}

// Step 7: Create Cypress custom commands for common operations
console.log(`${colors.yellow}Creating Cypress custom commands...${colors.reset}`);

const customCommands = `
// Custom commands for ByCafe e-commerce testing

// Add a product to cart
Cypress.Commands.add('addToCart', (productIndex = 0) => {
  cy.visit('/catalog');
  cy.get('.product-card').eq(productIndex).find('.add-to-cart').click();
});

// Login as a user
Cypress.Commands.add('login', (email = 'test@example.com', password = 'password123') => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Filter products by category
Cypress.Commands.add('filterByCategory', (category) => {
  cy.visit('/catalog');
  cy.get('.filter-panel .category-filter').contains(category).click();
});

// Complete checkout with test data
Cypress.Commands.add('completeCheckout', () => {
  // Add product to cart
  cy.addToCart();
  
  // Go to cart
  cy.visit('/cart');
  
  // Proceed to checkout
  cy.get('.checkout-button').click();
  
  // Fill shipping information
  cy.get('input[name="fullName"]').type('Test User');
  cy.get('input[name="email"]').type('test@example.com');
  cy.get('input[name="address"]').type('123 Test St');
  cy.get('input[name="city"]').type('Test City');
  cy.get('input[name="zipCode"]').type('12345');
  
  // Proceed to payment
  cy.get('.next-step-button').click();
  
  // Fill payment information
  cy.get('input[name="cardNumber"]').type('4111111111111111');
  cy.get('input[name="cardName"]').type('Test User');
  cy.get('input[name="expiryDate"]').type('12/25');
  cy.get('input[name="cvv"]').type('123');
  
  // Complete order
  cy.get('.place-order-button').click();
});
`;

try {
  // Create cypress/support directory if it doesn't exist
  if (!fs.existsSync('cypress/support')) {
    fs.mkdirSync('cypress/support', { recursive: true });
  }
  
  // Write custom commands file
  fs.writeFileSync('cypress/support/commands.js', customCommands);
  
  console.log(`${colors.green}✓ Cypress custom commands created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create Cypress custom commands: ${error.message}${colors.reset}\n`);
}

console.log(`${colors.bright}${colors.green}Automated testing setup complete!${colors.reset}`);
console.log(`
${colors.bright}Next steps:${colors.reset}
1. Run ${colors.yellow}npm run cypress:open${colors.reset} to open Cypress and run E2E tests
2. Run ${colors.yellow}npm run test:component${colors.reset} to run React component tests
3. Customize the tests to match your specific implementation details

${colors.bright}Note:${colors.reset} You may need to adjust selectors and test logic based on your actual component structure.

${colors.bright}Happy testing!${colors.reset}
`);
