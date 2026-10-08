import { readdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const roots = ['packages', 'scripts', 'tests'];
const extensions = new Set(['.js', '.mjs', '.cjs']);
const ignored = new Set(['node_modules', '.git', 'dist', 'coverage', '.vitepress']);

async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(path)));
    else if (extensions.has(entry.name.slice(entry.name.lastIndexOf('.')))) files.push(path);
  }
  return files;
}

function check(path) {
  return new Promise((resolveResult) => {
    const child = spawn(process.execPath, ['--check', path], { stdio: 'inherit' });
    child.on('close', (code) => resolveResult(code ?? 1));
    child.on('error', () => resolveResult(1));
  });
}

const files = (await Promise.all(roots.map((root) => collect(resolve(root))))).flat().sort();
let failures = 0;
for (const file of files) failures += await check(file);

if (failures) {
  console.error(`syntax check failed: ${failures} file(s)`);
  process.exitCode = 1;
} else {
  console.log(`syntax check passed: ${files.length} JavaScript file(s)`);
}
