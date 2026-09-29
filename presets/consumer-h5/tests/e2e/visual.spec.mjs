import { expect, test } from '@playwright/test';

test('首页 390px 视觉基线 @visual', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.card .title')).toHaveText('__PROJECT_NAME__');
  await expect(page).toHaveScreenshot('home-390.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
