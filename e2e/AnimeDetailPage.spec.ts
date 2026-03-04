import { test, expect } from '@playwright/test';

test('whether the anime detail page page has the expected elements', async ({ page }) => {
  await page.goto('http://localhost:3000/1');
  await expect(page.getByRole('heading', { name: 'Cowboy Bebop' })).toBeVisible();
  await expect(page.getByRole('link', { name: '← Back to Overview' })).toBeVisible();
  await expect(page.getByText('Episodes')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Description' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Cowboy Bebop' })).toBeVisible();
});
