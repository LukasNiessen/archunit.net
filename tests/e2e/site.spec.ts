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
  const libraryWord = page.locator('[data-library-word]');
  await expect(libraryWord).toHaveText('TS');
  await expect(libraryWord).not.toHaveText('TS', { timeout: 4_500 });
  await page.waitForTimeout(500);
  const wordAndUnderlineWidths = await page.evaluate(() => {
    const word = document.querySelector<HTMLElement>('[data-library-word]');
    const underline = document.querySelector<HTMLElement>('.hero-word-underline');
    return {
      word: word?.getBoundingClientRect().width ?? 0,
      underline: Number.parseFloat(underline ? getComputedStyle(underline).width : '0'),
    };
  });
  expect(Math.abs(wordAndUnderlineWidths.word - wordAndUnderlineWidths.underline)).toBeLessThan(2);

  if ((page.viewportSize()?.width ?? 0) > 760) {
    const brand = await page.locator('.site-header .brand').boundingBox();
    const firstNavigationLink = await page.locator('.nav-dropdown__trigger').first().boundingBox();
    const themeControl = await page.locator('[data-theme-toggle]').boundingBox();
    expect(firstNavigationLink?.x ?? 0).toBeGreaterThan((brand?.x ?? 0) + (brand?.width ?? 0));
    expect(firstNavigationLink?.x ?? Infinity).toBeLessThan(
      (page.viewportSize()?.width ?? 0) * 0.55,
    );
    expect(themeControl?.x ?? 0).toBeGreaterThan((page.viewportSize()?.width ?? 0) * 0.7);

    if ((page.viewportSize()?.width ?? 0) > 1050) {
      const lede = await page.locator('.hero-lede').boundingBox();
      const dividerX = (page.viewportSize()?.width ?? 0) / 2;
      expect((lede?.x ?? 0) + (lede?.width ?? Infinity)).toBeLessThanOrEqual(dividerX - 12);
    }
  }

  const phpTab = page.getByRole('tab', { name: 'PHP' });
  await phpTab.click();
  await expect(phpTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'PHP' })).toBeVisible();
  await expect(page.locator('body')).not.toContainText(String.fromCodePoint(0x2014));

  const isMobile = (page.viewportSize()?.width ?? 1000) <= 760;
  if (isMobile) {
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
  }
  const startButton = isMobile
    ? page.locator('.mobile-nav-actions .button--lime')
    : page.locator('.header-started');
  await startButton.hover();
  const hoverColors = await startButton.evaluate((element) => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, foreground: style.color };
  });
  expect(hoverColors.background).not.toBe(hoverColors.foreground);
});

test('the homepage word cycle respects reduced-motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-library-word]')).toHaveText('TS');
  await page.waitForTimeout(2_900);
  await expect(page.locator('[data-library-word]')).toHaveText('TS');
});

test('every implementation has an indexable detail page', async ({ page }) => {
  test.setTimeout(60_000);
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
    await expect(page.locator('.documentation-topic')).toHaveCount(3);
    const mark = await page.locator('.detail-title-row .project-mark').boundingBox();
    expect(mark).not.toBeNull();
    expect(Math.abs((mark?.width ?? 0) - (mark?.height ?? 0))).toBeLessThanOrEqual(1);
  }
});

test('library cards keep the active theme when hovered', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => globalThis.localStorage.setItem('archunit-theme', 'light'));
  await page.reload();
  const card = page.locator('.project-card').first();
  const before = await card.evaluate((element) => getComputedStyle(element).backgroundColor);
  await card.hover();
  const after = await card.evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(before).not.toBe('rgb(17, 21, 27)');
  expect(after).not.toBe('rgb(17, 21, 27)');
});

test('navigation and contributor content remain usable on mobile', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only navigation check');
  await page.goto('/team/');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  const skipLinkState = await page.locator('.skip-link').evaluate((element) => {
    const style = getComputedStyle(element);
    return { opacity: style.opacity, pointerEvents: style.pointerEvents };
  });
  expect(skipLinkState).toEqual({ opacity: '0', pointerEvents: 'none' });

  await expect(page.getByRole('heading', { name: /five people/i })).toBeVisible();
  await expect(page.locator('.team-card')).toHaveCount(5);
  await expect(page.locator('.team-card__profile')).toHaveCount(5);
  const teamPortrait = await page.locator('.team-card__profile > img').first().boundingBox();
  expect(Math.abs((teamPortrait?.width ?? 0) - (teamPortrait?.height ?? 0))).toBeLessThanOrEqual(1);
  expect(teamPortrait?.width ?? Infinity).toBeLessThanOrEqual(120);
  await expect(page.getByRole('link', { name: /explore jobs/i })).toBeVisible();
});

test('company navigation exposes about, people, jobs, and conversion actions', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/');
  if ((page.viewportSize()?.width ?? 1000) <= 760) {
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
  }
  await page.getByRole('button', { name: 'Company' }).click();
  await expect(page.getByRole('link', { name: /^About/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /^Mission/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /^Principles/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /^People/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /^Jobs/ }).first()).toBeVisible();

  const aboutResponse = await page.goto('/about/');
  expect(aboutResponse?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: /architecture decisions/i })).toBeVisible();

  const jobsResponse = await page.goto('/jobs/');
  expect(jobsResponse?.status()).toBe(200);
  await expect(page.locator('.job-opening')).toHaveCount(5);
  await expect(page.getByRole('link', { name: /apply by email/i }).first()).toHaveAttribute(
    'href',
    /^mailto:lks\.niessen@gmail\.com/,
  );
});

test('enterprise navigation and sales resources are complete', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/');
  if ((page.viewportSize()?.width ?? 1000) <= 760) {
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
  }
  await page.getByRole('button', { name: 'Products' }).click();
  await expect(page.getByRole('link', { name: /^Enterprise/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /^Use cases/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /^Integrations/ }).first()).toBeVisible();

  for (const route of [
    '/enterprise/',
    '/use-cases/',
    '/integrations/',
    '/resources/',
    '/mission/',
    '/principles/',
    '/support/',
    '/status/',
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.archunit.net${route}`,
    );
  }
  await page.goto('/resources/');
  await expect(page.locator('.resource-library-grid article')).toHaveCount(6);
});

test('every team member has a complete, indexable profile', async ({ page }) => {
  const slugs = [
    'lukas-niessen',
    'tristan-kruse',
    'jan-heimann',
    'deban-kumar-sahu',
    'robey-beswick',
  ];

  for (const slug of slugs) {
    const response = await page.goto(`/team/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('.profile-hero h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.archunit.net/team/${slug}/`,
    );
    await expect(page.locator('.profile-focus-grid article')).toHaveCount(3);
    await expect(page.locator('.profile-work-section li')).toHaveCount(3);
    if (slug === 'lukas-niessen') {
      await expect(page.locator('.profile-publication-card')).toHaveCount(5);
    } else {
      await expect(page.locator('.profile-publications-section')).toHaveCount(0);
    }
    const relatedPortrait = await page.locator('.profile-team-grid img').first().boundingBox();
    expect(
      Math.abs((relatedPortrait?.width ?? 0) - (relatedPortrait?.height ?? 0)),
    ).toBeLessThanOrEqual(1);
    await expect(page.getByRole('link', { name: /email/i }).first()).toHaveAttribute(
      'href',
      /^mailto:lks\.niessen@gmail\.com/,
    );
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    expect(structuredData).toContain('ProfilePage');
    expect(structuredData).toContain('Person');
  }
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
  await expect(page.locator('.blog-card')).toHaveCount(5);
  const response = await page.goto('/blog/archunitts-vs-tsarch/');
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole('heading', {
      name: 'ArchUnitTS vs. tsarch in 2026: which architecture test should you choose?',
      level: 1,
    }),
  ).toBeVisible();
  await expect(page.locator('.article-body section')).toHaveCount(9);
  if ((page.viewportSize()?.width ?? 1000) > 1050) {
    const aside = await page.locator('.article-aside').boundingBox();
    const body = await page.locator('.article-body').boundingBox();
    expect(aside?.width ?? Infinity).toBeLessThanOrEqual(230);
    expect(body?.width ?? 0).toBeGreaterThan(aside?.width ?? Infinity);
  }
});

test('the how-it-works walkthrough explains and advances the pipeline', async ({ page }) => {
  await page.goto('/how-archunit-works/');
  await expect(page.getByRole('heading', { name: /how archunit sees your system/i })).toBeVisible();
  await expect(page.locator('[data-how-stage]')).toHaveCount(8);
  await expect(page.getByText('Python, concretely')).toHaveCount(8);
  await expect(page.locator('.how-walkthrough .inline-code')).toHaveCount(16);
  await expect(page.locator('.how-chapter-nav a')).toHaveCount(6);
  await expect(page.locator('.resolution-table tbody tr')).toHaveCount(5);
  await expect(page.locator('#technical-extraction .code-window')).toHaveCount(2);
  await expect(page.locator('#technical-extraction .inline-code')).toHaveCount(18);
  await expect(page.locator('#technical-graph .code-window')).toHaveCount(2);
  await expect(page.locator('.evaluation-truth-table')).toBeVisible();
  await expect(page.getByRole('heading', { name: /static analysis is strongest/i })).toBeVisible();
  const unformattedCodeCount = await page
    .locator('#main-content code')
    .evaluateAll(
      (elements) =>
        elements.filter(
          (element) =>
            !element.classList.contains('inline-code') && element.closest('.code-window') === null,
        ).length,
    );
  expect(unformattedCodeCount).toBe(0);
  await page.locator('[data-how-stage="7"]').scrollIntoViewIfNeeded();
  if ((page.viewportSize()?.width ?? 1000) > 820) {
    await expect(page.locator('[data-how-visual]')).toHaveAttribute('data-active-stage', '7');
  }
});

test('stats, privacy, and thank-you pages expose intentional metadata', async ({ page }) => {
  await page.goto('/stats/');
  await expect(page.getByText('733', { exact: true })).toBeVisible();
  await expect(page.getByText('962,975', { exact: true })).toBeVisible();
  await expect(page.locator('.stars-row')).toHaveCount(9);
  await expect(page.locator('.downloads-table tbody tr')).toHaveCount(9);

  await page.goto('/privacy/');
  await expect(page).toHaveTitle(/Privacy policy/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /local theme/i);

  await page.goto('/thank-you/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});

test('every rendered image has an alt attribute', async ({ page }) => {
  for (const route of ['/', '/team/', '/team/lukas-niessen/', '/typescript/']) {
    await page.goto(route);
    const missingAlt = await page.locator('img:not([alt])').count();
    expect(missingAlt).toBe(0);
  }
});

test('key pages do not overflow the viewport', async ({ page }) => {
  const failures: string[] = [];
  for (const route of [
    '/',
    '/team/',
    '/team/lukas-niessen/',
    '/typescript/',
    '/blog/',
    '/how-archunit-works/',
    '/stats/',
    '/privacy/',
    '/blog/why-archunitts-exists/',
    '/why-architecture-tests/',
    '/enterprise/',
    '/resources/',
    '/mission/',
    '/principles/',
  ]) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      offenders: Array.from(document.querySelectorAll<HTMLElement>('body *'))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            selector: `${element.tagName.toLowerCase()}.${element.className}`,
            left: Math.round(rect.left * 10) / 10,
            right: Math.round(rect.right * 10) / 10,
          };
        })
        .filter((item) => item.left < -1 || item.right > document.documentElement.clientWidth + 1)
        .slice(0, 5),
    }));
    if (dimensions.scrollWidth > dimensions.clientWidth + 1) {
      failures.push(`${route}: ${JSON.stringify(dimensions)}`);
    }
  }
  expect(failures).toEqual([]);
});

test('unknown routes use the custom 404 page', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /not in the graph/i })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});
