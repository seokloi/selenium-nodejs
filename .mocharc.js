module.exports = {
  timeout: 120000, // 2 minutes
  reporter: 'spec',
  slow: 75000, // 75 seconds
  bail: false, // Don't bail on first failure
  recursive: true,
  extension: ['js'],
  spec: ['test/**/*.test.js'],
  ignore: ['node_modules/**/*'],
  // Ensure proper async handling
  asyncOnly: false,
  // Increase hook timeout
  hookTimeout: 120000
};
