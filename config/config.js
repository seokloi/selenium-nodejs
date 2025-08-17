module.exports = {
  baseUrl: "https://opensource-demo.orangehrmlive.com",
  loginPath: "/web/index.php/auth/login",
  credentials: {
    valid: { username: "Admin", password: "admin123" },
    invalid: { username: "Admin", password: "wrongpassword" },
  },
  chromeOptions: {
    headless: true,
    windowSize: "1280,800",
  },
};
