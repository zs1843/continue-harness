import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('registers a real page component', async () => {
  const pages = JSON.parse(await readFile(new URL('../src/pages.json', import.meta.url), 'utf8'));
  assert.equal(pages.pages.length, 1);
  await access(new URL(`../src/${pages.pages[0].path}.vue`, import.meta.url));
});
