import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { access, mkdir, mkdtemp, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';
import YAML from 'yaml';

import { inspectAcceptance, selectLatestTask } from '../packages/core/src/index.mjs';

const cli = resolve(import.meta.dirname, '../packages/cli/bin/continue-harness.mjs');
const run = (cwd, ...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
const exists = (path) => access(path).then(() => true, () => false);

const HEADER = [
  '| 编号 | 任务 | 需求 | 实现项 | 验收标准 | 状态 | 证据 |',
  '| --- | --- | --- | --- | --- | --- | --- |',
];

// Two tasks updated on the same day; only T001 has a verified acceptance row.
async function twoTaskProject({ rows } = {}) {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-scope-'));
  const inputs = [];
  for (const id of ['T001', 'T002']) {
    const root = resolve(cwd, '.continue-harness/inputs/prd/modules', id);
    await mkdir(root, { recursive: true });
    await writeFile(resolve(root, 'PRD.md'), `# ${id}\n\n- Goal: real requirement for ${id}.\n`);
    await writeFile(resolve(root, 'metadata.yaml'), YAML.stringify({ id, title: id, status: '草稿', updated_at: '2026-10-20' }));
    inputs.push({ id: `PRD-${id}`, path: `.continue-harness/inputs/prd/modules/${id}/PRD.md`, type: 'prd', task_id: id, status: 'active' });
  }
  await writeFile(resolve(cwd, '.continue-harness/inputs/manifest.yaml'), YAML.stringify({ inputs }));
  await writeFile(resolve(cwd, '.continue-harness/project.yaml'), YAML.stringify({
    harness: { package: '@company/continue-harness', version: '0.1.0' },
    project: { name: 'scope' },
    commands: { check: `${JSON.stringify(process.execPath)} --version` },
    verify: { quick: { commands: ['check'] }, feature: { commands: ['check'] }, audit: { fail_fast: false, commands: ['check'] } },
  }));
  await mkdir(resolve(cwd, 'docs'), { recursive: true });
  await writeFile(resolve(cwd, 'implementation.txt'), 'implementation');
  await writeFile(resolve(cwd, 'evidence.txt'), 'evidence');
  if (rows !== null) {
    await writeFile(resolve(cwd, 'docs/ACCEPTANCE.md'), [...HEADER, ...(rows || [
      '| AC-001 | T001 | PRD-T001 | implementation.txt | works | verified | evidence.txt |',
      '| AC-002 | T002 | PRD-T002 | implementation.txt | works | pending | |',
    ]), ''].join('\n'));
  }
  return cwd;
}

test('audit without --task covers every task and cannot pass while another task is open', async () => {
  const cwd = await twoTaskProject();
  const audit = run(cwd, 'verify', 'audit', '--json');
  assert.equal(audit.status, 1);
  const report = JSON.parse(audit.stdout);
  assert.equal(report.task_id, null);
  assert.equal(report.status, 'failed');
  assert.deepEqual(report.acceptance.rows.map((row) => row.id).sort(), ['AC-001', 'AC-002']);
  assert.ok(report.context.inputs.some((item) => item.id === 'PRD-T002'));
  assert.match(run(cwd, 'verify', 'audit').stdout, /audit \[全项目\]: failed/);

  const scoped = run(cwd, 'verify', 'audit', '--task', 'T001', '--json');
  assert.equal(scoped.status, 0, scoped.stdout);
  assert.equal(JSON.parse(scoped.stdout).task_id, 'T001');
});

test('project-wide audit fails when tasks exist but no acceptance ledger does', async () => {
  const cwd = await twoTaskProject({ rows: null });
  const audit = run(cwd, 'verify', 'audit', '--json');
  assert.equal(audit.status, 1);
  assert.ok(JSON.parse(audit.stdout).results.some((item) => item.name === 'acceptance' && item.status === 'failed'));
});

test('default task selection breaks same-day ties by the higher task number', async () => {
  assert.equal(selectLatestTask([
    { id: 'T002', metadata: { updated_at: '2026-10-20' } },
    { id: 'T010', metadata: { updated_at: '2026-10-20' } },
    { id: 'T001', metadata: { updated_at: '2026-10-21' } },
  ]).id, 'T001');
  assert.equal(selectLatestTask([
    { id: 'T002', metadata: { updated_at: '2026-10-20' } },
    { id: 'T010', metadata: { updated_at: '2026-10-20' } },
  ]).id, 'T010');
  const cwd = await twoTaskProject();
  const quick = run(cwd, 'verify', 'quick', '--json');
  assert.equal(JSON.parse(quick.stdout).task_id, 'T002');
});

test('implementation and evidence outside the project cannot verify an acceptance row', async () => {
  const outside = await mkdtemp(resolve(tmpdir(), 'continue-harness-outside-'));
  await writeFile(resolve(outside, 'evidence.txt'), 'foreign evidence');
  const cwd = await twoTaskProject({ rows: [
    `| AC-001 | T001 | PRD-T001 | ${resolve(outside, 'evidence.txt')} | works | verified | ../${resolve(outside).split('/').pop()}/evidence.txt |`,
    '| AC-002 | T002 | PRD-T002 | implementation.txt | works | verified | linked.txt |',
  ] });
  await symlink(resolve(outside, 'evidence.txt'), resolve(cwd, 'linked.txt'));
  const acceptance = await inspectAcceptance(cwd);
  const issues = Object.fromEntries(acceptance.rows.map((row) => [row.id, row.issues]));
  assert.ok(issues['AC-001'].includes('outside_project_implementation'));
  assert.ok(issues['AC-001'].includes('outside_project_evidence'));
  assert.ok(issues['AC-002'].includes('outside_project_evidence'));
  assert.equal(acceptance.status, 'needs_confirmation');
  const feature = run(cwd, 'verify', 'feature', '--task', 'T001', '--json');
  assert.equal(feature.status, 1);
  const report = JSON.parse(feature.stdout);
  assert.equal(Object.values(report.context.implementations)[0], null);
});

test('a value flag never consumes the next flag', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-options-'));
  const result = run(cwd, 'task', 'create', '--title', '--json');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--title 需要提供值/);
  assert.equal(await exists(resolve(cwd, '.continue-harness/inputs/prd/modules/T001')), false);
  assert.equal(run(cwd, 'task', 'create', '--title').status, 1);
});

test('intake inspect is read-only while answer still creates the Intake record', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-intake-'));
  const path = resolve(cwd, '.continue-harness/intake.yaml');
  const inspect = run(cwd, 'intake', 'inspect', '--json');
  assert.equal(inspect.status, 0, inspect.stderr);
  const payload = JSON.parse(inspect.stdout);
  assert.equal(payload.exists, false);
  assert.ok(payload.next_questions.length > 0);
  assert.equal(await exists(path), false);
  assert.equal(run(cwd, 'intake', 'unknown').status, 1);
  assert.equal(run(cwd, 'intake', 'answer', '--goal', 'ship', '--json').status, 0);
  assert.equal(await exists(path), true);
});
