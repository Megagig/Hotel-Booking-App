import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the sign-in link
  await page.getByRole('link', { name: 'Sign In' }).click();

  // Assert we're on the sign-in page
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  // Fill the login form
  await page.locator('[name=email]').fill('1@1.com');
  await page.locator('[name=password]').fill('password123');

  // Click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert successful login
  await expect(page.getByText('Sign in Successful')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
