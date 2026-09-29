import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const cli = resolve(process.cwd(), 'packages/cli/bin/continue-harness.mjs');

test('task create continues numbering from legacy inputs and history records', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-task-id-'));
  await mkdir(resolve(cwd, '.continue-harness/inputs/prd'), { recursive: true });
  await mkdir(resolve(cwd, 'docs/history'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/T001.md'), '# legacy task\n');
  await writeFile(resolve(cwd, 'docs/history/PRD_HISTORY.md'), '# PRD History\n\n| T003 | existing |\n');

  const first = spawnSync(process.execPath, [cli, 'task', 'create', '--title', 'first', '--json'], { cwd, encoding: 'utf8' });
  assert.equal(first.status, 0, first.stderr);
  assert.equal(JSON.parse(first.stdout).id, 'T004');

  const second = spawnSync(process.execPath, [cli, 'task', 'create', '--title', 'second', '--json'], { cwd, encoding: 'utf8' });
  assert.equal(second.status, 0, second.stderr);
  assert.equal(JSON.parse(second.stdout).id, 'T005');
});
