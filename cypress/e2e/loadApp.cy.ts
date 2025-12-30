describe('Smoke test', () => {
  it('loads the application', () => {
    cy.visit('/');
    cy.title().should('not.be.empty');
  });
});
