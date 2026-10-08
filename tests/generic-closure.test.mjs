import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import YAML from 'yaml';
import { writeReport } from '../packages/core/src/report.mjs';
import { buildResumeState } from '../packages/core/src/resume.mjs';
import { evidenceDefinition, intakeEvidenceStatus } from '../packages/core/src/intake.mjs';

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
    '| 编号 | 任务 | 需求 | 实现项 | 验收标准 | 状态 | 证据 |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    '| AC-001 | T001 | PRD-T001 | implementation.txt | 可交接 | verified | evidence.txt |',
    '',
  ].join('\n'));
  await writeFile(resolve(cwd, 'implementation.txt'), 'implementation version 1');
  await writeFile(resolve(cwd, 'evidence.txt'), 'independent acceptance evidence');
  await writeReport(cwd, { mode: 'audit', status: 'passed', task_id: 'T001', results: [] });
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
  assert.ok(unresolved.unresolved >= 1);
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

test('project-specific inputs are accepted and unregistered custom files are detected', async () => {
  const cwd = await projectFixture();
  await mkdir(resolve(cwd, '.continue-harness/inputs/data_contract'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/data_contract/schema.csv'), 'id,value\n1,a');
  await writeFile(resolve(cwd, '.continue-harness/inputs/manifest.yaml'), YAML.stringify({ inputs: [{
    id: 'DATA-1', type: 'data_contract', path: '.continue-harness/inputs/data_contract/schema.csv', status: 'active',
  }] }));
  const result = await inspectInputs(cwd);
  assert.ok(!result.issues.some((item) => item.code === 'INPUT_TYPE_UNKNOWN'));
  await writeFile(resolve(cwd, '.continue-harness/inputs/data_contract/new.csv'), 'id');
  assert.ok((await inspectInputs(cwd)).discovered.some((item) => item.type === 'data_contract'));
});

test('project type suggests evidence without requiring UI, API or domain conventions', () => {
  for (const type of ['frontend', 'backend', 'client', 'data', 'infrastructure', 'mixed']) {
    assert.deepEqual(evidenceDefinition(type).filter((item) => item.required).map((item) => item.id), ['requirements']);
  }
  assert.equal(intakeEvidenceStatus({ evidence: [{ status: 'confirmed' }] }).complete, false);
  assert.equal(intakeEvidenceStatus({ evidence: [{ status: 'not_applicable' }] }).complete, false);
  assert.equal(intakeEvidenceStatus({ evidence: [{ status: 'not_applicable', note: 'No UI changes' }] }).complete, true);
});

test('verified status alone is insufficient and changed requirement hashes invalidate acceptance', async () => {
  const cwd = await projectFixture();
  await writeFile(resolve(cwd, 'docs/ACCEPTANCE.md'), '| 编号 | 状态 | 证据 |\n| --- | --- | --- |\n| A1 | verified | missing.log |\n');
  assert.equal((await inspectAcceptance(cwd)).status, 'needs_confirmation');
  const fresh = await projectFixture();
  const manifest = YAML.parse(await readFile(resolve(fresh, '.continue-harness/inputs/manifest.yaml'), 'utf8'));
  manifest.inputs[0].sha256 = 'outdated';
  await writeFile(resolve(fresh, '.continue-harness/inputs/manifest.yaml'), YAML.stringify(manifest));
  assert.ok((await inspectAcceptance(fresh)).rows[0].issues.includes('invalid_requirement'));
});

test('resume and snapshot reject unrelated or outdated verification reports', async () => {
  const cwd = await projectFixture();
  let state = await buildResumeState(cwd, { taskId: 'T001' });
  assert.equal(state.verification.applicable, true);
  state = await buildResumeState(cwd, { taskId: 'T002' });
  assert.equal(state.verification.applicable, false);
  await assert.rejects(createTaskSnapshot(cwd, { taskId: 'T002' }), /验收|不匹配/);
  await writeFile(resolve(cwd, 'implementation.txt'), 'implementation version 2');
  assert.equal((await buildResumeState(cwd, { taskId: 'T001' })).verification.applicable, false);
  await assert.rejects(createTaskSnapshot(cwd, { taskId: 'T001' }), /不匹配/);
});

test('snapshot keeps its report and context after the latest report is replaced', async () => {
  const cwd = await projectFixture();
  const result = await createTaskSnapshot(cwd, { taskId: 'T001' });
  await writeFile(resolve(cwd, 'tmp/continue-harness/report.json'), '{}');
  const saved = JSON.parse(await readFile(resolve(cwd, result.path, 'verification.json'), 'utf8'));
  assert.equal(saved.report.task_id, 'T001');
  assert.equal(saved.report.status, 'passed');
  const context = JSON.parse(await readFile(resolve(cwd, result.path, 'context.json'), 'utf8'));
  assert.equal(context.acceptance.rows[0].requirement, 'PRD-T001');
});

test('CLI binds a real verification report to the selected task and blocks missing acceptance', async () => {
  const cwd = await projectFixture();
  const repository = resolve(import.meta.dirname, '..');
  const config = YAML.parse(await readFile(resolve(repository, '.continue-harness/project.yaml'), 'utf8'));
  config.commands = { check: `${process.execPath} --version` };
  config.verify = { feature: { commands: ['check'] } };
  await writeFile(resolve(cwd, '.continue-harness/project.yaml'), YAML.stringify(config));
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/modules/T001/metadata.yaml'), 'id: T001\ntitle: Delivery\n');
  const cli = resolve(repository, 'packages/cli/bin/continue-harness.mjs');
  const result = spawnSync(process.execPath, [cli, 'verify', 'feature', '--task', 'T001', '--json'], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr + result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.task_id, 'T001');
  assert.equal(report.acceptance.status, 'passed');
  assert.equal((await buildResumeState(cwd, { taskId: 'T001' })).verification.applicable, true);
  await writeFile(resolve(cwd, 'docs/ACCEPTANCE.md'), '# No criteria yet');
  const missing = spawnSync(process.execPath, [cli, 'verify', 'feature', '--task', 'T001'], { cwd, encoding: 'utf8' });
  assert.equal(missing.status, 1, missing.stderr);
});

test('changed evidence invalidates reports and unresolved deferrals do not pass', async () => {
  const cwd = await projectFixture();
  await writeFile(resolve(cwd, 'evidence.txt'), 'different outcome');
  assert.equal((await buildResumeState(cwd, { taskId: 'T001' })).verification.applicable, false);
  await writeFile(resolve(cwd, 'docs/ACCEPTANCE.md'), [
    '| 编号 | 任务 | 需求 | 实现项 | 验收标准 | 状态 | 证据 | 原因 | 确认人 | 后续条件 |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    '| A1 | T001 | PRD-T001 | planned.py | Export matches | deferred | | upstream unavailable | owner | retry on release |',
  ].join('\n'));
  assert.equal((await inspectAcceptance(cwd)).status, 'closed_with_risks');
  const ledger = await readFile(resolve(cwd, 'docs/ACCEPTANCE.md'), 'utf8');
  await writeFile(resolve(cwd, 'docs/ACCEPTANCE.md'), ledger.replace('upstream unavailable', ''));
  assert.equal((await inspectAcceptance(cwd)).status, 'needs_confirmation');
});

test('Intake preserves confirmed choices on repeat and reopens them when toolchain changes', async () => {
  const cwd = await projectFixture();
  const cli = resolve(import.meta.dirname, '../packages/cli/bin/continue-harness.mjs');
  const run = (args) => {
    const result = spawnSync(process.execPath, [cli, 'intake', ...args, '--json'], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  };
  run(['answer', '--type', 'backend', '--toolchain', 'Python']);
  run(['evidence', '--id', 'data_contract', '--status', 'confirmed', '--source', 'docs/data.md', '--note', 'Batch input schema']);
  const repeated = run(['answer', '--type', 'backend']);
  assert.equal(repeated.evidence.find((item) => item.id === 'data_contract').status, 'confirmed');
  const changed = run(['answer', '--toolchain', 'Go']);
  assert.equal(changed.evidence.find((item) => item.id === 'data_contract').status, 'needs_confirmation');
  assert.ok(!changed.evidence.some((item) => item.id === 'ui'));
});
