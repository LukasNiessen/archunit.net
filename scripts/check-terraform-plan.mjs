import { readFile } from 'node:fs/promises';
import { stdin } from 'node:process';

const planPath = process.argv[2];
if (!planPath) {
  throw new Error('Usage: node scripts/check-terraform-plan.mjs <terraform-plan.json>');
}

const source =
  planPath === '-'
    ? await new Promise((resolve, reject) => {
        let value = '';
        stdin.setEncoding('utf8');
        stdin.on('data', (chunk) => {
          value += chunk;
        });
        stdin.on('end', () => resolve(value));
        stdin.on('error', reject);
      })
    : await readFile(planPath, 'utf8');
const plan = JSON.parse(source);
const changes = plan.resource_changes ?? [];
const destructive = changes.filter((resource) => resource.change.actions.includes('delete'));

if (destructive.length > 0) {
  const summary = destructive
    .map((resource) => `${resource.address}: ${resource.change.actions.join(', ')}`)
    .join('\n');
  throw new Error(`Refusing a destructive infrastructure plan:\n${summary}`);
}

const actionable = changes.filter(
  (resource) => !resource.change.actions.every((action) => action === 'no-op' || action === 'read'),
);
process.stdout.write(
  `Plan guard accepted ${actionable.length} non-destructive resource change(s).\n`,
);
