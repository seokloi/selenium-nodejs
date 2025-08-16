const selenium = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { expect } = require('chai');

describe('WebDriver Initialization', function() {
  this.timeout(120000); // 2 minutes timeout for the entire suite
  
  let driver;
  
  before(async function() {
    this.timeout(60000); // 1 minute timeout for setup
    try {
      // Set up Chrome options
      const chromeOptions = new chrome.Options();
      chromeOptions.addArguments('--no-sandbox');
      chromeOptions.addArguments('--disable-dev-shm-usage');
      chromeOptions.addArguments('--disable-gpu');
      chromeOptions.addArguments('--headless');
      chromeOptions.addArguments('--disable-extensions');
      chromeOptions.addArguments('--disable-plugins');
      chromeOptions.addArguments('--disable-images');
      chromeOptions.addArguments('--window-size=1920,1080');
      // Create Chrome service with explicit ChromeDriver path
      const chromedriverPath = chromedriver.path;
      const service = new ServiceBuilder(chromedriverPath);
      // Create builder with service
      const builder = new selenium.Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .setChromeService(service);
      // Build WebDriver with timeout protection
      const buildPromise = builder.build();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('WebDriver build timeout after 30 seconds')), 30000);
      });
      driver = await Promise.race([buildPromise, timeoutPromise]);
      // Set timeouts
      await driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 30000,
        script: 30000
      });
    } catch (error) {
      throw error;
    }
  });
  
  after(async function() {
    if (driver) {
      try {
        await driver.quit();
      } catch (error) {}
    }
  });
  
  it('should initialize WebDriver successfully', async function() {
    this.timeout(60000); // 1 minute timeout for this test
    // Test basic functionality
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).to.include('Google');
  });
  
  it('should handle basic navigation', async function() {
    this.timeout(60000); // 1 minute timeout for this test
    // Navigate to a different page
    await driver.get('https://www.example.com');
    const title = await driver.getTitle();
    expect(title).to.include('Example Domain');
  });
});
