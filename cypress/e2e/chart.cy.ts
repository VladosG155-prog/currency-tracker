describe('chart spec', () => {
  it('chart should exist', () => {
    cy.visit('http://localhost:5003/timeline');
    cy.get('[data-testid="chart-wrapper"]').should('exist');
    cy.get('[data-testid="random-button"]').should('exist');
  });

  it('chart should generate values', () => {
    cy.visit('http://localhost:5003/timeline');
    cy.get('[data-testid="random-button"]').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('chart.data.USD')
      .should('not.deep.equal', []);
  });

  it('chart select should change target currency', () => {
    cy.visit('http://localhost:5003/timeline');
    cy.get('[data-testid="select-input"]').click();
    cy.get('[data-testid="select-dropdown-item"]').eq(2).click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('chart.activeCurrency')
      .should('eq', 'BTC');
  });

  it('chart should change target elem', () => {
    cy.visit('http://localhost:5003/timeline');
    cy.get('[data-testid="chart-wrapper"]').should('exist');
    cy.get('[data-testid="random-button"]').click();
    cy.get('[data-testid="chart-wrapper"]').click('center');
    cy.get('[data-testid="modal"]').should('exist');
  });
});
