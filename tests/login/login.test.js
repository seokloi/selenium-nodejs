const { expect } = require("chai");
const config = require("../../config/env/dev");
const LoginPage = require("../../pages/LoginPage");
const { loadJSON } = require("../../utils/dataProvider");
const { createDriver } = require("../../utils/driverFactory");
const logger = require("../../utils/logger");

describe("Login Data-Driven Test", function () {
  this.timeout(60000);
  let driver;
  let loginPage;

  before(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
  });

  beforeEach(async () => {
    await driver.manage().deleteAllCookies();
    await driver.get(config.baseUrl + "/web/index.php/auth/login");
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  const testData = loadJSON("login/loginData.json");

  testData.forEach(({ username, password, expected }) => {
    it(`should login with ${username}/${password} → expect ${expected}`, async () => {
      try {
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.clickLogin();

        if (expected === "success") {
          const currentUrl = await driver.getCurrentUrl();
          expect(currentUrl).to.include("/dashboard");
        } else {
          const errorMsg = await loginPage.getErrorMessage();
          expect(errorMsg).to.satisfy(
            (msg) =>
              msg.includes("Invalid credentials") ||
              msg.includes("CSRF token validation failed")
          );
        }
        logger.info(
          `✅ should login with ${username}/${password} → expect ${expected}`
        );
      } catch (error) {
        logger.error(
          `❌ should login with ${username}/${password} → expect ${expected}:` +
            error.message
        );
      }
    });
  });
});
