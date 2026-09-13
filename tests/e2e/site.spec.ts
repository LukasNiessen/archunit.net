import { expect, test } from '@playwright/test';

test('homepage presents the full library family', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('ArchUnit');
  await expect(
    page.getByRole('heading', { name: /architecture is a behavior/i, level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /architecture tests in the language/i }),
  ).toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(9);
  await expect(page.getByRole('tab')).toHaveCount(9);

  const phpTab = page.getByRole('tab', { name: 'PHP' });
  await phpTab.click();
  await expect(phpTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'PHP' })).toBeVisible();
  await expect(page.locator('body')).not.toContainText(String.fromCodePoint(0x2014));

  if ((page.viewportSize()?.width ?? 1000) <= 760) {
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
  }
  const githubButton = page.getByRole('link', { name: 'GitHub', exact: true }).first();
  await githubButton.hover();
  const hoverColors = await githubButton.evaluate((element) => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, foreground: style.color };
  });
  expect(hoverColors.background).not.toBe(hoverColors.foreground);
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

  await expect(page.getByRole('heading', { name: /five people/i })).toBeVisible();
  await expect(page.locator('.team-card')).toHaveCount(5);
  await expect(page.getByRole('link', { name: /find a repository/i })).toBeVisible();
});

test('theme choice persists across navigation and reloads', async ({ page }) => {
  await page.goto('/');
  const initialTheme = await page.locator('html').getAttribute('data-theme');
  const nextTheme = initialTheme === 'light' ? 'dark' : 'light';
  if ((page.viewportSize()?.width ?? 1000) <= 760) {
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
  }
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme);
  await expect(page.locator('[data-theme-toggle]')).toHaveAttribute(
    'aria-label',
    nextTheme === 'light' ? 'Use dark mode' : 'Use light mode',
  );
});

test('blog index and adapted articles are statically accessible', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.locator('.blog-card')).toHaveCount(4);
  const response = await page.goto('/blog/why-archunitts-exists/');
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole('heading', { name: 'Why ArchUnitTS exists', level: 1 }),
  ).toBeVisible();
});

test('key pages do not overflow the viewport', async ({ page }) => {
  for (const route of ['/', '/team/', '/typescript/', '/blog/']) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  }
});

test('unknown routes use the custom 404 page', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /not in the graph/i })).toBeVisible();
});
