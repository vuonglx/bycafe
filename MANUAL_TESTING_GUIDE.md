# ByCafe Frontend Manual Testing Guide

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
