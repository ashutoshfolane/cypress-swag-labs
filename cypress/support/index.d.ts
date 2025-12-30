/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginByUI(username?: string, password?: string): Chainable<void>;
    loginBySession(username?: string, password?: string): Chainable<void>;
  }
}
