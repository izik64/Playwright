// playwright-dev-page.ts
import { expect, Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userNameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly signInButton: Locator;
  readonly emailInputLabel: Locator;
  readonly passwordInputLabel: Locator;
  readonly emailInputErrorField: Locator;
  readonly passwordInputErrorField: Locator;
  readonly errorMessagePopUp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInputField = page.locator("#mat-input-0");
    this.passwordInputField = page.locator("#mat-input-1");
    this.signInButton = page.locator('//*[@data-id="btn_sign_in"]');
    this.emailInputLabel = page.locator(
      "//mat-label[contains(text(), 'Email')]"
    );
    this.passwordInputLabel = page.locator(
      "//label/mat-label/span[contains(text(), 'Password')]"
    );
    this.emailInputErrorField = page.locator("#mat-mdc-error-0");
    this.passwordInputErrorField = page.locator("#mat-mdc-error-1");
    this.errorMessagePopUp = page.locator(
      '//span[contains(text(), "Failed to log in with provided credentials.")]'
    );
  }

  async checkThatPageElementsAreExists() {
    await expect(this.userNameInputField).toBeVisible();
    await expect(this.userNameInputField).toBeEnabled();
    await expect(this.passwordInputField).toBeVisible();
    await expect(this.passwordInputField).toBeEnabled();
    await expect(this.signInButton).toBeVisible();
    await expect(this.signInButton).toBeDisabled();
  }

  async checkThatLoginFormElementsContainCorrectText() {
    await expect(this.emailInputLabel).toContainText("Email");
    await expect(this.passwordInputLabel).toContainText("Password");
  }

  async loginAndCheckStatusCode(username, password) {
    await this.userNameInputField.click();
    await this.userNameInputField.type(username);
    await this.passwordInputField.click();
    await this.passwordInputField.type(password);
    await expect(this.signInButton).toBeEnabled();
    await this.signInButton.click();
  }

  async checkPageUrl(url) {
    await this.page.waitForURL(url);
    await expect(this.page.url()).toContain(url);
    await expect(this.page.url()).toMatch(url);
  }

  async checkLogInErrorMessage() {
    await expect(this.errorMessagePopUp).toBeVisible();
  }

  async checkEmailIncorrectFormatError(username) {
    await this.userNameInputField.click();
    await this.userNameInputField.type(username);
    await this.passwordInputField.click();
    await expect(this.emailInputErrorField).toContainText(
      "Incorrect email format"
    );
  }

  async checkThatEmailPasswordFieldsAreRequiredError() {
    await this.userNameInputField.click();
    await this.passwordInputField.click();
    await this.userNameInputField.click();
    await expect(this.emailInputErrorField).toContainText("Email is required");
    await expect(this.passwordInputErrorField).toContainText(
      "Password is required"
    );
  }
}
