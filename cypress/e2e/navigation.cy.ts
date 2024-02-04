describe('navigation spec', () => {
  it('navigation bar should exist', () => {
    cy.visit('/');
    cy.get('[data-testid="navigation"]').should('exist');
  });

  it('navigation links should exist', () => {
    cy.visit('/');
    cy.get('[data-testid="navigation-home"]').should('exist');
    cy.get('[data-testid="navigation-timeline"]').should('exist');
    cy.get('[data-testid="navigation-bankcard"]').should('exist');
  });

  it('navigation links should work', () => {
    cy.visit('/');
    cy.get('[data-testid="navigation-home"]').click();
    cy.url().should('eq', 'http://localhost:5003/');
    cy.get('[data-testid="navigation-timeline"]').click();
    cy.url().should('eq', 'http://localhost:5003/timeline');
    cy.get('[data-testid="navigation-bankcard"]').click();
    cy.url().should('eq', 'http://localhost:5003/bankcard');
  });

  it('pages components should exist', () => {
    cy.visit('/');
    cy.get('[data-testid="navigation-home"]').click();
    cy.get('[data-testid="home-page"]').should('exist');
    cy.get('[data-testid="navigation-timeline"]').click();
    cy.get('[data-testid="timeline-page"]').should('exist');
    cy.get('[data-testid="navigation-bankcard"]').click();
    cy.get('[data-testid="bankcard-page"]').should('exist');
  });
});

