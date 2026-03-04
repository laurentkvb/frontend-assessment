import { test, expect } from '@playwright/test';

test('whether the anime overview page expected elements exists', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('heading', { name: 'Anime Explorer' }).isVisible();
  await page.getByRole('link', { name: 'Cowboy Bebop Cowboy Bebop' }).isVisible();
  await page.getByRole('link', { name: '← Back to Overview' }).isVisible();
});
