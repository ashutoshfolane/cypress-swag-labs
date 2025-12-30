import { InventoryPage } from '../pages/InventoryPage';

describe('Swag Labs - Login', () => {
  it('logs in successfully with cached session', () => {
    cy.loginBySession();

    const inventory = new InventoryPage();
    inventory.assertLoaded();
  });
});
