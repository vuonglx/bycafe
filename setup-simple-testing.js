/**
 * Simple Testing Setup for ByCafe Frontend
 * 
 * This script sets up a basic testing environment compatible with the current React version.
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

console.log(`${colors.bright}${colors.blue}Setting up ByCafe Simple Testing Environment${colors.reset}\n`);

// Step 1: Install compatible testing dependencies
console.log(`${colors.yellow}Installing compatible testing dependencies...${colors.reset}`);
try {
  execSync('npm install --save-dev @testing-library/react@13.4.0 @testing-library/jest-dom@5.16.5 @testing-library/user-event@14.4.3 jest@29.5.0 jest-environment-jsdom@29.5.0 react-test-renderer@18.2.0', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Dependencies installed successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to install dependencies: ${error.message}${colors.reset}\n`);
  process.exit(1);
}

// Step 2: Create Jest configuration
console.log(`${colors.yellow}Creating Jest configuration...${colors.reset}`);
const jestConfig = `module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js"
  ],
  moduleNameMapper: {
    "\\\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js"
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx}"
  ]
}`;

try {
  fs.writeFileSync('jest.config.js', jestConfig);
  console.log(`${colors.green}✓ Jest configuration created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create Jest configuration: ${error.message}${colors.reset}\n`);
}

// Step 3: Create setup file
console.log(`${colors.yellow}Creating test setup file...${colors.reset}`);
const setupTestsContent = `// jest-dom adds custom jest matchers for asserting on DOM nodes
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
`;

try {
  if (!fs.existsSync('src')) {
    fs.mkdirSync('src');
  }
  fs.writeFileSync('src/setupTests.js', setupTestsContent);
  console.log(`${colors.green}✓ Test setup file created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create test setup file: ${error.message}${colors.reset}\n`);
}

// Step 4: Create file mock
console.log(`${colors.yellow}Creating file mock...${colors.reset}`);
try {
  if (!fs.existsSync('src/__mocks__')) {
    fs.mkdirSync('src/__mocks__', { recursive: true });
  }
  fs.writeFileSync('src/__mocks__/fileMock.js', 'module.exports = "test-file-stub";');
  console.log(`${colors.green}✓ File mock created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create file mock: ${error.message}${colors.reset}\n`);
}

// Step 5: Update package.json
console.log(`${colors.yellow}Updating package.json...${colors.reset}`);
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  packageJson.scripts = {
    ...packageJson.scripts,
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log(`${colors.green}✓ package.json updated successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to update package.json: ${error.message}${colors.reset}\n`);
}

// Step 6: Create a simple test for ProductCard
console.log(`${colors.yellow}Creating a simple ProductCard test...${colors.reset}`);
const productCardTestContent = `import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Mock the CartContext
jest.mock('../context/CartContext', () => ({
  CartContext: {
    Consumer: ({ children }) => children({
      addToCart: jest.fn(),
      cart: []
    }),
  },
  __esModule: true,
  default: {
    Consumer: ({ children }) => children({
      addToCart: jest.fn(),
      cart: []
    }),
  }
}));

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Test Coffee',
  category: 'Coffee Beans',
  price: 18.99,
  image: '/images/test-coffee.jpg',
  rating: 4.5,
  reviewCount: 100,
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
  test('renders product name correctly', () => {
    renderProductCard();
    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
  });
});
`;

try {
  if (!fs.existsSync('src/__tests__')) {
    fs.mkdirSync('src/__tests__', { recursive: true });
  }
  fs.writeFileSync('src/__tests__/ProductCard.test.js', productCardTestContent);
  console.log(`${colors.green}✓ ProductCard test created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create ProductCard test: ${error.message}${colors.reset}\n`);
}

console.log(`${colors.bright}${colors.green}Simple testing environment setup complete!${colors.reset}`);
console.log(`
${colors.bright}Next steps:${colors.reset}
1. Run ${colors.yellow}npm test${colors.reset} to execute the simple test
2. Once that works, you can expand your test suite with more detailed tests
3. If you encounter any issues, check the compatibility of your testing libraries

${colors.bright}Happy testing!${colors.reset}
`);
