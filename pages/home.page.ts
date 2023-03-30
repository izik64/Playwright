import { expect, Locator, Page } from '@playwright/test';

export class HomePageTs {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly gettingStartedHeader: Locator;
    readonly pomLink: Locator;
    readonly tocList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.locator('heading', { name: 'Sign up' });
        this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
        this.pomLink = page.locator('li', { hasText: 'Guides' }).locator('a', { hasText: 'Page Object Model' });
        this.tocList = page.locator('article div.markdown ul > li > a');
    }

    async goto() {
        await this.page.goto('http://alexbjj64.pythonanywhere.com');
    }

    async getStarted() {
        await this.getStartedLink.first().click();
        await expect(this.gettingStartedHeader).toBeVisible();
    }

    async pageObjectModel() {
        await this.getStarted();
        await this.pomLink.click();
    }
}