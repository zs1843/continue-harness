import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import {
  analyzeInputs,
  inspectDesignTokens,
  inspectInputs,
  resolveVerifySteps,
  runVerification,
} from '../packages/core/src/index.mjs';

test('input manifest tracks PRD RP UI API and assets with hashes', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-inputs-'));
  await mkdir(resolve(cwd, '.continue-harness/inputs/rp'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/rp/flow.html'), '<html>流程</html>\n');
  await writeFile(
    resolve(cwd, '.continue-harness/inputs/manifest.yaml'),
    'inputs:\n  - id: RP-001\n    type: rp\n    path: .continue-harness/inputs/rp/flow.html\n    version: "1.0"\n    status: active\n',
  );
  const inspection = await inspectInputs(cwd);
  assert.equal(inspection.status, 'passed');
  assert.equal(inspection.inputs[0].display_type, '低保真原型输入');
  assert.match(inspection.inputs[0].sha256, /^[a-f0-9]{64}$/);
});

test('input analysis extracts facts and reports PRD UI conflicts', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-input-analysis-'));
  await mkdir(resolve(cwd, '.continue-harness/inputs/prd'), { recursive: true });
  await mkdir(resolve(cwd, '.continue-harness/inputs/ui'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/order.md'), '金额规则: 企业支付\n');
  await writeFile(resolve(cwd, '.continue-harness/inputs/ui/order.md'), '金额规则: 个人支付\n颜色: #0052D9\n');
  await writeFile(
    resolve(cwd, '.continue-harness/inputs/manifest.yaml'),
    [
      'inputs:',
      '  - id: PRD-001',
      '    type: prd',
      '    path: .continue-harness/inputs/prd/order.md',
      '    version: "1.0"',
      '    status: active',
      '  - id: UI-001',
      '    type: ui',
      '    path: .continue-harness/inputs/ui/order.md',
      '    version: "1.0"',
      '    status: active',
      '',
    ].join('\n'),
  );
  const analysis = await analyzeInputs(cwd);
  assert.equal(analysis.status, 'failed');
  assert.ok(analysis.facts.some((fact) => fact.dimension === 'visual:color'));
  assert.ok(analysis.issues.some((issue) => issue.code === 'INPUT_FACT_CONFLICT'));
});

test('design token inspection reports pending extraction for empty tokens', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-tokens-'));
  await mkdir(resolve(cwd, 'docs/design'), { recursive: true });
  await writeFile(
    resolve(cwd, 'docs/design/tokens.json'),
    JSON.stringify({ sources: [], status: 'pending_extraction', tokens: {}, updated_at: '2026-08-04', version: '1.0' }),
  );
  const inspection = await inspectDesignTokens(cwd, { facts: { design_tokens: 'docs/design/tokens.json' } });
  assert.equal(inspection.status, 'needs_confirmation');
  assert.equal(inspection.source, 'docs/design/tokens.json');
  assert.ok(inspection.issues.some((issue) => issue.code === 'DESIGN_TOKEN_PENDING_EXTRACTION'));
});

test('design token inspection passes with extracted token values', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-extracted-tokens-'));
  await mkdir(resolve(cwd, 'docs/design'), { recursive: true });
  await writeFile(
    resolve(cwd, 'docs/design/tokens.json'),
    JSON.stringify({
      sources: [{ id: 'UI-001', path: '.continue-harness/inputs/ui/home.fig', type: 'ui' }],
      tokens: {
        color: {
          brand_primary: {
            confidence: 'confirmed',
            source: '高保真 UI',
            source_input_id: 'UI-001',
            source_path: '.continue-harness/inputs/ui/home.fig',
            value: '#0052D9',
          },
        },
      },
      updated_at: '2026-08-04',
      version: '1.0',
    }),
  );
  const inspection = await inspectDesignTokens(cwd, { facts: { design_tokens: 'docs/design/tokens.json' } });
  assert.equal(inspection.status, 'passed');
  assert.equal(inspection.source, 'docs/design/tokens.json');
});

test('not configured visual verification is not reported as passed', async () => {
  const definition = resolveVerifySteps(
    {
      commands: {},
      verify: {
        visual: { commands: [], status: 'not_configured' },
      },
    },
    'visual',
  );
  const result = await runVerification({ cwd: process.cwd(), mode: 'visual', ...definition });
  assert.equal(result.status, 'not_configured');
  assert.equal(result.results.length, 0);
});

test('visual missing baseline output is normalized to not configured', async () => {
  const result = await runVerification({
    cwd: await mkdtemp(resolve(tmpdir(), 'continue-harness-verify-')),
    failFast: true,
    mode: 'visual',
    steps: [
      {
        command: 'node -e "console.error(\\"Missing snapshot home-390.png\\"); process.exit(1)"',
        name: 'visual',
      },
    ],
  });
  assert.equal(result.status, 'not_configured');
  assert.equal(result.results[0].display_name, undefined);
});

test('listen permission failures are reported as environment blocks', async () => {
  const result = await runVerification({
    cwd: await mkdtemp(resolve(tmpdir(), 'continue-harness-verify-')),
    failFast: true,
    mode: 'runtime',
    steps: [
      {
        command: 'node -e "console.error(\\"Error: listen EPERM: operation not permitted 127.0.0.1:4173\\"); process.exit(1)"',
        name: 'runtime',
      },
    ],
  });
  assert.equal(result.status, 'failed');
  assert.equal(result.results[0].status, 'blocked');
  assert.match(result.results[0].summary, /工具链/);
});

test('successful commands are not blocked by diagnostic text in their output', async () => {
  const report = await runVerification({
    cwd: await mkdtemp(resolve(tmpdir(), 'continue-harness-verify-')),
    failFast: true,
    mode: 'audit',
    steps: [{ command: `${process.execPath} -e "console.log('Error: listen EPERM: operation not permitted')"`, name: 'test' }],
  });
  assert.equal(report.status, 'passed');
  assert.equal(report.results[0].status, 'passed');
});
