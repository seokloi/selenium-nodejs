const { until } = require("selenium-webdriver");

async function waitForVisible(driver, locator, timeout = 5000) {
  const el = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(el), timeout);
  return el;
}

module.exports = { waitForVisible };
