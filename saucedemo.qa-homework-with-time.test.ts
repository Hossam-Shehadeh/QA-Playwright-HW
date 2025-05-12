import { test, expect, Page } from '@playwright/test';

test.describe('🎓 QA Homework - SauceDemo E2E Test', () => {

  // Screenshot Helper
  async function captureStep(page: Page, name: string) {
    await page.screenshot({ path: `screenshots/${name}.png` });
    console.log(`[${new Date().toLocaleTimeString()}] 📸 Screenshot saved: ${name}.png`);
  }

  // Log the current time at key points
  function logTime(action: string) {
    console.log(`[${new Date().toLocaleTimeString()}] ${action}`);
  }

  // ✅ Test 1: Full user flow
  test('Full flow: login, add to cart, verify, logout', async ({ page }) => {
    logTime('🔄 Starting test');
    
    await page.context().clearCookies();
    logTime('Cookies cleared');
    
    await page.goto('https://www.saucedemo.com');
    logTime('Navigated to homepage');
    await captureStep(page, '01-homepage');

    await page.locator('#user-name').fill('standard_user');
    logTime('Entered username');
    
    await page.locator('#password').fill('secret_sauce');
    logTime('Entered password');
    
    await page.locator('#login-button').click();
    logTime('Clicked login button');
    await captureStep(page, '02-after-login');
    
    await expect(page.locator('.title')).toHaveText('Products');
    logTime('Verified login success, on Products page');

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    logTime('Clicked on Add to Cart for Sauce Labs Backpack');
    
    await page.locator('.shopping_cart_link').click();
    logTime('Navigated to cart');
    await captureStep(page, '03-cart');
    
    const productName = await page.locator('.inventory_item_name').textContent();
    logTime('Retrieved product name from cart');
    expect(productName?.trim()).toBe('Sauce Labs Backpack');
    logTime('Verified product name in cart');

    await page.locator('#react-burger-menu-btn').click();
    logTime('Clicked burger menu');
    await captureStep(page, '04-before-logout');
    
    await page.locator('#logout_sidebar_link').click();
    logTime('Clicked logout');
    
    await expect(page.locator('#login-button')).toBeVisible();
    logTime('Login button visible after logout');
    
    logTime('✅ Test completed');
  });

  // ✅ Test 2: Invalid login attempt
  test('Invalid login displays error message', async ({ page }) => {
    logTime('🔄 Starting invalid login test');
    
    await page.goto('https://www.saucedemo.com');
    logTime('Navigated to homepage');
    
    await page.locator('#user-name').fill('locked_out_user');
    logTime('Entered invalid username');
    
    await page.locator('#password').fill('wrong_password');
    logTime('Entered invalid password');
    
    await page.locator('#login-button').click();
    logTime('Clicked login button');
    
    const errorMsg = await page.locator('[data-test="error"]').textContent();
    logTime('Retrieved error message');
    expect(errorMsg).toContain('Epic sadface');
    logTime('Verified error message for invalid login');
    
    await captureStep(page, 'invalid-login');
    logTime('✅ Invalid login test completed');
  });

  // ✅ Test 3: Sort products by price (low to high)
  test('Sort products by Price (low to high)', async ({ page }) => {
    logTime('🔄 Starting sort by price test');
    
    await page.goto('https://www.saucedemo.com');
    logTime('Navigated to homepage');
    
    await page.locator('#user-name').fill('standard_user');
    logTime('Entered username');
    
    await page.locator('#password').fill('secret_sauce');
    logTime('Entered password');
    
    await page.locator('#login-button').click();
    logTime('Clicked login button');

    // Update selector for the sort dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    logTime('Sorted products by price (low to high)');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    logTime('Retrieved all product prices');
    const priceNums = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...priceNums].sort((a, b) => a - b);

    expect(priceNums).toEqual(sortedPrices);
    logTime('Verified prices sorted from low to high');
    
    await captureStep(page, 'sorted-prices-low-to-high');
    logTime('✅ Sort by price test completed');
  });

  // ✅ Test 4: Cart badge updates when adding items
  test('Cart badge increases when adding items', async ({ page }) => {
    logTime('🔄 Starting cart badge test');
    
    await page.goto('https://www.saucedemo.com');
    logTime('Navigated to homepage');
    
    await page.locator('#user-name').fill('standard_user');
    logTime('Entered username');
    
    await page.locator('#password').fill('secret_sauce');
    logTime('Entered password');
    
    await page.locator('#login-button').click();
    logTime('Clicked login button');

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    logTime('Added Sauce Labs Backpack to cart');
    
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    logTime('Added Sauce Labs Bike Light to cart');
    
    const cartBadge = await page.locator('.shopping_cart_badge').textContent();
    logTime('Retrieved cart badge count');
    expect(cartBadge).toBe('2');
    logTime('Verified cart badge count');
    
    await captureStep(page, 'cart-badge-count');
    logTime('✅ Cart badge test completed');
  });
});
