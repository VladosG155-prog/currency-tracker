describe('converter spec', () => {
  it('converter list and items should exist', () => {
    cy.visit('/');
    cy.get('[data-testid="currency-card"]').should('exist');
  });

  it('converter modal should appear after item click', () => {
    cy.visit('/');
    cy.get('[data-testid="currency-card"]').first().click();
    cy.get('[data-testid="modal"]').should('exist');
  });

  it('converter modal result should be calculated correctly', () => {
    cy.visit('/');
    cy.get('[data-testid="currency-card"]').first().click();
    cy.get('[data-testid="input-field"]').should('have.value', 1);
    cy.get('[data-testid="input-field"]')
      .clear()
      .type('1000')
      .should('have.value', '1000');
    cy.get('[data-testid="select-input"]').click();
    cy.get('[data-testid="select-dropdown-item"]').eq(1).click();
    cy.get('[data-testid="convert-to"]').should('not.contain', 'NaN');
  });
});
