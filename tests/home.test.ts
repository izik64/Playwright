import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ScansPage } from "../pages/scans.page";

const config = require("../config-env.json");
const url = config.urlData.devUrl;
const username = config.autotest.user;
const password = config.autotest.password;
const scansPageUrl = config.urlData.scansPageUrl;
const wrongUserName = config.autotest.wrongUserName;
const wrongUserPassword = config.autotest.wrongUserPassword;
const incorrectUserNameMask = config.autotest.incorrectUserNameMask;

test.describe("UI tests for the login page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);

    await page.goto(url);
  });

  test("Should check that elements are exists and have correct naming", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.checkThatPageElementsAreExists();
    await loginPage.checkThatLoginFormElementsContainCorrectText();
  });

  test("Should successful login to main page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const scansPage = new ScansPage(page);
    await loginPage.loginAndCheckStatusCode(username, password);
    await scansPage.checkPageUrl(scansPageUrl);
    await scansPage.checkThatPageElementsAreExists();
  });

  test("Should check that login is unavailable with wrong credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAndCheckStatusCode(wrongUserName, wrongUserPassword);
    await loginPage.checkLogInErrorMessage();
    await loginPage.checkPageUrl(url);
    const title = await page.title();
    await expect(title).toBe("Bright Security");
  });

  test("Should check email form mask", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.checkEmailIncorrectFormatError(incorrectUserNameMask);
  });

  test("Should check Email Incorrect Format Error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.checkThatEmailPasswordFieldsAreRequiredError();
  });
});
