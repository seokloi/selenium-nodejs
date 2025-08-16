const { until, By } = require('selenium-webdriver');

class WebDriverUtils {
  constructor(driver) {
    this.driver = driver;
  }

  /**
   * Wait for an element to be present and visible
   * @param {By} locator - Element locator
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<WebElement>} - The found element
   */
  async waitForElement(locator, timeout = 5000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  /**
   * Wait for an element to be clickable
   * @param {By} locator - Element locator
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<WebElement>} - The clickable element
   */
  async waitForClickable(locator, timeout = 5000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsEnabled(element), timeout);
    return element;
  }

  /**
   * Clear and type text into an input field
   * @param {By} locator - Element locator
   * @param {string} text - Text to type
   * @param {boolean} clearFirst - Whether to clear the field first
   */
  async typeText(locator, text, clearFirst = true) {
    const element = await this.waitForElement(locator);
    if (clearFirst) {
      await element.clear();
    }
    await element.sendKeys(text);
  }

  /**
   * Click on an element after waiting for it to be clickable
   * @param {By} locator - Element locator
   */
  async clickElement(locator) {
    const element = await this.waitForClickable(locator);
    await element.click();
  }

  /**
   * Get text from an element
   * @param {By} locator - Element locator
   * @returns {Promise<string>} - The element text
   */
  async getText(locator) {
    const element = await this.waitForElement(locator);
    return await element.getText();
  }

  /**
   * Get attribute value from an element
   * @param {By} locator - Element locator
   * @param {string} attribute - Attribute name
   * @returns {Promise<string>} - The attribute value
   */
  async getAttribute(locator, attribute) {
    const element = await this.waitForElement(locator);
    return await element.getAttribute(attribute);
  }

  /**
   * Check if an element exists
   * @param {By} locator - Element locator
   * @returns {Promise<boolean>} - True if element exists
   */
  async elementExists(locator) {
    try {
      await this.driver.findElement(locator);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Take a screenshot
   * @param {string} filename - Screenshot filename
   */
  async takeScreenshot(filename) {
    const screenshot = await this.driver.takeScreenshot();
    const fs = require('fs');
    fs.writeFileSync(`screenshots/${filename}.png`, screenshot, 'base64');
  }

  /**
   * Wait for page title to contain specific text
   * @param {string} titleText - Text to check in title
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForTitle(titleText, timeout = 5000) {
    await this.driver.wait(until.titleContains(titleText), timeout);
  }

  /**
   * Wait for URL to change from current URL
   * @param {string} currentUrl - Current URL to wait for change
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForUrlChange(currentUrl, timeout = 5000) {
    await this.driver.wait(until.urlIsNot(currentUrl), timeout);
  }
}

module.exports = WebDriverUtils;
