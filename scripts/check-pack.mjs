import { mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';

const run = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const destination = resolve(root, 'tmp/pack-check');
await mkdir(destination, { recursive: true });

for (const name of ['@company/continue-harness-core', '@company/continue-harness']) {
  await run('pnpm', ['--filter', name, 'pack', '--pack-destination', destination], {
    cwd: root,
    maxBuffer: 2 * 1024 * 1024,
  });
}

console.log('package pack check passed: core and CLI tarballs generated');
