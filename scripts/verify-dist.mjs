import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const routes = [
  '',
  'typescript',
  'python',
  'dotnet',
  'ruby',
  'rust',
  'zig',
  'go',
  'java',
  'php',
  'team',
  'team/lukas-niessen',
  'team/tristan-kruse',
  'team/jan-heimann',
  'team/deban-kumar-sahu',
  'team/robey-beswick',
  'why-architecture-tests',
  'how-archunit-works',
  'stats',
  'privacy',
  'thank-you',
  'blog',
  'blog/why-archunitts-exists',
  'blog/architecture-tests-and-lint-rules',
  'blog/architecture-testing-for-python',
  'blog/fitness-functions-for-ai-generated-code',
];

for (const route of routes) {
  const file = path.join(root, route, 'index.html');
  await access(file);
  const html = await readFile(file, 'utf8');
  const expectedCanonical = route
    ? `https://www.archunit.net/${route}/`
    : 'https://www.archunit.net/';
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}"`)) {
    throw new Error(`Missing canonical URL in ${file}`);
  }
  if (!html.includes('application/ld+json')) {
    throw new Error(`Missing structured data in ${file}`);
  }
}

await access(path.join(root, '404.html'));
await access(path.join(root, 'sitemap-index.xml'));
await access(path.join(root, 'robots.txt'));

process.stdout.write(
  `Verified ${routes.length} static routes, metadata, sitemap, and 404 output.\n`,
);
