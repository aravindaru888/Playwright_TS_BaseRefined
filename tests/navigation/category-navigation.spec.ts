import { messages } from '../../config/messages';
import { testTags } from '../../helpers/test-tags';
import { expect, test } from '../../fixtures/test.fixture';

test.describe('Category navigation', () => {
  test(
    `${testTags.smoke} ${testTags.navigation} shopper can navigate to a category and see relevant products`,
    async ({ page, homePage, categoryData, productData }) => {
      await test.step('Open the storefront home page', async () => {
        await page.goto('/');
        await homePage.expectLoaded();
      });

      await test.step('Navigate to the laptops category', async () => {
        await homePage.openCategory(categoryData.primaryCategory);
      });

      await test.step('Validate category-specific product visibility', async () => {
        await expect(
          homePage.productCard(productData.featuredProduct.name),
          messages.categoryLoaded
        ).toBeVisible();
      });
    }
  );
});
