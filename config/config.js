module.exports = {
  // Test environment configuration
  environments: {
    development: {
      baseUrl: 'https://www.google.com',
      timeout: 10000,
      implicitWait: 5000
    },
    staging: {
      baseUrl: 'https://www.google.com',
      timeout: 15000,
      implicitWait: 10000
    },
    production: {
      baseUrl: 'https://www.google.com',
      timeout: 20000,
      implicitWait: 15000
    }
  },

  // Browser configuration
  browsers: {
    chrome: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--window-size=1920,1080'
        ]
      }
    },
    chromeHeadless: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--headless',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--window-size=1920,1080'
        ]
      }
    },
    firefox: {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['--width=1920', '--height=1080']
      }
    }
  },

  // Test data
  testData: {
    searchQueries: [
      'Selenium automation',
      'Node.js testing',
      'WebDriver examples'
    ],
    formData: {
      message: 'Hello from Selenium automation!',
      number1: '10',
      number2: '20'
    }
  },

  // Screenshot configuration
  screenshots: {
    enabled: true,
    directory: './screenshots',
    onFailure: true,
    onSuccess: false
  },

  // Reporting configuration
  reporting: {
    enabled: true,
    format: 'html',
    outputDirectory: './reports'
  }
};
