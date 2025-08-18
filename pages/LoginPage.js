const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const config = require("../config/env/dev");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameInput = By.name("username");
    this.passwordInput = By.name("password");
    this.submitButton = By.css('button[type="submit"]');
    this.errorMessage = By.css(".oxd-alert-content-text");
  }

  async openLogin() {
    await this.open(config.baseUrl + "/web/index.php/auth/login");
  }

  async login(username, password) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.submitButton);
  }

  async getErrorMessage() {
    await this.waitUntilLocated(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async waitForDashboard() {
    await this.driver.wait(until.urlContains("/dashboard"), 5000);
    return await this.driver.getCurrentUrl();
  }
}

module.exports = LoginPage;
