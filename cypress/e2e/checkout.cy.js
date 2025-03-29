
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
