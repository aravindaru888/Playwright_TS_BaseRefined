import { testTags } from '../../helpers/test-tags';
import { expect, test } from '../../fixtures/test.fixture';

test.describe('Search empty state', () => {
  test(
    `${testTags.search} shopper sees a helpful empty state for unmatched searches`,
    async ({ page, header, homePage, searchData }) => {
      await page.goto('/');
      await homePage.expectLoaded();
      await header.searchFor(searchData.emptyResultsTerm);

      await expect(
        homePage.emptyResultsMessage(searchData.emptyResultsTerm),
        'Expected the application to show a clear empty-state message for unmatched searches.'
      ).toBeVisible();
    }
  );
});
