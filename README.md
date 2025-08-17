Ok, mình sẽ viết sẵn file **README.md** hoàn chỉnh, bạn chỉ cần copy nguyên nội dung dưới đây vào file `README.md` trong project của bạn 👇

---

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
│   └── config.js              # cấu hình chung (URL, timeout, creds…)
│
├── utils/
│   ├── driverFactory.js       # tạo WebDriver (Chrome, service, options…)
│   └── waitHelpers.js         # hàm wait, helper cho element
│
├── pages/
│   ├── BasePage.js            # page base class (click, type, getText…)
│   └── LoginPage.js           # page object cho login
│
└── tests/
    └── login.test.js          # testcases cho login
```

---

## ⚙️ Cài đặt

1. Clone repo

```bash
git clone https://github.com/your-repo/selenium-node-test.git
cd selenium-node-test
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
npx mocha tests --timeout 60000
```

### Chạy 1 file test cụ thể

```bash
npx mocha tests/login.test.js --timeout 60000
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
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameInput = By.name("username");
    this.passwordInput = By.name("password");
    this.loginButton = By.css('button[type="submit"]');
    this.errorMessage = By.css(".oxd-alert-content-text");
  }

  async open(url) {
    await this.driver.get(url);
  }

  async login(username, password) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    const el = await this.find(this.errorMessage);
    return el.getText();
  }
}

module.exports = LoginPage;
```
