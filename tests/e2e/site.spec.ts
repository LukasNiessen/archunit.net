import { expect, test } from '@playwright/test';

test('homepage presents the full library family', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('ArchUnitEverything');
  await expect(
    page.getByRole('heading', { name: /architecture is a behavior/i, level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /architecture tests in the language/i }),
  ).toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(9);

  const rustTab = page.getByRole('tab', { name: 'Rust' });
  await rustTab.click();
  await expect(rustTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Rust' })).toBeVisible();
});

test('every implementation has an indexable detail page', async ({ page }) => {
  const slugs = ['typescript', 'python', 'dotnet', 'ruby', 'rust', 'zig', 'go', 'java', 'php'];

  for (const slug of slugs) {
    const response = await page.goto(`/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.archunit.net/${slug}/`,
    );
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  }
});

test('navigation and contributor content remain usable on mobile', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only navigation check');
  await page.goto('/team/');

  await expect(page.getByRole('heading', { name: /people making architecture/i })).toBeVisible();
  await expect(page.locator('.contributor-card')).toHaveCount(7);
  await expect(page.getByRole('link', { name: /find a repository/i })).toBeVisible();
});

test('unknown routes use the custom 404 page', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /not in the graph/i })).toBeVisible();
});
