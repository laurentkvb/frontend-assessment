import { test, expect } from '@playwright/test';

test('whether the anime overview page expected elements exists', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('heading', { name: 'Anime Explorer' }).isVisible();
  await page.getByRole('link', { name: 'Cowboy Bebop Cowboy Bebop' }).isVisible();
  await page.getByRole('link', { name: '← Back to Overview' }).isVisible();
});

test('should navigate to anime detail page when clicking a card', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cowboy Bebop Cowboy Bebop' }).click();

  await expect(page).toHaveURL(/\/(\d+)/);
  await expect(page.locator('h1')).toBeVisible();
});

test('should handle pagination correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const nextButton = page.getByRole('link', { name: 'Next' });
  const prevButton = page.getByRole('link', { name: 'Previous' });

  await nextButton.click();

  await expect(page).toHaveURL(/\?page=2/);
  await expect(prevButton).not.toHaveClass(/pointer-events-none/);

  await expect(page.getByText('2 / 250')).toBeVisible();
});

test('should show error or not found for invalid anime id', async ({ page }) => {
  await page.goto('http://localhost:3000/invalid-id-123');

  await expect(page.getByText('Something went wrong')).toBeVisible();

  const backButton = page.getByRole('link', { name: /overview|back/i });
  await expect(backButton).toBeVisible();
  await backButton.click();

  await expect(page).toHaveURL('http://localhost:3000/');
});
