/**
 * 🎯 QA Homework Assignment: Automated End-to-End Flow using Playwright
 * 🧪 Scenario: SauceDemo - Login, Add to Cart, Verify, Logout
 * 👨‍🎓 Created for QA homework on automated UI testing using Playwright
 * 🛠️ Tools: TypeScript + Playwright (Manual flow, no test runner)
 */

import { chromium } from 'playwright';

(async () => {
  // === Setup Browser ===
  console.log('🌀 Launching browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // === Step 1: Visit the SauceDemo login page ===
  console.log('🔗 Navigating to SauceDemo...');
  await page.goto('https://www.saucedemo.com/');
  await page.waitForTimeout(1000);

  // === Step 2: Log in with valid credentials ===
  console.log('🔐 Logging in as standard_user...');
  await page.fill('#user-name', 'standard_user');
  await page.waitForTimeout(500);
  await page.fill('#password', 'secret_sauce');
  await page.waitForTimeout(500);
  await page.click('#login-button');
  await page.waitForTimeout(1500);

  // Optional: Validate login success
  const inventoryHeader = await page.locator('.title').textContent();
  if (inventoryHeader?.trim() === 'Products') {
    console.log('✅ Login successful!');
  } else {
    console.error('❌ Login failed!');
  }

  // === Step 3: Add "Sauce Labs Backpack" to cart ===
  console.log('🎒 Adding product to cart...');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.waitForTimeout(1000);

  // === Step 4: Go to cart page ===
  console.log('🛒 Opening cart...');
  await page.click('.shopping_cart_link');
  await page.waitForTimeout(1500);

  // === Step 5: Verify product in the cart ===
  const productName = await page.textContent('.inventory_item_name');
  const expectedProduct = 'Sauce Labs Backpack';
  if (productName?.trim() === expectedProduct) {
    console.log(`✅ Verified: "${productName}" is in the cart.`);
  } else {
    console.error(`❌ Expected "${expectedProduct}", but found "${productName}".`);
  }

  // === Step 6: Logout from the application ===
  console.log('🚪 Logging out...');
  await page.click('#react-burger-menu-btn');
  await page.waitForTimeout(1000);
  await page.click('#logout_sidebar_link');
  await page.waitForTimeout(1500);

  // === Teardown ===
  console.log('🧹 Closing browser...');
  await browser.close();
  console.log('🏁 QA flow completed.');
})();
