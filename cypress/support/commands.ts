import { LoginPage } from '../pages/LoginPage';

Cypress.Commands.add('loginByUI', (username?: string, password?: string) => {
  const user = username ?? Cypress.env('USERNAME');
  const pass = password ?? Cypress.env('PASSWORD');

  const login = new LoginPage();
  login.open();
  login.login(user, pass);
});

Cypress.Commands.add('loginBySession', (username?: string, password?: string) => {
  const user = username ?? Cypress.env('USERNAME');
  const pass = password ?? Cypress.env('PASSWORD');

  if (!user || !pass) {
    throw new Error('loginBySession(): Missing USERNAME or PASSWORD. Check env/.env.local');
  }

  cy.session(
    [user, pass],
    () => {
      cy.loginByUI(user, pass);

      // Swag Labs: session cookie is the reliable signal we observed
      cy.getCookie('session-username').should('exist').its('value').should('eq', user);

      // Don’t depend on localStorage for this app
      // Don’t cy.request() SPA routes (can 404)
    },
    {
      validate: () => {
        cy.getCookie('session-username').should('exist').its('value').should('eq', user);
      },
      cacheAcrossSpecs: true,
    },
  );

  // After session restore, go to inventory route.
  // Swag Labs may return HTTP 404 but still render via SPA redirect, so allow it.
  cy.visit('/inventory.html', { failOnStatusCode: false });

  // Now assert inventory UI
  cy.get('.title', { timeout: 10000 }).should('contain.text', 'Products');
});

export {};
