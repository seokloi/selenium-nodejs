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

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include("/dashboard");
      logger.info(
        "✅ should login successfully with valid credentials successful"
      );
    } catch (error) {
      logger.error(
        "❌ should login successfully with valid credentials failed: " +
          error.message
      );
      throw error;
    }
  });

  it("should show error with invalid credentials", async () => {
    try {
      await loginPage.enterUsername("Admin");
      await loginPage.enterPassword("wrongpassword");
      await loginPage.clickLogin();

      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).to.satisfy(
        (msg) =>
          msg.includes("Invalid credentials") ||
          msg.includes("CSRF token validation failed")
      );
      logger.info("✅ should show error with invalid credentials successful");
    } catch (error) {
      logger.error(
        "❌ should show error with invalid credentials failed: " + error.message
      );
      throw error;
    }
  });
});
