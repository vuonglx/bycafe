/**
 * Setup Testing Environment
 * 
 * This script installs and configures all necessary dependencies for testing
 * the ByCafe frontend application.
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

console.log(`${colors.bright}${colors.blue}Setting up ByCafe Testing Environment${colors.reset}\n`);

// Step 1: Install testing dependencies
console.log(`${colors.yellow}Installing testing dependencies...${colors.reset}`);
try {
  execSync('npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom msw identity-obj-proxy', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Dependencies installed successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to install dependencies: ${error.message}${colors.reset}\n`);
  process.exit(1);
}

// Step 2: Create Jest configuration
console.log(`${colors.yellow}Creating Jest configuration...${colors.reset}`);
const jestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/__mocks__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};

try {
  fs.writeFileSync('jest.config.js', `module.exports = ${JSON.stringify(jestConfig, null, 2)}`);
  console.log(`${colors.green}✓ Jest configuration created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create Jest configuration: ${error.message}${colors.reset}\n`);
}

// Step 3: Create setup file
console.log(`${colors.yellow}Creating test setup file...${colors.reset}`);
const setupTestsContent = `// jest-dom adds custom jest matchers for asserting on DOM nodes
import '@testing-library/jest-dom';

// Mock global objects
global.fetch = jest.fn();

// Mock local storage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

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

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
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

// Step 5: Create test directory structure
console.log(`${colors.yellow}Creating test directory structure...${colors.reset}`);
const testDirs = [
  'src/__tests__/components',
  'src/__tests__/pages',
  'src/__tests__/context',
  'src/__tests__/utils',
  'src/__tests__/integration'
];

try {
  testDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  console.log(`${colors.green}✓ Test directory structure created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create test directory structure: ${error.message}${colors.reset}\n`);
}

// Step 6: Update package.json
console.log(`${colors.yellow}Updating package.json...${colors.reset}`);
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  packageJson.scripts = {
    ...packageJson.scripts,
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage"
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log(`${colors.green}✓ package.json updated successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to update package.json: ${error.message}${colors.reset}\n`);
}

// Step 7: Create a sample test
console.log(`${colors.yellow}Creating a sample test...${colors.reset}`);
const sampleTestContent = `import React from 'react';
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
`;

try {
  fs.writeFileSync('src/__tests__/App.test.js', sampleTestContent);
  console.log(`${colors.green}✓ Sample test created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create sample test: ${error.message}${colors.reset}\n`);
}

// Step 8: Create a test utilities file
console.log(`${colors.yellow}Creating test utilities...${colors.reset}`);
const testUtilsContent = `import React from 'react';
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
      name: \`Test Coffee \${index + 1}\`
    })
  );
}

// Export mock context for direct use
export { mockCartContext };
`;

try {
  fs.writeFileSync('src/__tests__/testUtils.js', testUtilsContent);
  console.log(`${colors.green}✓ Test utilities created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create test utilities: ${error.message}${colors.reset}\n`);
}

console.log(`${colors.bright}${colors.green}Testing environment setup complete!${colors.reset}`);
console.log(`
${colors.bright}Next steps:${colors.reset}
1. Run ${colors.yellow}npm test${colors.reset} to execute tests
2. Run ${colors.yellow}npm run test:coverage${colors.reset} to see test coverage
3. Create additional tests in the ${colors.yellow}src/__tests__/${colors.reset} directory

${colors.bright}Happy testing!${colors.reset}
`);
