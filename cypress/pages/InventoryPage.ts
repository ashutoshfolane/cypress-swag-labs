import { selectors } from '../support/selectors';

export class InventoryPage {
  assertLoaded() {
    cy.get(selectors.inventory.inventoryTitle, { timeout: 10000 }).should(
      'contain.text',
      'Products',
    );
  }
}
