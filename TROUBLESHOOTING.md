# Troubleshooting Guide

This guide helps resolve common issues when running Selenium automation tests with Node.js.

## 🚨 Common Issues and Solutions

### 1. Timeout Errors

#### Problem: "Timeout of 20000ms exceeded"
**Symptoms:**
- Tests hang indefinitely
- Browser doesn't respond
- Tests fail with timeout errors

**Solutions:**
1. **Increase timeout values:**
   ```javascript
   // In test files
   this.timeout(60000); // 60 seconds
   
   // In package.json scripts
   "test": "mocha --timeout 60000 --reporter spec"
   ```

2. **Check browser compatibility:**
   - Ensure ChromeDriver version matches Chrome browser version
   - Update ChromeDriver: `npm update chromedriver`

3. **Use explicit waits instead of implicit waits:**
   ```javascript
   // Good - explicit wait
   await driver.wait(until.elementLocated(By.id('element')), 10000);
   
   // Bad - implicit wait
   await driver.manage().timeouts().implicitlyWait(5000);
   ```

4. **Add proper error handling:**
   ```javascript
   try {
     await driver.wait(until.elementLocated(By.id('element')), 10000);
   } catch (error) {
     console.error('Element not found:', error.message);
     // Take screenshot for debugging
     await driver.takeScreenshot();
     throw error;
   }
   ```

### 2. Browser Initialization Issues

#### Problem: "Failed to start Chrome"
**Symptoms:**
- WebDriver fails to start
- Browser crashes immediately
- Permission denied errors

**Solutions:**
1. **Check Chrome installation:**
   - Ensure Chrome browser is installed and up to date
   - Verify ChromeDriver is compatible with Chrome version

2. **Use headless mode for stability:**
   ```javascript
   const driver = await new Builder()
     .forBrowser('chrome')
     .setChromeOptions(new chrome.Options().headless())
     .build();
   ```

3. **Add Chrome options for stability:**
   ```javascript
   const chrome = require('selenium-webdriver/chrome');
   const options = new chrome.Options();
   options.addArguments('--no-sandbox');
   options.addArguments('--disable-dev-shm-usage');
   options.addArguments('--disable-gpu');
   
   const driver = await new Builder()
     .forBrowser('chrome')
     .setChromeOptions(options)
     .build();
   ```

### 3. Element Not Found Errors

#### Problem: "NoSuchElementError: Unable to locate element"
**Symptoms:**
- Tests fail when trying to find elements
- Elements exist but can't be located
- Inconsistent element detection

**Solutions:**
1. **Verify element selectors:**
   - Use browser developer tools to confirm selectors
   - Check if elements are in iframes
   - Verify elements are visible and not hidden

2. **Use multiple locator strategies:**
   ```javascript
   // Try multiple selectors
   let element;
   try {
     element = await driver.findElement(By.id('element-id'));
   } catch (error) {
     try {
       element = await driver.findElement(By.css('.element-class'));
     } catch (error2) {
       element = await driver.findElement(By.xpath("//div[contains(text(), 'Element Text')]"));
     }
   }
   ```

3. **Wait for elements to be present and visible:**
   ```javascript
   // Wait for element to be located
   await driver.wait(until.elementLocated(By.id('element')), 10000);
   
   // Wait for element to be visible
   const element = await driver.findElement(By.id('element'));
   await driver.wait(until.elementIsVisible(element), 10000);
   ```

### 4. Network and Page Load Issues

#### Problem: "Page load timeout"
**Symptoms:**
- Pages take too long to load
- Network connectivity issues
- Slow internet causing timeouts

**Solutions:**
1. **Increase page load timeout:**
   ```javascript
   await driver.manage().setTimeouts({
     pageLoad: 30000,  // 30 seconds
     script: 30000,     // 30 seconds
     implicit: 10000    // 10 seconds
   });
   ```

2. **Check network connectivity:**
   - Verify internet connection
   - Check if target websites are accessible
   - Use VPN if needed for geo-restricted content

3. **Handle slow-loading elements:**
   ```javascript
   // Wait for specific elements instead of entire page
   await driver.wait(until.elementLocated(By.id('main-content')), 15000);
   ```

### 5. Test Framework Issues

#### Problem: "Mocha timeout exceeded"
**Symptoms:**
- Tests hang in Mocha framework
- Hooks (before/after) don't complete
- Test suite never finishes

**Solutions:**
1. **Set proper test timeouts:**
   ```javascript
   describe('Test Suite', function() {
     this.timeout(60000); // 60 seconds for entire suite
     
     it('should do something', function() {
       this.timeout(30000); // 30 seconds for individual test
       // test code
     });
   });
   ```

2. **Use proper async/await:**
   ```javascript
   // Good
   it('should work', async function() {
     await driver.get('https://example.com');
   });
   
   // Bad - missing async
   it('should work', function() {
     return driver.get('https://example.com');
   });
   ```

3. **Handle promises correctly:**
   ```javascript
   // Good
   after(async function() {
     if (driver) {
       await driver.quit();
     }
   });
   
   // Bad - missing await
   after(function() {
     if (driver) {
       driver.quit();
     }
   });
   ```

## 🔧 Debugging Techniques

### 1. Enable Verbose Logging
```bash
# Run tests with verbose output
npm run test:verbose

# Or use Mocha directly
npx mocha --reporter spec --verbose --timeout 60000 test/
```

### 2. Take Screenshots on Failure
```javascript
try {
  // Test code
} catch (error) {
  // Take screenshot for debugging
  const screenshot = await driver.takeScreenshot();
  const fs = require('fs');
  fs.writeFileSync('./screenshots/failure.png', screenshot, 'base64');
  throw error;
}
```

### 3. Use Console Logging
```javascript
console.log('🔍 Finding element...');
const element = await driver.findElement(By.id('element'));
console.log('✅ Element found:', await element.getText());
```

### 4. Check Browser Console
```javascript
// Get browser console logs
const logs = await driver.manage().logs().get('browser');
console.log('Browser logs:', logs);
```

## 🚀 Performance Optimization

### 1. Use Headless Mode
```javascript
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options().headless();
const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
```

### 2. Optimize Wait Times
```javascript
// Use shorter timeouts for fast operations
await driver.wait(until.elementLocated(By.id('element')), 5000);

// Use longer timeouts for slow operations
await driver.wait(until.titleContains('Expected Title'), 15000);
```

### 3. Batch Operations
```javascript
// Good - batch operations
const elements = await driver.findElements(By.css('.item'));
for (const element of elements) {
  await element.click();
}

// Bad - individual operations
for (let i = 0; i < 10; i++) {
  await driver.findElement(By.css(`.item:nth-child(${i + 1})`)).click();
}
```

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the logs:** Look for specific error messages
2. **Verify dependencies:** Ensure all packages are up to date
3. **Test in isolation:** Run individual tests to isolate the problem
4. **Check browser compatibility:** Verify ChromeDriver and Chrome versions match
5. **Use the test runner:** Try running tests with `node test-runner.js`

## 🔍 Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Timeout of Xms exceeded` | Test taking too long | Increase timeout, check for hanging operations |
| `NoSuchElementError` | Element not found | Verify selector, add explicit waits |
| `WebDriverError: chrome not reachable` | Browser crashed | Use headless mode, add Chrome options |
| `SessionNotCreatedError` | ChromeDriver version mismatch | Update ChromeDriver to match Chrome version |
| `ElementNotInteractableError` | Element not clickable | Wait for element to be enabled and visible |

Remember: Most timeout issues can be resolved by using proper explicit waits and increasing timeout values appropriately.
