import { test as setup } from '@playwright/test';
import { env } from '../../config/environment';
import { Logger } from '../../helpers/logger';
import { LoginPage } from '../../pages/login.page';
import { HeaderPage } from '../../pages/header.page';

setup('authenticate reusable shopper session', async ({ page }) => {
  const header = new HeaderPage(page);
  const loginPage = new LoginPage(page);

  Logger.step(`Creating storage state for ${env.name} environment.`);
  await page.goto('/');
  //await header.openLogin();
  //await loginPage.expectLoginForm();
  await loginPage.login(env.username, env.password);
  //await header.expectSignedIn();
  await page.context().storageState({ path: '.auth/user.json' });
});
