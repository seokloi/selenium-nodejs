# 🧪 Selenium Automation with Node.js

## 📌 Giới thiệu

Dự án này là bộ **automation test** sử dụng:

- [Selenium WebDriver](https://www.selenium.dev/) (Node.js)
- [Mocha](https://mochajs.org/) (test runner)
- [Chai](https://www.chaijs.com/) (assertion library)

Mục tiêu: kiểm thử trang [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/) với mô hình **Page Object Model (POM)** và cấu trúc dự án chuyên nghiệp.

---

## 📂 Cấu trúc thư mục

```
selenium-node-test/
│── package.json
│── README.md
│
├── config/
│   └── env/
│       └── dev.js            # cấu hình chung (URL, timeout, creds…)
│
├── utils/
│   ├── driverFactory.js       # tạo WebDriver (Chrome, service, options…)
│   ├── logger.js              # logger
│   └── waitHelpers.js         # hàm wait, helper cho element
│
├── pages/
│   └── LoginPage.js           # page object cho login
│
└── tests/
    └── login/
        └── login.test.js      # testcases cho login
```

---

## ⚙️ Cài đặt

1. Clone repo

```bash
git clone https://github.com/seokloi/selenium-nodejs.git
cd selenium-nodejs
```

2. Cài dependencies

```bash
npm install
```

Dependencies chính:

- `selenium-webdriver`
- `chromedriver`
- `mocha`
- `chai`

---

## 🚀 Chạy test

### Chạy toàn bộ test

```bash
npx mocha tests/**/*.test.js --timeout 60000
```

### Chạy 1 file test cụ thể

```bash
npx mocha tests/login/login.test.js --timeout 60000
```

Hoặc thêm script vào `package.json`:

```json
"scripts": {
  "test": "mocha tests/**/*.test.js --reporter mochawesome",
  "test:login": "mocha tests/login/login.test.js --timeout 60000"
}
```

Sau đó chạy:

```bash
npm test
```

hoặc

```bash
npm run test:login
```

---

## 🏗️ Page Object Model (POM)

Ví dụ `LoginPage.js`:

```js
const { By } = require("selenium-webdriver");
const { waitForVisible } = require("../utils/waitHelpers");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.name("username");
    this.passwordInput = By.name("password");
    this.loginButton = By.css('button[type="submit"]');
    this.errorMessage = By.css(".oxd-alert-content-text");
  }

  async enterUsername(username) {
    const el = await waitForVisible(this.driver, this.usernameInput);
    await el.clear();
    await el.sendKeys(username);
  }

  async enterPassword(password) {
    const el = await waitForVisible(this.driver, this.passwordInput);
    await el.clear();
    await el.sendKeys(password);
  }

  async clickLogin() {
    const btn = await waitForVisible(this.driver, this.loginButton);
    await btn.click();
  }

  async getErrorMessage() {
    const el = await waitForVisible(this.driver, this.errorMessage, 10000);
    return await el.getText();
  }
}

module.exports = LoginPage;
```
