import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

const repository = resolve(import.meta.dirname, '..');
const source = resolve(repository, 'presets/consumer-h5/tests/coverage-closure.mjs');

async function fixture(coverage) {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-closure-'));
  await mkdir(resolve(cwd, 'tests'));
  await mkdir(resolve(cwd, '.continue-harness/inputs'), { recursive: true });
  await mkdir(resolve(cwd, 'docs'));
  await cp(source, resolve(cwd, 'tests/coverage-closure.mjs'));
  await writeFile(resolve(cwd, '.continue-harness/inputs/manifest.yaml'), `inputs:\n  - id: PRD-T001\n    type: prd\n    status: active\n    task_id: T001\n    path: prd.md\n`);
  await writeFile(resolve(cwd, 'docs/IMPLEMENTATION_COVERAGE.md'), coverage);
  return cwd;
}

test('coverage closure rejects an active PRD with no downstream nodes', async () => {
  const cwd = await fixture('# 实现覆盖矩阵\n');
  const result = spawnSync(process.execPath, ['tests/coverage-closure.mjs'], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /T001 没有页面与流程覆盖记录/);
});

test('coverage closure accepts individually verified nodes', async () => {
  const row = '| T001 | PRD-T001/详情流程 | N002 | 二级 | 详情页 | 首页点击卡片 | 返回首页 | 展示详情 | src/pages/detail.vue | detail.spec.ts | 已验证 | | S001 |\n';
  const cwd = await fixture(`# 实现覆盖矩阵\n${row}`);
  const result = spawnSync(process.execPath, ['tests/coverage-closure.mjs'], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /需求闭包验证通过/);
});
