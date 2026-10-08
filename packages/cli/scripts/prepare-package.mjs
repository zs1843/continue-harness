import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageDirectory = resolve(import.meta.dirname, '..');
const repositoryRoot = resolve(packageDirectory, '../..');

// cp() overwrites but never deletes, so clear each staged directory first to keep
// the published package in sync with the repository.
for (const directory of ['presets', 'skills', 'templates', 'ui-systems']) {
  const target = resolve(packageDirectory, directory);
  await rm(target, { force: true, recursive: true });
  await cp(resolve(repositoryRoot, directory), target, {
    force: true,
    recursive: true,
  });
}

const version = await readFile(resolve(repositoryRoot, 'VERSION'), 'utf8');
await writeFile(resolve(packageDirectory, 'VERSION'), version, 'utf8');
