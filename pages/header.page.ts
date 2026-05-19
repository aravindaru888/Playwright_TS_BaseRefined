import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class HeaderPage {
  readonly signInLink: Locator;
  readonly accountMenu: Locator;
  readonly logoutLink: Locator;
  readonly cartLink: Locator;
  readonly homeLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.signInLink = page
      .getByRole('button', { name: /sign in|log in/i })
      .or(page.getByRole('link', { name: /sign in|log in/i }));
    this.accountMenu = page
      .getByRole('button', { name: /account|my account/i })
      .or(page.getByTestId('account-menu'));
    this.logoutLink = page
      .getByRole('button', { name: /logout|sign out/i })
      .or(page.getByRole('link', { name: /logout|sign out/i }));
    this.cartLink = page
      .getByRole('link', { name: /cart|basket/i })
      .or(page.getByTestId('nav-cart'));
    this.homeLink = page
      .getByRole('link', { name: /home|shop/i })
      .or(page.getByTestId('nav-home'));
    this.searchInput = page
      .getByRole('searchbox', { name: /search/i })
      .or(page.getByPlaceholder(/search/i))
      .or(page.getByTestId('search-input'));
    this.searchButton = page
      .getByRole('button', { name: /search/i })
      .or(page.getByTestId('search-submit'));
  }

  async openLogin(): Promise<void> {
    await this.signInLink.click();
  }

  async searchFor(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.accountMenu.click();
    await this.logoutLink.click();
  }

  async expectSignedIn(): Promise<void> {
    await expect(this.accountMenu).toBeVisible();
  }
}
