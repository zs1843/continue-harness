import { cp, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageDirectory = resolve(import.meta.dirname, '..');
const repositoryRoot = resolve(packageDirectory, '../..');

for (const directory of ['presets', 'skills', 'templates', 'ui-systems']) {
  await cp(resolve(repositoryRoot, directory), resolve(packageDirectory, directory), {
    force: true,
    recursive: true,
  });
}

const version = await readFile(resolve(repositoryRoot, 'VERSION'), 'utf8');
await writeFile(resolve(packageDirectory, 'VERSION'), version, 'utf8');
