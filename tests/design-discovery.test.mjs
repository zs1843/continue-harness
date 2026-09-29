import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import { discoverDesignTokenCandidates, runDoctor } from '../packages/core/src/index.mjs';

test('discovers existing project visual values without modifying source styles', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-design-discovery-'));
  await mkdir(resolve(cwd, 'src/styles'), { recursive: true });
  const source = ':root { --brand-color: #0052d9; }\n.card { color: #181818; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px #0002; }\n@media (max-width: 390px) { .card { padding: 12px; } }\n';
  await writeFile(resolve(cwd, 'src/styles/theme.scss'), source);
  const discovery = await discoverDesignTokenCandidates(cwd);
  assert.equal(discovery.scannedFiles, 1);
  assert.ok(discovery.cssVariables.some((item) => item.name === '--brand-color'));
  assert.ok(discovery.candidates.some((item) => item.group === 'radius' && item.value === '12px'));
  assert.ok(discovery.candidates.some((item) => item.group === 'breakpoint' && item.value === '390px'));
});

test('doctor surfaces existing style candidates when semantic tokens remain pending', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-design-doctor-'));
  await mkdir(resolve(cwd, 'src'), { recursive: true });
  await mkdir(resolve(cwd, 'docs/design'), { recursive: true });
  await writeFile(resolve(cwd, 'src/app.css'), '.button { background: #0052d9; height: 48px; }\n');
  await writeFile(resolve(cwd, 'package.json'), '{}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n.env*\n');
  await writeFile(resolve(cwd, 'docs/design/tokens.json'), JSON.stringify({ version: '1', updated_at: '2026-08-04', status: 'pending_extraction', sources: [], tokens: {} }));
  const report = await runDoctor(cwd, { project: { product_type: 'consumer_h5' }, facts: { design_tokens: 'docs/design/tokens.json' } });
  const check = report.results.find((item) => item.code === 'DESIGN_TOKEN_EXISTING_STYLE_CANDIDATES');
  assert.equal(check.status, 'needs_confirmation');
  assert.match(check.suggestion, /tokens discover/);
});
