import { messages } from '../../config/messages';
import { testTags } from '../../helpers/test-tags';
import { expect, test } from '../../fixtures/test.fixture';

test.describe('Search', () => {
  test(
    `${testTags.smoke} ${testTags.search} shopper can search and see matching products`,
    async ({ page, header, homePage, searchData }) => {
      await test.step('Open the storefront', async () => {
        await page.goto('/');
        await homePage.expectLoaded();
      });

      await test.step('Search using a valid keyword', async () => {
        await header.searchFor(searchData.validTerm);
      });

      await test.step('Validate search results are displayed', async () => {
        const resultCards = page.locator('[data-testid="product-card"]');
        await expect(resultCards.first(), messages.searchResults).toBeVisible();
      });
    }
  );
});
