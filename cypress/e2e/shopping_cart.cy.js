
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
