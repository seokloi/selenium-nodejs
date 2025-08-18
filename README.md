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
│       └── dev.js             # cấu hình chung (URL, timeout, creds…)
│
├── data/
│   └── login/
│       └── loginData.json     # data driven cho page Login
│
├── utils/
│   ├── dataProvider.js        # hỗ trợ load data json
│   ├── driverFactory.js       # tạo WebDriver (Chrome, service, options…)
│   └── logger.js              # logger
│
├── pages/
│   ├── BasePage.js            # base page object
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
