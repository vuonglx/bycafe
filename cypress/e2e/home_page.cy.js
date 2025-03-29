describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the hero section', () => {
    cy.get('.hero-section').should('be.visible');
  });

  it('displays featured products', () => {
    cy.get('.featured-products-section .product-card').should('have.length.at.least', 1);
  });

  it('has working navigation links', () => {
    cy.get('nav a').should('have.length.at.least', 3);
    cy.get('nav a').first().click();
    cy.url().should('include', '/');
  });

  it('displays category section', () => {
    cy.get('.categories-section').should('be.visible');
    cy.get('.categories-grid .category-card').should('have.length.at.least', 1);
  });

  it('has working product links', () => {
    cy.get('.product-card .product-title a').first().click();
    cy.url().should('include', '/product/');
  });

  it('has working category links', () => {
    cy.get('.category-card').first().click();
    cy.url().should('include', '/catalog?category=');
  });
});
