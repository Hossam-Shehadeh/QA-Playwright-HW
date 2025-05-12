import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false }); // headless: false to see the browser
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Go to the SauceDemo website
  await page.goto('https://www.saucedemo.com/');
  await page.waitForTimeout(1000); // wait 1 second

  // 2. Fill in username and password
  await page.fill('#user-name', 'standard_user');
  await page.waitForTimeout(1000);
  await page.fill('#password', 'secret_sauce');
  await page.waitForTimeout(1000);

  // 3. Click login
  await page.click('#login-button');
  await page.waitForTimeout(2000); // wait for page to load

  // 4. Add a product to the cart
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.waitForTimeout(1500);

  // 5. Click the cart icon
  await page.click('.shopping_cart_link');
  await page.waitForTimeout(1500);

  // 6. Check cart contents
  const productName = await page.textContent('.inventory_item_name');
  console.log('✅ Product in cart:', productName);
  await page.waitForTimeout(2000);

  // 7. Open the side menu
  await page.click('#react-burger-menu-btn');
  await page.waitForTimeout(1000);

  // 8. Click logout
  await page.click('#logout_sidebar_link');
  await page.waitForTimeout(1500);

  // 9. Close the browser
  await browser.close();
})();
