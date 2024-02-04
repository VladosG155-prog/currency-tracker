describe('theme toggle spec', () => {
  it('toggle theme button should exist', () => {
    cy.visit('/');
    cy.get('[data-testid="switch-slider"]').should('exist');
  });

  it('base theme should be dark', () => {
    cy.visit('/');
    cy.window()
      .its('store')
      .invoke('getState')
      .its('global.theme')
      .should('eq', 'DARK');
  });

  it('theme should toggle after button click', () => {
    cy.visit('/');
    cy.get('[data-testid="switch-slider"]').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('global.theme')
      .should('eq', 'LIGHT');
    cy.get('[data-testid="switch-slider"]').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('global.theme')
      .should('eq', 'DARK');
  });

  it('should change background color after theme toggle', () => {
    cy.visit('/');
    cy.get('[data-testid="switch-slider"]').click();
    cy.get('body')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(255, 255, 255)');
    cy.get('[data-testid="switch-slider"]').click();
    cy.get('body')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(0, 0, 0)');
  });
});

