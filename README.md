
# 🎓 QA Automation Homework — SauceDemo E2E Test (with Playwright & TypeScript)

Welcome to my Quality Assurance automation homework!  
In this mini-project, I’ve used **Playwright + TypeScript** to simulate a real-world E2E (end-to-end) test scenario for the [SauceDemo](https://www.saucedemo.com/) website.  
Let’s walk you through the creative features, test cases, and how you can run it like a QA pro 🚀

---

## 🧪 What Does This Test Do?

This test case simulates a user flow:
1. 🛂 Logs in using a valid `standard_user`
2. 🎒 Adds a product to the cart
3. 🛒 Checks the cart contents
4. 🚪 Logs out securely
5. 🖼 Takes screenshots at every key step
6. 🕐 Adds timestamps and colored logs to show QA analysis clarity

---

## 🔍 Why Is This Test *Awesome*?

| Feature 🎁                  | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| ✅ **Screenshots**         | Captures screenshots at each test milestone (great for reports!)            |
| 🧠 **Custom Logs**         | Timestamped steps to understand flow and debug faster                       |
| 👀 **Visual Assertions**   | Checks if specific elements are visible before proceeding                   |
| 🔄 **Auto Cookie Cleanup** | Clears cookies before tests for clean sessions                              |
| 👤 **Multiple Users Ready**| Structure supports easy testing for all SauceDemo roles                     |
| 🧪 **Manual Test Docs**    | Comes with a `test-cases.md` file to map manual-to-automated tests          |

---

## 🚦 Tested Roles

- ✅ `standard_user`
- ❌ `locked_out_user`
- ⚠️ `problem_user`
- 🐢 `performance_glitch_user`

---

## 🗂 Folder Structure

```
qa-playwright-homework/
├── saucedemo.qa-homework.test.ts   # Main test
├── test-cases.md                   # Manual test cases reference
├── playwright.config.ts            # Global test settings
├── tsconfig.json                   # TypeScript config
├── /screenshots                    # Saved screenshots
└── README.md                       # You're reading this!
```

---

## 🚀 How to Run the Project

### 1. 📦 Install Dependencies
```bash
npm install
```

### 2. 🧠 Install Browsers
```bash
npx playwright install
```

### 3. ▶️ Run the Test
```bash
npx playwright test
```

### 4. 📷 Check Screenshots
See the `/screenshots` folder after the test run!

---

## 📝 Sample Output

```bash
[11:45:20 AM] 🔄 Starting test
📸 Screenshot saved: 01-homepage.png
📸 Screenshot saved: 02-after-login.png
📸 Screenshot saved: 03-cart.png
📸 Screenshot saved: 04-before-logout.png
[11:45:42 AM] ✅ Test completed
```

---

## 👨‍🔬 Tech Stack

- ⚙️ [Playwright](https://playwright.dev/)
- 🟦 TypeScript
- 🧪 Playwright Test Runner
- 📸 Built-in screenshot capture
- 🧼 Cookie/session clearing
- 🧾 Markdown for test documentation

---

