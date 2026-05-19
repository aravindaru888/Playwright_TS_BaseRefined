import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async expectUrlContains(path: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async clickAndWait(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.click();
  }
}
