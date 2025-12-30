export const selectors = {
  login: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginBtn: '[data-test="login-button"]',
    error: '[data-test="error"]',
  },
  inventory: {
    inventoryTitle: '.title',
    item: '.inventory_item',
    addToCartBtn: '[data-test^="add-to-cart"]',
  },
};
