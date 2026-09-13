import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { URL } from 'node:url';

const root = resolve('dist');
const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 4321);
const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

async function findFile(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, '') || 'index.html';
  let candidate = resolve(root, relative);

  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;

  try {
    const details = await stat(candidate);
    if (details.isDirectory()) candidate = join(candidate, 'index.html');
    await stat(candidate);
    return candidate;
  } catch {
    return null;
  }
}

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url ?? '/', `http://${host}`).pathname;
    const requestedFile = await findFile(pathname);
    const file = requestedFile ?? join(root, '404.html');
    const body = await readFile(file);

    response.writeHead(requestedFile ? 200 : 404, {
      'Content-Type': contentTypes.get(extname(file)) ?? 'application/octet-stream',
      'Content-Length': body.byteLength,
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(error instanceof Error ? error.message : 'Internal server error');
  }
});

server.listen(port, host, () => {
  process.stdout.write(`Serving dist at http://${host}:${port}\n`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
