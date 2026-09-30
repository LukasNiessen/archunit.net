import { chromium, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { URL } from 'node:url';

await mkdir('qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4321/';
const target = new URL(baseUrl).href;
const scrollToWithOffset = async (locator, offset = 80) => {
  await locator.evaluate((element, topOffset) => {
    element.ownerDocument.documentElement.style.scrollBehavior = 'auto';
    globalThis.scrollTo({
      top: element.getBoundingClientRect().top + globalThis.scrollY - topOffset,
    });
  }, offset);
};

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await desktop.goto(target, { waitUntil: 'networkidle' });
await desktop.evaluate(() => globalThis.localStorage.setItem('archunit-theme', 'dark'));
await desktop.reload({ waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/home-dark-viewport.png', fullPage: false });
await desktop.waitForTimeout(2800);
await desktop.screenshot({ path: 'qa/home-dark-word-cycle.png', fullPage: false });
await desktop.screenshot({ path: 'qa/home-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/team/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/team-dark-viewport.png', fullPage: false });
await desktop.screenshot({ path: 'qa/team-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/team/lukas-niessen/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/team-profile-dark-viewport.png', fullPage: false });
await desktop.screenshot({ path: 'qa/team-profile-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/about/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/about-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/jobs/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/jobs-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/enterprise/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/enterprise-dark-viewport.png', fullPage: false });
await desktop.screenshot({ path: 'qa/enterprise-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/resources/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/resources-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/typescript/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/typescript-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/blog/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/blog-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/blog/why-archunitts-exists/', target).href, {
  waitUntil: 'networkidle',
});
await desktop.screenshot({ path: 'qa/blog-article-dark-viewport.png', fullPage: false });
await desktop.screenshot({ path: 'qa/blog-article-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/why-architecture-tests/', target).href, { waitUntil: 'networkidle' });
await desktop.locator('.article-layout').scrollIntoViewIfNeeded();
await desktop.screenshot({ path: 'qa/why-architecture-dark-viewport.png', fullPage: false });
await desktop.goto(new URL('/stats/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/stats-dark-desktop.png', fullPage: true });
await desktop.goto(new URL('/how-archunit-works/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/how-dark-hero.png', fullPage: false });
await scrollToWithOffset(desktop.locator('[data-adapter-picker]'));
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-language-selector.png', fullPage: false });
await desktop.getByRole('tab', { name: /^TypeScript/ }).click();
await scrollToWithOffset(
  desktop.locator('[data-adapter-panel="typescript"][data-adapter-stage="discover"]'),
);
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-typescript-discovery.png', fullPage: false });
await scrollToWithOffset(
  desktop.locator('[data-adapter-panel="typescript"][data-adapter-stage="resolve"]'),
);
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-typescript-resolution.png', fullPage: false });
await desktop.getByRole('tab', { name: /^Ruby/ }).click();
await scrollToWithOffset(
  desktop.locator('[data-adapter-panel="ruby"][data-adapter-stage="discover"]'),
);
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-unavailable-adapter.png', fullPage: false });
await desktop.getByRole('tab', { name: /^Python/ }).click();
for (const [sectionId, screenshotName] of [
  ['discover-parse', 'how-dark-discovery.png'],
  ['resolve-graph', 'how-dark-evidence-lab.png'],
  ['fluent-rule', 'how-dark-fluent-rule.png'],
  ['evaluate', 'how-dark-evaluation.png'],
  ['algorithms', 'how-dark-algorithms.png'],
  ['feedback', 'how-dark-feedback.png'],
]) {
  await desktop.locator(`#${sectionId}`).evaluate((section) => {
    section.ownerDocument.documentElement.style.scrollBehavior = 'auto';
    globalThis.scrollTo({ top: section.offsetTop - 80 });
  });
  await desktop.waitForTimeout(120);
  await desktop.screenshot({ path: `qa/${screenshotName}`, fullPage: false });
}
await desktop.locator('[data-adapter-panel="python"] .memory-checkpoint').scrollIntoViewIfNeeded();
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-python-checkpoint.png', fullPage: false });
await desktop.locator('[data-evidence-lab]').scrollIntoViewIfNeeded();
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-evidence-lab-detail.png', fullPage: false });
await desktop.locator('.graph-contract').scrollIntoViewIfNeeded();
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-projection.png', fullPage: false });
await desktop.getByRole('button', { name: 'Replay trace' }).click();
await desktop.getByText('Replay complete. One forbidden edge became one violation.').waitFor({
  state: 'visible',
  timeout: 10_000,
});
await desktop.locator('[data-evidence-terminal]').scrollIntoViewIfNeeded();
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-dark-real-trace.png', fullPage: false });
await desktop.screenshot({ path: 'qa/how-dark-desktop.png', fullPage: true });
await desktop.evaluate(() => globalThis.localStorage.setItem('archunit-theme', 'light'));
await desktop.goto(target, { waitUntil: 'networkidle' });
await desktop.locator('.project-card').first().hover();
await desktop.screenshot({ path: 'qa/home-light-hover-viewport.png', fullPage: false });
await desktop.screenshot({ path: 'qa/home-light-desktop.png', fullPage: true });
await desktop.getByRole('button', { name: 'Products' }).click();
await desktop.waitForTimeout(220);
await desktop.screenshot({ path: 'qa/products-menu-light.png', fullPage: false });
await desktop.goto(new URL('/team/tristan-kruse/', target).href, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/team-profile-light-viewport.png', fullPage: false });
await desktop.goto(new URL('/how-archunit-works/', target).href, { waitUntil: 'networkidle' });
await desktop.getByRole('tab', { name: /^TypeScript/ }).click();
await scrollToWithOffset(desktop.locator('[data-adapter-picker]'));
await desktop.waitForTimeout(120);
await desktop.screenshot({ path: 'qa/how-light-language-selector.png', fullPage: false });

const mobileContext = await browser.newContext({ ...devices['Pixel 7'], locale: 'en-US' });
const mobile = await mobileContext.newPage();
await mobile.goto(target, { waitUntil: 'networkidle' });
await mobile.evaluate(() => globalThis.localStorage.setItem('archunit-theme', 'dark'));
await mobile.reload({ waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/home-mobile-viewport.png', fullPage: false });
await mobile.getByRole('button', { name: 'Toggle navigation' }).click();
await mobile.getByRole('button', { name: 'Products' }).click();
await mobile.waitForTimeout(220);
await mobile.screenshot({ path: 'qa/products-menu-mobile.png', fullPage: false });
await mobile.screenshot({ path: 'qa/home-mobile.png', fullPage: true });
await mobile.goto(new URL('/team/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/team-mobile-viewport.png', fullPage: false });
await mobile.screenshot({ path: 'qa/team-mobile.png', fullPage: true });
await mobile.goto(new URL('/team/deban-kumar-sahu/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/team-profile-mobile-viewport.png', fullPage: false });
await mobile.screenshot({ path: 'qa/team-profile-mobile.png', fullPage: true });
await mobile.goto(new URL('/jobs/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/jobs-mobile.png', fullPage: true });
await mobile.goto(new URL('/enterprise/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/enterprise-mobile-viewport.png', fullPage: false });
await mobile.screenshot({ path: 'qa/enterprise-mobile.png', fullPage: true });
await mobile.goto(new URL('/resources/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/resources-mobile.png', fullPage: true });
await mobile.goto(new URL('/how-archunit-works/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/how-mobile-viewport.png', fullPage: false });
await scrollToWithOffset(mobile.locator('[data-adapter-picker]'), 64);
await mobile.waitForTimeout(120);
await mobile.screenshot({ path: 'qa/how-mobile-language-selector.png', fullPage: false });
await mobile.getByRole('tab', { name: /^TypeScript/ }).click();
await scrollToWithOffset(
  mobile.locator('[data-adapter-panel="typescript"][data-adapter-stage="discover"]'),
  64,
);
await mobile.waitForTimeout(120);
await mobile.screenshot({ path: 'qa/how-mobile-typescript-discovery.png', fullPage: false });
await mobile.getByRole('tab', { name: /^Python/ }).click();
for (const [sectionId, screenshotName] of [
  ['discover-parse', 'how-mobile-discovery.png'],
  ['resolve-graph', 'how-mobile-evidence-lab.png'],
  ['evaluate', 'how-mobile-evaluation.png'],
]) {
  await scrollToWithOffset(mobile.locator(`#${sectionId}`), 64);
  await mobile.waitForTimeout(120);
  await mobile.screenshot({ path: `qa/${screenshotName}`, fullPage: false });
}
await mobile.locator('.graph-contract').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(120);
await mobile.screenshot({ path: 'qa/how-mobile-projection.png', fullPage: false });
await mobile.screenshot({ path: 'qa/how-mobile.png', fullPage: true });
await mobile.goto(new URL('/stats/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/stats-mobile-viewport.png', fullPage: false });
await mobile.screenshot({ path: 'qa/stats-mobile.png', fullPage: true });
await mobile.goto(new URL('/typescript/', target).href, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/typescript-mobile-viewport.png', fullPage: false });
await mobile.screenshot({ path: 'qa/typescript-mobile.png', fullPage: true });

await mobileContext.close();
await browser.close();
process.stdout.write('Captured desktop and mobile screenshots in qa/.\n');
