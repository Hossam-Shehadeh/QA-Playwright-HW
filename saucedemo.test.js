const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Set to true for headless mode
  const page = await browser.newPage();

  // 1. Open SauceDemo website
  await page.goto('https://www.saucedemo.com/');

  // 2. Login with provided credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Add a product to the cart
  await page.click('#add-to-cart-sauce-labs-backpack');

  // 4. Go to the cart
  await page.click('.shopping_cart_link');

  // 5. Verify product in the cart
  const productName = await page.textContent('.inventory_item_name');
  console.log('✅ Product in cart:', productName); // Should print: Sauce Labs Backpack

  // 6. Logout
  await page.click('#react-burger-menu-btn');
  await page.waitForTimeout(500); // Wait for the side menu to open
  await page.click('#logout_sidebar_link');

  // 7. Close the browser
  await browser.close();
})();
