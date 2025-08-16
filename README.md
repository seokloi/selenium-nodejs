# Selenium Node.js Automation Testing

A comprehensive automation testing framework using Selenium WebDriver with Node.js.

## Features

- 🚀 **Selenium WebDriver 4** - Latest WebDriver implementation
- 🧪 **Mocha Test Framework** - Popular testing framework for Node.js
- ✅ **Chai Assertions** - Expressive assertion library
- 🌐 **Multi-browser Support** - Chrome, Firefox, and headless modes
- 📸 **Screenshot Support** - Automatic screenshots on test failures
- ⚙️ **Configuration Management** - Environment-specific configurations
- 🛠️ **Utility Functions** - Reusable WebDriver helper methods
- 📊 **Test Reporting** - HTML test reports

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Chrome browser (for ChromeDriver)
- Firefox browser (for GeckoDriver - optional)

## Installation

1. **Clone or download this project**
   ```bash
   git clone <repository-url>
   cd selenium-nodejs-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install ChromeDriver globally (optional but recommended)**
   ```bash
   npm install -g chromedriver
   ```

## Project Structure

```
selenium-nodejs-automation/
├── config/
│   └── config.js              # Configuration settings
├── test/
│   ├── google-search.test.js  # Google search automation tests
│   └── form-automation.test.js # Form automation tests
├── utils/
│   └── webdriver-utils.js     # WebDriver utility functions
├── screenshots/                # Test screenshots (created automatically)
├── reports/                    # Test reports (created automatically)
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headless mode
```bash
npm run test:headless
```

### Run specific test file
```bash
npx mocha test/google-search.test.js
```

### Run tests with specific browser
```bash
BROWSER=firefox npm test
```

## Test Examples

### 1. Google Search Automation
The `google-search.test.js` file demonstrates:
- Navigating to Google
- Performing searches
- Verifying search results
- Clicking on search results

### 2. Form Automation
The `form-automation.test.js` file shows:
- Filling out web forms
- Handling multiple input fields
- Submitting forms
- Verifying form responses

## Configuration

Edit `config/config.js` to customize:
- Test environments (development, staging, production)
- Browser settings and options
- Test data
- Screenshot and reporting preferences

## Browser Support

### Chrome
- Default browser for tests
- Supports headless mode
- Optimized Chrome options included

### Firefox
- Alternative browser option
- GeckoDriver required

### Headless Mode
- Run tests without opening browser windows
- Useful for CI/CD pipelines

## Utility Functions

The `WebDriverUtils` class provides common helper methods:

```javascript
const WebDriverUtils = require('./utils/webdriver-utils');
const utils = new WebDriverUtils(driver);

// Wait for element
await utils.waitForElement(By.id('search-box'));

// Type text
await utils.typeText(By.name('q'), 'search query');

// Click element
await utils.clickElement(By.css('button[type="submit"]'));

// Take screenshot
await utils.takeScreenshot('test-result');
```

## Best Practices

1. **Always use explicit waits** instead of `sleep()` or `implicitWait`
2. **Use descriptive test names** that explain what is being tested
3. **Implement proper cleanup** in `after()` hooks
4. **Use page object model** for complex applications
5. **Take screenshots** on test failures for debugging
6. **Handle flaky elements** with appropriate wait strategies

## Troubleshooting

### Common Issues

1. **ChromeDriver version mismatch**
   - Ensure ChromeDriver version matches your Chrome browser version
   - Update ChromeDriver: `npm update chromedriver`

2. **Element not found errors**
   - Check if selectors are correct
   - Verify elements are visible and not in iframes
   - Use explicit waits instead of implicit waits

3. **Tests running too fast**
   - Increase timeout values in configuration
   - Add appropriate wait conditions

4. **Browser crashes**
   - Use headless mode for stability
   - Add browser options like `--no-sandbox`

### Debug Mode

Run tests with verbose output:
```bash
npx mocha --reporter spec --timeout 30000 test/
```

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Use meaningful commit messages

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Selenium WebDriver documentation
3. Check Node.js and npm documentation
