const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const config = require("../config/config");

async function createDriver() {
  const options = new chrome.Options();
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--disable-gpu");
  options.addArguments("--disable-extensions");
  options.addArguments("--disable-plugins");
  options.addArguments(`--window-size=${config.chromeOptions.windowSize}`);

  if (config.chromeOptions.headless) {
    options.addArguments("--headless");
  }

  const service = new ServiceBuilder(chromedriver.path);

  return await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(service)
    .build();
}

module.exports = { createDriver };
