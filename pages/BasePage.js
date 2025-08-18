const { until } = require("selenium-webdriver");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await this.driver.get(url);
  }

  async find(locator, timeout = 5000) {
    return await this.waitUntilLocated(locator, timeout);
  }

  async click(locator) {
    const element = await this.find(locator);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.find(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    const element = await this.find(locator);
    return await element.getText();
  }

  async waitUntilLocated(locator, timeout = 5000) {
    return await this.driver.wait(until.elementLocated(locator), timeout);
  }
}

module.exports = BasePage;
