import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import YAML from 'yaml';

const repository = resolve(import.meta.dirname, '..');
const cli = resolve(repository, 'packages/cli/bin/continue-harness.mjs');

test('creates a consumer-h5 project through an explicit preset', async () => {
  const parent = await mkdtemp(resolve(tmpdir(), 'continue-harness-create-'));
  const result = spawnSync(process.execPath, [cli, 'create', 'pilot-h5', '--preset', 'consumer-h5', '--skip-install'], {
    cwd: parent,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /项目约束容器已准备好/);
  assert.match(result.stdout, /continue-harness intake inspect --json/);
  assert.match(result.stdout, /continue-harness inputs inspect --json/);
  const project = resolve(parent, 'pilot-h5');
  assert.match(await readFile(resolve(project, 'package.json'), 'utf8'), /"name": "pilot-h5"/);
  assert.match(await readFile(resolve(project, 'src/pages/index/index.vue'), 'utf8'), /pilot-h5/);
  assert.match(
    await readFile(resolve(project, 'AGENTS.md'), 'utf8'),
    /不得把多个独立页面堆进一个 `\.vue` 文件/,
  );
  assert.match(
    await readFile(resolve(project, 'docs/PROJECT_MAP.md'), 'utf8'),
    /列表页、详情页、表单页、结果页、异常页和设置页默认拆成独立页面/,
  );
  assert.match(
    await readFile(resolve(project, 'src/utils/README.md'), 'utf8'),
    /跨页面、跨组件复用的纯函数和轻量工具/,
  );
  assert.match(
    await readFile(resolve(project, 'AGENTS.md'), 'utf8'),
    /必须收敛到 `src\/utils\/`/,
  );
  assert.match(
    await readFile(resolve(project, 'AGENTS.md'), 'utf8'),
    /用户只回复单个编号时.*立即执行/,
  );
  assert.match(
    await readFile(resolve(project, 'docs/design/tokens.json'), 'utf8'),
    /"status": "pending_extraction"/,
  );
  assert.match(
    await readFile(resolve(project, 'docs/design/TOKENS.md'), 'utf8'),
    /后补 UI 时，必须更新 JSON/,
  );
  await assert.rejects(readFile(resolve(project, '.agents/skills/generic-harness/SKILL.md')), /ENOENT/);
  await assert.rejects(readFile(resolve(project, '.agents/skills/continue-harness-create/SKILL.md')), /ENOENT/);
  assert.match(await readFile(resolve(project, 'CLAUDE.md'), 'utf8'), /@AGENTS\.md/);
  assert.match(
    await readFile(resolve(project, '.cursor/rules/continue-harness.mdc'), 'utf8'),
    /alwaysApply: true/,
  );
  await assert.rejects(readFile(resolve(project, '.claude/skills/generic-harness/SKILL.md')), /ENOENT/);
  assert.match(await readFile(resolve(project, 'src/services/http.ts'), 'utf8'), /export function request/);
  assert.match(await readFile(resolve(project, '.continue-harness/api/selection.yaml'), 'utf8'), /tasks: \{\}/);
  await assert.rejects(readFile(resolve(project, '.agents/skills/continue-harness-api/SKILL.md')), /ENOENT/);
  assert.match(await readFile(resolve(project, '.eslintrc.cjs'), 'utf8'), /vue-eslint-parser/);
  assert.match(await readFile(resolve(project, 'package.json'), 'utf8'), /"test:coverage"/);
  assert.match(await readFile(resolve(project, 'tests/coverage-closure.mjs'), 'utf8'), /尚未收口/);
  assert.match(await readFile(resolve(project, '.continue-harness/project.yaml'), 'utf8'), /coverage_closure/);
});

test('create dry-run returns a structured plan without writing', async () => {
  const parent = await mkdtemp(resolve(tmpdir(), 'continue-harness-plan-'));
  const result = spawnSync(process.execPath, [cli, 'create', 'planned-h5', '--dry-run'], {
    cwd: parent,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  const plan = JSON.parse(result.stdout);
  assert.equal(plan.action, 'create');
  assert.equal(plan.status, 'ready');
  assert.ok(plan.entries.some((entry) => entry.target === 'AGENTS.md'));
  await assert.rejects(readFile(resolve(parent, 'planned-h5/package.json')), /ENOENT/);
});

test('creates a generic constraint-only project by default', async () => {
  const parent = await mkdtemp(resolve(tmpdir(), 'continue-harness-generic-'));
  const result = spawnSync(process.execPath, [cli, 'create', 'generic-project', '--skip-install'], {
    cwd: parent,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  const project = resolve(parent, 'generic-project');
  assert.match(await readFile(resolve(project, '.continue-harness/project.yaml'), 'utf8'), /mode: generic/);
  assert.match(await readFile(resolve(project, 'AGENTS.md'), 'utf8'), /不得猜测或生成框架模板/);
  assert.match(await readFile(resolve(project, '.continue-harness/intake.yaml'), 'utf8'), /phase: basic_info/);
  await assert.rejects(readFile(resolve(project, 'docs/CONSTRAINTS.md')), /ENOENT/);
  await assert.rejects(readFile(resolve(project, 'docs/CHANGELOG.md')), /ENOENT/);
  await assert.rejects(readFile(resolve(project, 'docs/PROJECT_MAP.md')), /ENOENT/);
  assert.match(await readFile(resolve(project, 'docs/ACCEPTANCE.md'), 'utf8'), /验收标准/);
  assert.match(await readFile(resolve(project, 'docs/DECISIONS.md'), 'utf8'), /决策记录/);
  await assert.rejects(readFile(resolve(project, '.agents/skills/generic-harness/SKILL.md')), /ENOENT/);
  await assert.rejects(readFile(resolve(project, '.claude/skills/generic-harness/SKILL.md')), /ENOENT/);
  await assert.rejects(readFile(resolve(project, 'package.json')), /ENOENT/);
  await assert.rejects(readFile(resolve(project, 'src/pages/index/index.vue')), /ENOENT/);
});

test('intake moves from basic facts to type-specific evidence questions', async () => {
  const parent = await mkdtemp(resolve(tmpdir(), 'continue-harness-intake-'));
  const created = spawnSync(process.execPath, [cli, 'create', 'intake-project', '--skip-install'], {
    cwd: parent,
    encoding: 'utf8',
  });
  assert.equal(created.status, 0, created.stderr);
  const project = resolve(parent, 'intake-project');
  const initial = spawnSync(process.execPath, [cli, 'intake', 'inspect', '--json'], {
    cwd: project,
    encoding: 'utf8',
  });
  assert.equal(initial.status, 0, initial.stderr);
  assert.equal(JSON.parse(initial.stdout).phase, 'basic_info');
  // Three of four project facts are not enough to leave the project-facts phase.
  const partial = spawnSync(process.execPath, [
    cli, 'intake', 'answer', '--type', 'backend', '--goal', 'service', '--runtime', 'container', '--json',
  ], { cwd: project, encoding: 'utf8' });
  assert.equal(partial.status, 0, partial.stderr);
  const partialPayload = JSON.parse(partial.stdout);
  assert.equal(partialPayload.phase, 'basic_info');
  assert.equal(partialPayload.status, 'awaiting_answers');
  assert.deepEqual(partialPayload.questions.map((item) => item.id), ['toolchain']);
  assert.ok(partialPayload.evidence.some((item) => item.id === 'data_model'));
  const answered = spawnSync(process.execPath, [
    cli, 'intake', 'answer', '--toolchain', 'Node.js', '--json',
  ], { cwd: project, encoding: 'utf8' });
  assert.equal(answered.status, 0, answered.stderr);
  const payload = JSON.parse(answered.stdout);
  assert.equal(payload.phase, 'evidence');
  assert.equal(payload.status, 'awaiting_evidence');
  const required = ['requirements', 'domain'];
  for (const id of required) {
    const confirmed = spawnSync(process.execPath, [
      cli, 'intake', 'evidence', '--id', id, '--status', 'confirmed', '--source', `docs/${id}.md`, '--version', '1.0', '--json',
    ], { cwd: project, encoding: 'utf8' });
    assert.equal(confirmed.status, 0, confirmed.stderr);
  }
  const finalState = spawnSync(process.execPath, [cli, 'intake', 'inspect', '--json'], {
    cwd: project,
    encoding: 'utf8',
  });
  assert.equal(JSON.parse(finalState.stdout).status, 'awaiting_evidence');
  // Changing a project fact reopens evidence applicability, so the remaining items need re-confirming.
  const unresolved = JSON.parse(finalState.stdout).evidence
    .filter((item) => ['pending', 'needs_confirmation'].includes(item.status));
  assert.equal(unresolved.length, 4);
});

test('intake does not reach confirmed while every project fact is pending', async () => {
  const parent = await mkdtemp(resolve(tmpdir(), 'continue-harness-intake-pending-'));
  const created = spawnSync(process.execPath, [cli, 'create', 'pending-intake', '--skip-install'], {
    cwd: parent,
    encoding: 'utf8',
  });
  assert.equal(created.status, 0, created.stderr);
  const project = resolve(parent, 'pending-intake');
  // Satisfying the evidence question while all four project facts stay pending must not confirm.
  const confirmed = spawnSync(process.execPath, [
    cli, 'intake', 'evidence', '--id', 'requirements', '--status', 'confirmed',
    '--source', 'docs/requirements.md', '--note', '审计反例：项目事实仍为 pending', '--json',
  ], { cwd: project, encoding: 'utf8' });
  assert.equal(confirmed.status, 0, confirmed.stderr);
  const payload = JSON.parse(confirmed.stdout);
  assert.equal(payload.phase, 'basic_info');
  assert.equal(payload.status, 'awaiting_answers');
  assert.equal(payload.questions.length, 4);
  const state = YAML.parse(await readFile(resolve(project, '.continue-harness/intake.yaml'), 'utf8'));
  assert.equal(state.status, 'awaiting_answers');
  assert.deepEqual(Object.values(state.project).filter((value) => value === 'pending').length, 4);
});

test('development CLI prefers repository resources over stale prepack staging', () => {
  const source = spawnSync(process.execPath, [cli, 'help', 'create'], {
    cwd: repository,
    encoding: 'utf8',
  });
  assert.equal(source.status, 0, source.stderr);
  assert.match(source.stdout, /默认 preset=generic/);
});
