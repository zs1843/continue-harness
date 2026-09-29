import { expect, test } from '@playwright/test';
test('loads without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(e.message));
  const response = await page.goto('/');
  expect(response?.ok()).toBe(true);
  await expect(page.locator('.card .title')).toHaveText('__PROJECT_NAME__');
  expect(errors).toEqual([]);
});
