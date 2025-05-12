import { test, expect,Page  } from '@playwright/test';

test.describe('🎓 QA Homework - SauceDemo E2E Test', () => {

  // Screenshot Helper
  async function captureStep(page:Page , name: string) {
    await page.screenshot({ path: `screenshots/${name}.png` });
    console.log(`📸 Screenshot saved: ${name}.png`);
  }

  test('Full flow: login, add to cart, verify, logout', async ({ page }) => {
    console.log(`[${new Date().toLocaleTimeString()}] 🔄 Starting test`);

    // Step 0: Setup
    await page.context().clearCookies();
    await page.goto('https://www.saucedemo.com');
    await page.waitForTimeout(500);
    await captureStep(page, '01-homepage');

    // Step 1: Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.waitForTimeout(1000);
    await captureStep(page, '02-after-login');
    await expect(page.locator('.title')).toHaveText('Products');

    // Step 2: Add product to cart
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(500);

    // Step 3: Open cart
    await page.locator('.shopping_cart_link').click();
    await captureStep(page, '03-cart');

    // Step 4: Verify cart content
    const productName = await page.locator('.inventory_item_name').textContent();
    expect(productName?.trim()).toBe('Sauce Labs Backpack');

    // Step 5: Logout
    await page.locator('#react-burger-menu-btn').click();
    await page.waitForTimeout(500);
    await captureStep(page, '04-before-logout');
    await page.locator('#logout_sidebar_link').click();

    // Final: Verify redirect to login
    await expect(page.locator('#login-button')).toBeVisible();
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Test completed`);
  });
});
