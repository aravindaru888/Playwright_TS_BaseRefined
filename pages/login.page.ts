import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page
      .getByLabel(/email|Username/i)
      .or(page.getByPlaceholder(/email|Username/i))
      .or(page.getByTestId('login-username'));
    this.passwordInput = page
      .getByLabel(/Password/i)
      .or(page.getByPlaceholder(/Password/i))
      .or(page.getByTestId('login-password'));
    this.submitButton = page
      .getByRole('button', { name: /sign in|Login/i })
      .or(page.getByTestId('login-submit'));
    this.loginHeading = page
      .getByRole('heading', { name: /sign in|log in/i })
      .or(page.getByTestId('login-title'));
  }

  async expectLoginForm(): Promise<void> {
    //await expect(this.loginHeading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
