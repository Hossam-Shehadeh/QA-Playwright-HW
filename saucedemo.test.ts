import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false }); // set to true to run headless
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Go to website
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Add product to cart
  await page.click('#add-to-cart-sauce-labs-backpack');

  // 4. Go to cart
  await page.click('.shopping_cart_link');

  // 5. Check contents
  const productName = await page.textContent('.inventory_item_name');
  console.log('✅ Product in cart:', productName);

  // 6. Logout
  await page.click('#react-burger-menu-btn');
  await page.waitForTimeout(500); // wait for animation
  await page.click('#logout_sidebar_link');

  // 7. Close browser
  await browser.close();
})();
