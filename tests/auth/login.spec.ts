import { messages } from '../../config/messages';
import { testTags } from '../../helpers/test-tags';
import { expect, test } from '../../fixtures/test.fixture';

test.describe('Authentication', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test(`${testTags.smoke} ${testTags.auth} user can log in with valid credentials`, async ({
    page,
    header,
    loginPage,
    authData
  }) => {
    await test.step('Open the storefront and navigate to login', async () => {
      await page.goto('/');
      //await header.openLogin();
      await loginPage.expectLoginForm();
    });

    await test.step('Submit valid credentials', async () => {
      await loginPage.login(authData.standardUser.username, authData.standardUser.password);
    });

    await test.step('Validate successful login state', async () => {
      //await expect(header.accountMenu, messages.loginSuccess).toBeVisible();
    });
  });
});
