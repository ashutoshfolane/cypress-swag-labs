import { selectors } from '../support/selectors';

export class LoginPage {
  open() {
    cy.visit('/');
  }

  login(username: string, password: string) {
    if (!username || !password) {
      throw new Error(
        'LoginPage.login(): USERNAME or PASSWORD is missing. ' +
          'Check env/.env.local or Cypress.env() configuration.',
      );
    }
    cy.get(selectors.login.username).should('be.visible').clear().type(username);
    cy.get(selectors.login.password).clear().type(password, { log: false });
    cy.get(selectors.login.loginBtn).click();
  }

  assertErrorVisible() {
    cy.get(selectors.login.error).should('be.visible');
  }
}
