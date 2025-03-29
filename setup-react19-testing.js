/**
 * React 19 Compatible Testing Setup for ByCafe Frontend
 * 
 * This script sets up a testing environment compatible with React 19.
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

console.log(`${colors.bright}${colors.blue}Setting up ByCafe Testing Environment for React 19${colors.reset}\n`);

// Step 1: Install latest testing dependencies compatible with React 19
console.log(`${colors.yellow}Installing React 19 compatible testing dependencies...${colors.reset}`);
try {
  execSync('npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom identity-obj-proxy', { stdio: 'inherit' });
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
  ],
  transform: {
    "^.+\\\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@testing-library)/)"
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

// Mock console.error to suppress React warnings during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Warning.*not wrapped in act/i.test(args[0]) ||
    /Warning.*ReactDOM.render is no longer supported/i.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};
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

// Step 6: Create a manual testing guide
console.log(`${colors.yellow}Creating manual testing guide...${colors.reset}`);
const manualTestingGuide = `# ByCafe Frontend Manual Testing Guide

Since automated testing with React 19 might have compatibility issues, this guide provides a structured approach to manually test the ByCafe application.

## Key Components to Test

### 1. ProductCard Component
- **Display Test**: Verify all product information displays correctly (name, price, category, etc.)
- **Image Test**: Verify primary images load correctly
- **Fallback Test**: Temporarily change image paths to invalid ones to test fallback system
- **Add to Cart Test**: Click "Add to Cart" button and verify product is added to cart

### 2. ProductGrid Component
- **Filtering Test**: Apply different filters and verify correct products are displayed
- **Sorting Test**: Test different sorting options (price, popularity)
- **Search Test**: Enter search terms and verify results
- **Empty Results Test**: Apply filters that result in no products to verify empty state

### 3. ProductDetailPage
- **Data Display Test**: Verify all product details are displayed correctly
- **Image Gallery Test**: Test image gallery navigation
- **Quantity Selector Test**: Test increasing/decreasing quantity
- **Add to Cart Test**: Test adding different quantities to cart
- **Related Products Test**: Verify related products are displayed and links work

### 4. Shopping Cart
- **Add/Remove Test**: Test adding and removing products
- **Quantity Update Test**: Test updating quantities
- **Price Calculation Test**: Verify subtotal, tax, and total calculations
- **Checkout Flow Test**: Test the entire checkout process

## Testing Checklist

### Visual and UI Testing
- [ ] Consistent styling across all pages
- [ ] Responsive design on mobile, tablet, and desktop
- [ ] Animations and transitions work smoothly
- [ ] Accessibility features (contrast, focus indicators)

### User Flow Testing
- [ ] Complete purchase as a new user
- [ ] Product search, filtering, and navigation
- [ ] Cart management (add, remove, update quantities)
- [ ] Checkout process

### Error Handling
- [ ] Form validation error messages
- [ ] Image loading errors and fallbacks
- [ ] API error handling and user feedback

## How to Document Test Results

Create a spreadsheet or document with:
1. Component/feature tested
2. Test case description
3. Expected result
4. Actual result
5. Pass/Fail status
6. Notes/issues found

## Best Practices

1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on different devices (desktop, tablet, mobile)
3. Test with different network conditions
4. Document all issues found with screenshots
`;

try {
  fs.writeFileSync('MANUAL_TESTING_GUIDE.md', manualTestingGuide);
  console.log(`${colors.green}✓ Manual testing guide created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}✗ Failed to create manual testing guide: ${error.message}${colors.reset}\n`);
}

console.log(`${colors.bright}${colors.green}Testing setup complete!${colors.reset}`);
console.log(`
${colors.bright}Next steps:${colors.reset}
1. Try running ${colors.yellow}npm test${colors.reset} to see if automated tests work with React 19
2. If automated tests have compatibility issues, use the ${colors.yellow}MANUAL_TESTING_GUIDE.md${colors.reset} for structured manual testing
3. As React 19 testing tools mature, you can revisit automated testing

${colors.bright}Note:${colors.reset} React 19 is very new, and testing libraries might not be fully compatible yet.
The manual testing guide provides a structured approach until the ecosystem catches up.

${colors.bright}Happy testing!${colors.reset}
`);
