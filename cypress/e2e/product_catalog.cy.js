describe('Product Catalog', () => {
  beforeEach(() => {
    cy.visit('/catalog');
  });

  it('displays product grid', () => {
    cy.get('.products-section').should('be.visible');
    cy.get('.product-grid').should('be.visible');
    cy.get('.product-card').should('have.length.at.least', 1);
  });

  it('displays filter panel', () => {
    cy.get('.filters-panel').should('be.visible');
    cy.get('h2').contains('Filters').should('be.visible');
  });

  it('can filter products', () => {
    // Wait for filter panel to be fully loaded
    cy.get('.filters-panel').should('be.visible');
    // Click on a filter category (using more specific selector)
    cy.get('.filters-panel input[type="checkbox"]').first().click({force: true});
    cy.wait(500); // Wait for filter to apply
    cy.get('.product-grid').should('be.visible');
  });

  it('can sort products', () => {
    cy.get('.sort-section').should('be.visible');
    cy.get('select').should('be.visible').select('price-asc');
    cy.wait(500); // Wait for sorting to apply
    cy.get('.product-grid').should('be.visible');
  });

  it('can search for products', () => {
    cy.get('.search-and-results').should('be.visible');
    cy.get('input[type="search"]').should('be.visible').type('coffee{enter}');
    cy.wait(500); // Wait for search results
    cy.get('.product-grid').should('be.visible');
  });
});
