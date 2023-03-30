// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';
const config = require('../tests/config-env.json');
const username = config.autotest.user;
const password = config.autotest.password;
const url = config.urlData.devUrl;

export class LoginPage {
    readonly page: Page;
    readonly userNameInputField: Locator;
    readonly passwordInputField: Locator;
    readonly signInButton: Locator;
    readonly emailInputLabel: Locator;
    readonly passwordInputLabel: Locator;
    readonly emailInputErrorField: Locator;
    readonly passwordInputErrorField: Locator;


    constructor(page: Page) {
        this.page = page;
        this.userNameInputField = page.locator('#mat-input-0');
        this.passwordInputField = page.locator('#mat-input-1');
        this.signInButton = page.locator('//*[@data-id=\"btn_sign_in\"]');
        this.emailInputLabel = page.locator('mat-label.ng-tns-c8-0');
        this.passwordInputLabel = page.locator('mat-label.ng-tns-c8-1 > span');
        this.emailInputErrorField = page.locator('#mat-mdc-error-0');
        this.passwordInputErrorField = page.locator('#mat-mdc-error-1');
    }

    async goto() {
        await this.page.goto(url);
    }

    async checkThatPageElementsAreExists() {
        await expect(this.userNameInputField).toBeVisible();
        await expect(this.userNameInputField).toBeEnabled();
        await expect(this.passwordInputField).toBeVisible();
        await expect(this.passwordInputField).toBeEnabled();
        await expect(this.signInButton).toBeVisible();
        await expect(this.signInButton).toBeDisabled();
    }
}