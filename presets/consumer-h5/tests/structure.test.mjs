import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
test('registered pages exist', async () => {
  const pages = JSON.parse(
    await readFile(new URL('../src/pages.json', import.meta.url), 'utf8'),
  );
  assert.ok(pages.pages.length);
  for (const page of pages.pages)
    await access(new URL(`../src/${page.path}.vue`, import.meta.url));
});
