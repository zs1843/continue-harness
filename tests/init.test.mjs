import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import { applyInitialization, planInitialization } from '../packages/core/src/index.mjs';

async function fixture() {
  const root = await mkdtemp(resolve(tmpdir(), 'continue-harness-init-'));
  const templateRoot = resolve(root, 'source');
  const cwd = resolve(root, 'target');
  await mkdir(templateRoot, { recursive: true });
  await mkdir(cwd, { recursive: true });
  await writeFile(resolve(templateRoot, 'one.txt'), 'one\n');
  await writeFile(resolve(templateRoot, 'two.txt'), 'two\n');
  return { cwd, root, templateRoot };
}

const files = [
  ['one.txt', 'one.txt'],
  ['two.txt', 'nested/two.txt'],
];

test('plans and applies initialization only after full preflight', async () => {
  const { cwd, templateRoot } = await fixture();
  const plan = await planInitialization({ cwd, files, templateRoot });
  assert.equal(plan.status, 'ready');
  assert.deepEqual(
    plan.entries.map(({ status, target }) => ({ status, target })),
    [
      { status: 'create', target: 'one.txt' },
      { status: 'create', target: 'nested/two.txt' },
    ],
  );
  await applyInitialization({ cwd, files, plan, templateRoot });
  assert.equal(await readFile(resolve(cwd, 'nested/two.txt'), 'utf8'), 'two\n');
});

test('project-owned files do not block new initialization files', async () => {
  const { cwd, templateRoot } = await fixture();
  await mkdir(resolve(cwd, 'nested'), { recursive: true });
  await writeFile(resolve(cwd, 'nested/two.txt'), 'project-owned\n');
  const plan = await planInitialization({ cwd, files, templateRoot });
  assert.equal(plan.status, 'ready');
  assert.equal(plan.entries[1].status, 'project_owned_modified');
  await applyInitialization({ cwd, files, plan, templateRoot });
  assert.equal(await readFile(resolve(cwd, 'one.txt'), 'utf8'), 'one\n');
  assert.equal(await readFile(resolve(cwd, 'nested/two.txt'), 'utf8'), 'project-owned\n');
});

test('identical target files make initialization idempotent', async () => {
  const { cwd, templateRoot } = await fixture();
  await writeFile(resolve(cwd, 'one.txt'), 'one\n');
  const plan = await planInitialization({ cwd, files, templateRoot });
  assert.equal(plan.status, 'ready');
  assert.equal(plan.entries[0].status, 'managed_unchanged');
});
