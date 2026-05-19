import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly pageHeading: Locator;
  readonly productGrid: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page
      .getByRole('heading', { name: /shop|products|featured/i })
      .or(page.getByTestId('page-title'));
    this.productGrid = page
      .getByTestId('product-grid')
      .or(page.getByRole('main').locator('[data-testid="product-card"]'));
  }

  categoryLink(categoryName: string): Locator {
    return this.page
      .getByRole('link', { name: new RegExp(categoryName, 'i') })
      .or(this.page.getByTestId(`category-${categoryName.toLowerCase()}`));
  }

  productCard(productName: string): Locator {
    return this.page
      .getByRole('article', { name: new RegExp(productName, 'i') })
      .or(this.page.getByTestId(`product-card-${this.toTestId(productName)}`))
      .or(this.page.locator('[data-testid="product-card"]').filter({ hasText: productName }));
  }

  productLink(productName: string): Locator {
    return this.page
      .getByRole('link', { name: new RegExp(productName, 'i') })
      .or(this.page.getByTestId(`product-link-${this.toTestId(productName)}`));
  }

  emptyResultsMessage(term: string): Locator {
    return this.page
      .getByText(new RegExp(`no results.*${term}`, 'i'))
      .or(this.page.getByTestId('search-empty-state'));
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async openCategory(categoryName: string): Promise<void> {
    await this.categoryLink(categoryName).click();
  }

  async openProduct(productName: string): Promise<void> {
    await this.productLink(productName).click();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.productCard(productName)).toBeVisible();
  }

  private toTestId(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-');
  }
}
