const { expect } = require("chai");
const { createDriver } = require("../lib/driver");
const { waitForUrlContains } = require("../lib/waits");
const config = require("../config/config");
const LoginPage = require("../pages/LoginPage");

describe("Login Page Test", function () {
  this.timeout(60000);
  let driver, loginPage;

  before(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
  });

  beforeEach(async () => {
    await loginPage.open();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("should navigate to Page login", async () => {
    const title = await driver.getTitle();
    expect(title).to.include("OrangeHRM");
  });

  it("should login successfully with valid credentials", async () => {
    await loginPage.login(
      config.credentials.valid.username,
      config.credentials.valid.password
    );
    const currentUrl = await waitForUrlContains(driver, "/dashboard");
    expect(currentUrl).to.include("/dashboard");
  });

  it("should show error with invalid credentials", async () => {
    await loginPage.login(
      config.credentials.invalid.username,
      config.credentials.invalid.password
    );
    const text = await loginPage.getErrorMessage();
    expect(text).to.satisfy((msg) =>
      msg.includes("Invalid credentials") || msg.includes("CSRF token validation failed")
    );
  });
});
