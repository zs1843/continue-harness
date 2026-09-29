import { access, readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';

import { inspectInputs, inspectTaskMetadata } from './inputs.mjs';
import { inspectTaskHistory } from './history.mjs';

const execFileAsync = promisify(execFile);

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function git(cwd, args) {
  try {
    const { stdout } = await execFileAsync('git', args, { cwd, maxBuffer: 200_000 });
    return stdout.trim();
  } catch {
    return '';
  }
}

async function readCoverage(cwd) {
  const path = resolve(cwd, 'docs/IMPLEMENTATION_COVERAGE.md');
  if (!(await exists(path))) return { exists: false, total: 0, statuses: {}, unresolved: 0 };
  const lines = (await readFile(path, 'utf8')).split(/\r?\n/).filter((line) => line.trim().startsWith('|') && !line.includes('|---'));
  const rows = lines.slice(1);
  const statuses = {};
  for (const row of rows) {
    const cells = row.split('|').map((cell) => cell.trim());
    const status = cells[11] || '待确认';
    statuses[status] = (statuses[status] || 0) + 1;
  }
  const closed = new Set(['已验证', '明确延期', '外部阻塞']);
  return { exists: true, total: rows.length, statuses, unresolved: rows.filter((row) => !closed.has((row.split('|').map((cell) => cell.trim())[11] || '待确认'))).length };
}

async function readDecisionSummary(cwd) {
  const path = resolve(cwd, 'docs/DECISIONS.md');
  if (!(await exists(path))) return [];
  return (await readFile(path, 'utf8')).split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .slice(0, 12);
}

function chooseNextActions({ task, snapshots, coverage, inputs }) {
  const actions = [];
  if (!task) actions.push({ action: 'task create', reason: '尚未找到当前任务' });
  else if (!snapshots.length) actions.push({ action: `task snapshot ${task.id}`, reason: '当前任务还没有任务快照' });
  if (coverage.unresolved) actions.push({ action: 'verify feature', reason: `覆盖矩阵还有 ${coverage.unresolved} 行未收口` });
  if (inputs.status === 'needs_confirmation') actions.push({ action: 'inputs inspect', reason: '输入清单存在待确认项' });
  if (!actions.length) actions.push({ action: 'inspect', reason: '当前没有明确阻塞，先刷新项目状态' });
  return actions.slice(0, 3);
}

export async function buildResumeState(cwd, { taskId } = {}) {
  const metadata = await inspectTaskMetadata(cwd);
  const task = taskId
    ? metadata.modules.find((item) => item.id === taskId)
    : [...metadata.modules].sort((a, b) => String(b.metadata?.updated_at || '').localeCompare(String(a.metadata?.updated_at || '')))[0];
  const selectedTaskId = task?.id || taskId || null;
  const [inputs, coverage, branch, status, decisions, history] = await Promise.all([
    inspectInputs(cwd),
    readCoverage(cwd),
    git(cwd, ['branch', '--show-current']),
    git(cwd, ['status', '--short']),
    readDecisionSummary(cwd),
    selectedTaskId ? inspectTaskHistory(cwd, selectedTaskId) : Promise.resolve({ snapshots: [], status: 'not_configured', task_id: null }),
  ]);
  const state = {
    project: { branch: branch || null, dirty_files: status ? status.split(/\r?\n/).filter(Boolean) : [] },
    task: task ? { id: task.id, title: task.metadata?.title || null, status: task.metadata?.status || null, updated_at: task.metadata?.updated_at || null } : null,
    inputs: { status: inputs.status, count: inputs.inputs.length, unregistered: inputs.discovered.length },
    snapshots: history,
    coverage,
    decisions,
  };
  return { ...state, next_actions: chooseNextActions({ task, snapshots: history.snapshots, coverage, inputs }) };
}
