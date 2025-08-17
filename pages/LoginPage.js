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
