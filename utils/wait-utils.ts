import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export async function expectToBeVisible(locator: Locator, message: string): Promise<void> {
  await expect(locator, message).toBeVisible();
}
