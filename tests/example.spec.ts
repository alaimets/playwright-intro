import { test, expect } from '@playwright/test';

test.beforeEach('Go to the site', async ({ page }) => {
  await page.goto('https://playwright.dev/');
})
test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Github icon is visible', async ({ page }) => {
  const GithubIcon = page.getByLabel('GitHub repository');
  await expect(GithubIcon).toBeVisible();
})

test('Discord icon is visible', async ({ page }) => {
  const DiscordIcon = page.getByLabel('Discord server');
  await expect(DiscordIcon).toBeVisible();
})

test('Dark/Light theme icon is visible', async ({ page }) => {
  const ColorThemeIcon = page.getByLabel('Switch between dark and light mode (currently system mode)')
  await expect(ColorThemeIcon).toBeVisible();
})