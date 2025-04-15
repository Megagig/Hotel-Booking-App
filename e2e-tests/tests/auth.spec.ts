import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the sign-in link
  await page.getByRole('link', { name: 'Sign In' }).click();

  // Assert we're on the sign-in page
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  // Fill the login form
  await page.locator('[name=email]').fill('megagigdev@gmail.com');
  await page.locator('[name=password]').fill('Password@247');

  // Click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert successful login
  await expect(page.getByText('Sign in Successful')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

//Add a registration test
test('should allow user to register', async ({ page }) => {
  // Generate a random email for testing
  const testEmail = `tester_register_${
    Math.floor(Math.random() * 9000) + 1000
  }@test.com`;

  await page.goto(BASE_URL);

  // Navigate to registration page
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an account here' }).click();

  // Assert we're on the registration page
  await expect(
    page.getByRole('heading', { name: 'Create an account' })
  ).toBeVisible();

  // Fill the registration form
  await page.locator('[name=firstName]').fill('Test First Name');
  await page.locator('[name=lastName]').fill('Test Last Name');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('password123');
  await page.locator('[name=confirmPassword]').fill('password123');

  // Submit the form
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Assert successful registration
  await expect(page.getByText('Account created successfully')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
