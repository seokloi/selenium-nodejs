const { By } = require("selenium-webdriver");
const { waitForVisible } = require("../lib/waits");
const config = require("../config/config");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = config.baseUrl + config.loginPath;
    this.locators = {
      username: By.name("username"),
      password: By.name("password"),
      submitBtn: By.css('button[type="submit"]'),
      errorMsg: By.css(".oxd-alert-content-text"),
    };
  }

  async open() {
    await this.driver.manage().deleteAllCookies();
    await this.driver.get(this.url);
  }

  async login(username, password) {
    const userInput = await waitForVisible(this.driver, this.locators.username);
    const passInput = await waitForVisible(this.driver, this.locators.password);
    const submitBtn = await waitForVisible(
      this.driver,
      this.locators.submitBtn
    );

    await userInput.sendKeys(username);
    await passInput.sendKeys(password);
    await submitBtn.click();
  }

  async getErrorMessage() {
    const el = await waitForVisible(this.driver, this.locators.errorMsg);
    return await el.getText();
  }
}

module.exports = LoginPage;
