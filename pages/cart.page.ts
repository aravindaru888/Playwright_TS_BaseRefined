import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartHeading: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartHeading = page
      .getByRole('heading', { name: /cart|shopping cart|basket/i })
      .or(page.getByTestId('cart-title'));
    this.checkoutButton = page
      .getByRole('button', { name: /checkout/i })
      .or(page.getByTestId('checkout-button'));
  }

  cartItem(productName: string): Locator {
    return this.page
      .getByRole('row', { name: new RegExp(productName, 'i') })
      .or(this.page.getByTestId(`cart-item-${this.toTestId(productName)}`))
      .or(this.page.locator('[data-testid="cart-item"]').filter({ hasText: productName }));
  }

  removeButton(productName: string): Locator {
    return this.cartItem(productName)
      .getByRole('button', { name: /remove/i })
      .or(this.page.getByTestId(`remove-cart-item-${this.toTestId(productName)}`));
  }

  async expectLoaded(): Promise<void> {
    await expect(this.cartHeading).toBeVisible();
  }

  async expectItemVisible(productName: string): Promise<void> {
    await expect(
      this.cartItem(productName),
      `Expected cart to contain product: ${productName}.`
    ).toBeVisible();
  }

  async removeItem(productName: string): Promise<void> {
    await this.removeButton(productName).click();
  }

  async expectItemRemoved(productName: string): Promise<void> {
    await expect(
      this.cartItem(productName),
      `Expected cart item ${productName} to be removed.`
    ).toHaveCount(0);
  }

  private toTestId(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-');
  }
}
