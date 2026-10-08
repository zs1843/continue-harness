import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';
import YAML from 'yaml';

import {
  createTaskSnapshot,
  inspectAcceptance,
  inspectInputs,
  INTAKE_QUESTIONS,
} from '../packages/core/src/index.mjs';

async function projectFixture() {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-generic-'));
  await mkdir(resolve(cwd, '.continue-harness/inputs/prd/modules/T001'), { recursive: true });
  await mkdir(resolve(cwd, 'docs'), { recursive: true });
  await mkdir(resolve(cwd, 'tmp/continue-harness'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/modules/T001/PRD.md'), '# Real requirement\n\n- Goal: verify the handoff.\n');
  await writeFile(resolve(cwd, '.continue-harness/inputs/manifest.yaml'), YAML.stringify({
    inputs: [{ id: 'PRD-T001', path: '.continue-harness/inputs/prd/modules/T001/PRD.md', type: 'prd', task_id: 'T001', status: 'active' }],
  }));
  await writeFile(resolve(cwd, 'docs/ACCEPTANCE.md'), [
    '# 验收标准',
    '',
    '| 编号 | 验收标准 | 状态 | 证据 |',
    '| --- | --- | --- | --- |',
    '| AC-001 | 可交接 | verified | report |',
    '',
  ].join('\n'));
  await writeFile(resolve(cwd, 'tmp/continue-harness/report.json'), JSON.stringify({ mode: 'audit', status: 'passed' }));
  return cwd;
}

test('generic intake asks minimum evidence by project type', () => {
  const backend = INTAKE_QUESTIONS.evidence.backend.map((item) => item.id);
  const frontend = INTAKE_QUESTIONS.evidence.frontend.map((item) => item.id);
  assert.ok(backend.includes('domain'));
  assert.ok(!backend.includes('ui'));
  assert.ok(frontend.includes('ui'));
});

test('input inspection rejects generated placeholder evidence', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-placeholder-'));
  await mkdir(resolve(cwd, '.continue-harness/inputs/prd'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/PRD.md'), '待补充产品需求。\n');
  await writeFile(resolve(cwd, '.continue-harness/inputs/manifest.yaml'), YAML.stringify({
    inputs: [{ id: 'PRD-T001', path: '.continue-harness/inputs/prd/PRD.md', type: 'prd', status: 'active' }],
  }));
  const result = await inspectInputs(cwd);
  assert.equal(result.status, 'failed');
  assert.ok(result.issues.some((issue) => issue.code === 'INPUT_PLACEHOLDER'));
});

test('acceptance inspection distinguishes verified and unresolved rows', async () => {
  const cwd = await projectFixture();
  const result = await inspectAcceptance(cwd);
  assert.equal(result.status, 'passed');
  await writeFile(resolve(cwd, 'docs/ACCEPTANCE.md'), '# 验收标准\n\n| 编号 | 状态 |\n| --- | --- |\n| AC-001 | 待验证 |\n');
  const unresolved = await inspectAcceptance(cwd);
  assert.equal(unresolved.status, 'needs_confirmation');
  assert.equal(unresolved.unresolved, 1);
});

test('snapshot excludes environment files but keeps harmless names and requires a report', async () => {
  const cwd = await projectFixture();
  await mkdir(resolve(cwd, 'app'), { recursive: true });
  await writeFile(resolve(cwd, '.env.production'), 'PASSWORD=not-snapshotted\n');
  await writeFile(resolve(cwd, 'app/payNoSecret.html'), '<html>safe filename</html>\n');
  const result = await createTaskSnapshot(cwd, { taskId: 'T001', title: 'handoff', userRequest: 'pilot' });
  const files = JSON.parse(await readFile(resolve(cwd, result.path, 'files.json'), 'utf8')).files;
  assert.ok(files.some((file) => file.path === 'app/payNoSecret.html'));
  assert.ok(!files.some((file) => file.path === '.env.production'));
});
