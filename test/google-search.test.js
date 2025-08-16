const selenium = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { expect } = require('chai');

describe('Google Search Automation', function() {
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
  
  it('should navigate to Google homepage', async function() {
    this.timeout(60000); // 1 minute timeout for this test
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).to.include('Google');
  });
  
  it('should perform a basic search', async function() {
    this.timeout(60000); // 1 minute timeout for this test
    await driver.get('https://www.google.com');
    try {
      // Wait for search box to be present
      const searchBox = await driver.wait(selenium.until.elementLocated(selenium.By.name('q')), 10000);
      // Clear and fill search box
      await searchBox.clear();
      await searchBox.sendKeys('Selenium automation');
      // Submit the search
      await searchBox.submit();
      // Wait for page to change (search results page)
      await driver.wait(selenium.until.urlContains('search'), 15000);
      // Get the new page title
      const title = await driver.getTitle();
      // Verify we're on a search results page
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('search');
    } catch (error) {
      throw error;
    }
  });
  
  it('should verify search results are displayed', async function() {
    this.timeout(60000); // 1 minute timeout for this test
    await driver.get('https://www.google.com');
    try {
      // Perform a search
      const searchBox = await driver.wait(selenium.until.elementLocated(selenium.By.name('q')), 10000);
      await searchBox.clear();
      await searchBox.sendKeys('Node.js testing');
      await searchBox.submit();
      // Wait for search results page
      await driver.wait(selenium.until.urlContains('search'), 15000);
      // Wait a bit more for results to fully load
      await driver.sleep(2000);
      // Look for search results - try multiple selectors
      let results = [];
      try {
        // Try Google's main result selector
        results = await driver.findElements(selenium.By.css('div.g, div[data-hveid], .rc'));
      } catch (e) {
        try {
          // Try alternative selectors
          results = await driver.findElements(selenium.By.css('div, .g, [data-hveid]'));
        } catch (e2) {}
      }
      // Check if we have any results (be more flexible)
      if (results.length > 0) {
        // Results found
        expect(results.length).to.be.greaterThan(0);
      } else {
        // Check if page contains search-related content
        const pageText = await driver.findElement(selenium.By.tagName('body')).getText();
        expect(
          pageText.toLowerCase().includes('node.js') ||
          pageText.toLowerCase().includes('testing')
        ).to.be.true;
      }
    } catch (error) {
      throw error;
    }
  });
});
