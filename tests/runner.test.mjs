import assert from 'node:assert/strict';
import test from 'node:test';

import { runVerification } from '../packages/core/src/index.mjs';

test('audit mode continues after a failed command', async () => {
  const result = await runVerification({
    cwd: process.cwd(),
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
    cwd: process.cwd(),
    failFast: true,
    mode: 'quick',
    steps: [
      { command: 'node -e "process.exit(1)"', name: 'failed' },
      { command: 'node -e "process.exit(0)"', name: 'skipped' },
    ],
  });
  assert.equal(result.results.length, 1);
});
