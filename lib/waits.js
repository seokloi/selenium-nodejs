const { until } = require("selenium-webdriver");

async function waitForVisible(driver, locator, timeout = 10000) {
  const el = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(el), timeout);
  return el;
}

async function waitForUrlContains(driver, text, timeout = 10000) {
  await driver.wait(until.urlContains(text), timeout);
  return await driver.getCurrentUrl();
}

module.exports = { waitForVisible, waitForUrlContains };
