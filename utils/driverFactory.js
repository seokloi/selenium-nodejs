const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

async function createDriver(headless = true) {
  const options = new chrome.Options()
    .addArguments("--no-sandbox")
    .addArguments("--disable-dev-shm-usage")
    .addArguments("--disable-gpu")
    .addArguments("--disable-extensions")
    .addArguments("--disable-plugins")
    .addArguments("--disable-images")
    .addArguments("--window-size=1280,800");

  if (headless) {
    options.addArguments("--headless=new");
  }

  const service = new ServiceBuilder(chromedriver.path);

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(service)
    .build();

  return driver;
}

module.exports = { createDriver };
