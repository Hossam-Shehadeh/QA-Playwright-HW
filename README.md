# QA Homework: SauceDemo Automation with Playwright

## 🔧 Tools
- Playwright
- TypeScript
- Node.js

## 🧪 Test Scenario
1. Navigate to https://www.saucedemo.com
2. Login with `standard_user`
3. Add "Sauce Labs Backpack" to cart
4. Navigate to cart and verify the item
5. Logout and close browser

## ✅ Validations
- Login success based on page title
- Product verification based on text match

## 🚀 Run the Test
```bash
npx ts-node saucedemo.qa-homework.ts
```