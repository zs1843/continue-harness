import { expect, test } from '@playwright/test';

test('loads the consumer H5 fixture without runtime errors', async ({ page }) => {
  const runtimeErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => runtimeErrors.push(`page: ${error.message}`));

  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  await expect(page.locator('.card .title')).toHaveText('Consumer H5 fixture');
  await expect(page.getByText('A minimal, business-neutral uni-app page.')).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});
