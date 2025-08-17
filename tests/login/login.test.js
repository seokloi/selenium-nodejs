const { expect } = require("chai");
const { createDriver } = require("../../utils/driverFactory");
const logger = require("../../utils/logger");
const LoginPage = require("../../pages/LoginPage");
const config = require("../../config/env/dev");

describe("Login Page Test", function () {
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

  it("should login successfully with valid credentials", async () => {
    try {
      await loginPage.enterUsername(config.username);
      await loginPage.enterPassword(config.password);
      await loginPage.clickLogin();

      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include("/dashboard");
    } catch (error) {
      logger.error("❌ Login test failed: " + error.message);
      throw error;
    }
  });

  it("should show error with invalid credentials", async () => {
    try {
      await loginPage.enterUsername("Admin");
      await loginPage.enterPassword("wrongpassword");
      await loginPage.clickLogin();

      const errorText = await loginPage.getErrorMessage();
      expect(errorText).to.satisfy(
        (msg) =>
          msg.includes("Invalid credentials") ||
          msg.includes("CSRF token validation failed")
      );
    } catch (error) {
      logger.error(
        "❌ Login test with invalid credentials failed: " + error.message
      );
      throw error;
    }
  });
});
