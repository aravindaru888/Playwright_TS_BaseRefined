import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page
      .getByRole('button', { name: /add to cart/i })
      .or(page.getByTestId('add-to-cart'));
    this.removeFromCartButton = page
      .getByRole('button', { name: /remove from cart/i })
      .or(page.getByTestId('remove-from-cart'));
    this.productTitle = page
      .getByRole('heading', { level: 1 })
      .or(page.getByTestId('product-title'));
    this.productPrice = page.getByTestId('product-price').or(page.getByText(/^\$\d+/));
  }

  async expectProductDetails(productName: string): Promise<void> {
    await expect(this.productTitle, `Expected product details page for ${productName}.`).toContainText(
      productName
    );
    await expect(this.productPrice).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeFromCartButton.click();
  }
}
