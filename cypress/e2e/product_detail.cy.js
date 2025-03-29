
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
