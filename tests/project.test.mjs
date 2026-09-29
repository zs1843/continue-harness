import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const repository = resolve(import.meta.dirname, '..');
const cli = resolve(repository, 'packages/cli/bin/continue-harness.mjs');

test('creates a consumer-h5 project with one default workflow skill', async () => {
  const parent = await mkdtemp(resolve(tmpdir(), 'continue-harness-create-'));
  const result = spawnSync(process.execPath, [cli, 'create', 'pilot-h5', '--skip-install'], {
    cwd: parent,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /项目容器已准备好/);
  assert.match(result.stdout, /\.continue-harness\/inputs\/prd/);
  assert.match(result.stdout, /不要在项目创建前阻塞等待这些文件/);
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
  assert.match(
    await readFile(resolve(project, '.agents/skills/consumer-h5-harness/SKILL.md'), 'utf8'),
    /页面与模块生成规则/,
  );
  assert.match(
    await readFile(resolve(project, '.agents/skills/consumer-h5-harness/SKILL.md'), 'utf8'),
    /最近一次列表中的对应操作/,
  );
  await assert.rejects(readFile(resolve(project, '.agents/skills/continue-harness-create/SKILL.md')), /ENOENT/);
  assert.match(await readFile(resolve(project, 'CLAUDE.md'), 'utf8'), /@AGENTS\.md/);
  assert.match(
    await readFile(resolve(project, '.cursor/rules/continue-harness.mdc'), 'utf8'),
    /alwaysApply: true/,
  );
  assert.match(
    await readFile(resolve(project, '.claude/skills/consumer-h5-harness/SKILL.md'), 'utf8'),
    /Consumer H5 Harness/,
  );
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

test('development CLI prefers repository resources over stale prepack staging', () => {
  const source = spawnSync(process.execPath, [cli, 'help', 'create'], {
    cwd: repository,
    encoding: 'utf8',
  });
  assert.equal(source.status, 0, source.stderr);
  assert.match(source.stdout, /不要求提前提供 PRD\/RP\/UI/);
});
