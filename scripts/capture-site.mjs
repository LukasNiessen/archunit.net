import { chromium, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { URL } from 'node:url';

await mkdir('qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4321/';
const target = new URL(baseUrl).href;

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await desktop.goto(target, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'qa/home-desktop.png', fullPage: true });

const mobileContext = await browser.newContext({ ...devices['Pixel 7'], locale: 'en-US' });
const mobile = await mobileContext.newPage();
await mobile.goto(target, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'qa/home-mobile-viewport.png', fullPage: false });
await mobile.screenshot({ path: 'qa/home-mobile.png', fullPage: true });

await mobileContext.close();
await browser.close();
process.stdout.write('Captured desktop and mobile screenshots in qa/.\n');
