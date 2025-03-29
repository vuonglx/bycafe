
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
