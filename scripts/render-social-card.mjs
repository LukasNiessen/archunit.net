import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const source = pathToFileURL(path.resolve('public/images/og-card.svg')).href;

await page.goto(source);
await page.screenshot({ path: 'public/images/og-card.png' });
await browser.close();

process.stdout.write('Rendered public/images/og-card.png at 1200x630.\n');
