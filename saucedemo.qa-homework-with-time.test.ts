import { test, expect, Page } from '@playwright/test';

test.describe('🎓 QA Homework - SauceDemo E2E Test', () => {

  // Screenshot Helper
  async function captureStep(page: Page, name: string) {
    await page.screenshot({ path: `screenshots/${name}.png` });
    console.log(`[${new Date().toLocaleTimeString()}] 📸 Screenshot saved: ${name}.png`);
  }

  // Log the current time on the console
  async function logTime(action: string,page: Page) {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] ${action}`);
    await page.waitForTimeout(1000); // wait 1 second
  }

  // ✅ Test 1: Full user flow
  test('Full flow: login, add to cart, verify, logout', async ({ page }) => {
    await logTime('🔄 Starting test',page);
    
    await page.context().clearCookies();
    await logTime('Cookies cleared',page);
    
    await page.goto('https://www.saucedemo.com');
    await logTime('Navigated to homepage',page);
    await captureStep(page, '01-homepage');

    await page.locator('#user-name').fill('standard_user');
    await logTime('Entered username',page);
    
    await page.locator('#password').fill('secret_sauce');
    await logTime('Entered password',page);
    
    await page.locator('#login-button').click();
    await logTime('Clicked login button',page);
    await captureStep(page, '02-after-login');
    
    await expect(page.locator('.title')).toHaveText('Products');
    await logTime('Verified login success, on Products page',page);

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await logTime('Clicked on Add to Cart for Sauce Labs Backpack',page);
    
    await page.locator('.shopping_cart_link').click();
    await logTime('Navigated to cart',page);
    await captureStep(page, '03-cart');
    
    const productName = await page.locator('.inventory_item_name').textContent();
    await logTime('Retrieved product name from cart',page);
    expect(productName?.trim()).toBe('Sauce Labs Backpack');
    await logTime('Verified product name in cart',page);

    await page.locator('#react-burger-menu-btn').click();
    await logTime('Clicked burger menu',page);
    await captureStep(page, '04-before-logout');
    
    await page.locator('#logout_sidebar_link').click();
    await logTime('Clicked logout',page);
    
    await expect(page.locator('#login-button')).toBeVisible();
    await logTime('Login button visible after logout',page);
    
    await logTime('✅ Test completed',page);
  });

  // ✅ Test 2: Invalid login attempt
  test('Invalid login displays error message', async ({ page }) => {
    await logTime('🔄 Starting invalid login test',page);
    
    await page.goto('https://www.saucedemo.com');
    await logTime('Navigated to homepage',page);
    
    await page.locator('#user-name').fill('locked_out_user');
    await logTime('Entered invalid username',page);
    
    await page.locator('#password').fill('wrong_password');
    await logTime('Entered invalid password',page);
    
    await page.locator('#login-button').click();
    await logTime('Clicked login button',page);
    
    const errorMsg = await page.locator('[data-test="error"]').textContent();
    await logTime('Retrieved error message',page);
    expect(errorMsg).toContain('Epic sadface');
    await logTime('Verified error message for invalid login',page);
    
    await captureStep(page, 'invalid-login');
    await logTime('✅ Invalid login test completed',page);
  });

  // ✅ Test 3: Sort products by price (low to high)
  test('Sort products by Price (low to high)', async ({ page }) => {
    await logTime('🔄 Starting sort by price test',page);
    
    await page.goto('https://www.saucedemo.com');
    await logTime('Navigated to homepage',page);
    
    await page.locator('#user-name').fill('standard_user');
    await logTime('Entered username',page);
    
    await page.locator('#password').fill('secret_sauce');
    await logTime('Entered password',page);
    
    await page.locator('#login-button').click();
    await logTime('Clicked login button',page);

    // Update selector for the sort dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await logTime('Sorted products by price (low to high)',page);

    const prices = await page.locator('.inventory_item_price').allTextContents();
    await logTime('Retrieved all product prices',page);
    const priceNums = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...priceNums].sort((a, b) => a - b);

    expect(priceNums).toEqual(sortedPrices);
    await logTime('Verified prices sorted from low to high',page);
    
    await captureStep(page, 'sorted-prices-low-to-high');
    await logTime('✅ Sort by price test completed',page);
  });

  // ✅ Test 4: Cart badge updates when adding items
  test('Cart badge increases when adding items', async ({ page }) => {
    await logTime('🔄 Starting cart badge test',page);
    
    await page.goto('https://www.saucedemo.com');
    await logTime('Navigated to homepage',page);
    
    await page.locator('#user-name').fill('standard_user');
    await logTime('Entered username',page);
    
    await page.locator('#password').fill('secret_sauce');
    await logTime('Entered password',page);
    
    await page.locator('#login-button').click();
    await logTime('Clicked login button',page);

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await logTime('Added Sauce Labs Backpack to cart',page);
    
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await logTime('Added Sauce Labs Bike Light to cart',page);
    
    const cartBadge = await page.locator('.shopping_cart_badge').textContent();
    await logTime('Retrieved cart badge count',page);
    expect(cartBadge).toBe('2');
    await logTime('Verified cart badge count',page);
    
    await captureStep(page, 'cart-badge-count');
    await logTime('✅ Cart badge test completed',page);
  });
});
