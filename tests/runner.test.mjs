import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { runVerification } from '../packages/core/src/index.mjs';

// runVerification writes reports and command logs under cwd, so tests use a
// throwaway directory instead of the repository root.
const tempCwd = () => mkdtemp(join(tmpdir(), 'continue-harness-runner-'));

test('audit mode continues after a failed command', async () => {
  const result = await runVerification({
    cwd: await tempCwd(),
    failFast: false,
    mode: 'audit',
    steps: [
      { command: 'node -e "process.exit(1)"', name: 'failed' },
      { command: `node -e "console.log('continued')"`, name: 'continued' },
    ],
  });
  assert.equal(result.results.length, 2);
  assert.equal(result.results[0].status, 'failed');
  assert.equal(result.results[1].status, 'passed');
  assert.equal(result.status, 'failed');
});

test('quick mode stops after a failed command', async () => {
  const result = await runVerification({
    cwd: await tempCwd(),
    failFast: true,
    mode: 'quick',
    steps: [
      { command: 'node -e "process.exit(1)"', name: 'failed' },
      { command: 'node -e "process.exit(0)"', name: 'skipped' },
    ],
  });
  assert.equal(result.results.length, 1);
});
