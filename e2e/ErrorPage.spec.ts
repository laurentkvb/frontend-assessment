import { test, expect } from '@playwright/test';

test('whether the error page has the expected elements', async ({ page }) => {
  await page.goto('http://localhost:3000/invalid_id');
  await expect(page.getByText('⨯_⨯')).toBeVisible();
  await page.getByRole('heading', { name: 'Something went wrong!' }).isVisible();
  await page.getByText('The provided id must be a number').isVisible();
  await page.getByRole('link', { name: 'Back to Overview' }).isVisible();
});
