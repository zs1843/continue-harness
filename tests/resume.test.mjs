import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import { buildResumeState } from '../packages/core/src/index.mjs';

test('resume builds a handoff state with the current task and next action', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-resume-'));
  await mkdir(resolve(cwd, '.continue-harness/inputs/prd/modules/T002'), { recursive: true });
  await mkdir(resolve(cwd, '.continue-harness/inputs'), { recursive: true });
  await mkdir(resolve(cwd, 'docs'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/modules/T002/metadata.yaml'), 'id: T002\ntitle: 详情流程\nstatus: 草稿\nupdated_at: 2026-09-29\n');
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/modules/T002/PRD.md'), '# 详情流程\n');
  await writeFile(resolve(cwd, '.continue-harness/inputs/manifest.yaml'), 'inputs: []\n');
  await writeFile(resolve(cwd, 'docs/IMPLEMENTATION_COVERAGE.md'), '| 任务编号 | 输入编号与章节 | 节点编号 | 层级 | 页面/弹窗/状态 | 入口与触发操作 | 目标与返回路径 | 验收点 | 实现文件 | 测试/基线 | 收口状态 | 延期/阻塞依据 | 最近快照 |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| T002 | PRD-T002 | N001 | 一级 | 详情 | 点击 | 返回 | 展示 | page.vue | test | 待实现 | | |\n');
  const state = await buildResumeState(cwd);
  assert.equal(state.task.id, 'T002');
  assert.equal(state.coverage.unresolved, 1);
  assert.ok(!state.next_actions.some((item) => item.action === 'task snapshot T002'));
  assert.ok(state.next_actions.some((item) => item.action === 'verify feature'));
});
