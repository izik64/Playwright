// playwright-dev-page.ts
import { expect, Page, Locator } from "@playwright/test";

export class ScansPage {
  readonly page: Page;
  readonly scanInputLables: Locator;

  constructor(page: Page) {
    this.page = page;
    this.scanInputLables = page.locator(".cdk-column-name > .title").nth(0);
  }

  async checkThatPageElementsAreExists() {
    await expect(this.scanInputLables).toBeVisible();
    await expect(this.scanInputLables).toBeEnabled();
    await expect(this.scanInputLables).toContainText(
      "DVWA - HAR All no-smart +AO"
    );
  }

  async checkPageUrl(url) {
    await this.page.waitForURL(url);
    await expect(this.page.url()).toContain(url);
    await expect(this.page.url()).toMatch(url);
  }
}
