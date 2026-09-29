import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import { inspectUiContract } from '../packages/core/src/index.mjs';

test('UI Contract reports missing adoption files without affecting non-consumer projects', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-ui-contract-'));
  const inspection = await inspectUiContract(cwd, { project: { product_type: 'developer_tooling' } });
  assert.equal(inspection.enabled, false);
  assert.deepEqual(inspection.issues, []);
});

test('UI Contract detects pending adoption and duplicate Token sources', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-ui-contract-consumer-'));
  await mkdir(resolve(cwd, 'docs/design'), { recursive: true });
  await mkdir(resolve(cwd, 'docs/ui-contract-evidence'), { recursive: true });
  await writeFile(resolve(cwd, 'docs/UI-CONTRACT-ADOPTION.md'), '- `pending`\n');
  await writeFile(resolve(cwd, 'docs/UI-COMPONENT-INVENTORY.md'), '待扫描\n');
  await writeFile(resolve(cwd, 'docs/UI-COMPONENT-BOUNDARIES.md'), '# boundaries\n');
  await writeFile(resolve(cwd, 'docs/ui-contract-evidence/README.md'), '# evidence\n');
  const token = JSON.stringify({ status: 'pending', tokens: {} });
  await writeFile(resolve(cwd, 'docs/design/tokens.json'), token);
  await writeFile(resolve(cwd, 'docs/design-tokens.json'), token);
  const inspection = await inspectUiContract(cwd, { project: { product_type: 'consumer_h5' } });
  const codes = inspection.issues.map((item) => item.code);
  assert.ok(codes.includes('UI_COMPONENT_INVENTORY'));
  assert.ok(codes.includes('UI_CONTRACT_ADOPTION'));
  assert.ok(codes.includes('UI_TOKEN_DUPLICATE'));
});
