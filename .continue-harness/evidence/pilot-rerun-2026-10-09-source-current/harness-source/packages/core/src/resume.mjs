import { access, readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';

import { inspectInputs, inspectTaskMetadata } from './inputs.mjs';
import { inspectTaskHistory } from './history.mjs';
import { inspectAcceptance } from './acceptance.mjs';
import { inspectIntake } from './intake.mjs';
import { verificationContext, readProjectDocuments } from './verification-context.mjs';

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

async function readRecentLogs(cwd) {
  const path = '.continue-harness/logs/commands.ndjson';
  try {
    const lines = (await readFile(resolve(cwd, path), 'utf8')).trim().split(/\r?\n/).slice(-10);
    const entries = lines.map((line) => {
      try {
        const item = JSON.parse(line);
        return { timestamp: item.timestamp, kind: item.kind, action: item.action,
          command: item.command, status: item.status, exitCode: item.exitCode };
      } catch { return { status: 'invalid_log_entry' }; }
    });
    return { path, entries };
  } catch { return { path, entries: [] }; }
}

async function readVerificationSummary(cwd, taskId) {
  const path = resolve(cwd, 'tmp/continue-harness/report.json');
  if (!(await exists(path))) return null;
  try {
    const report = JSON.parse(await readFile(path, 'utf8'));
    const context = await verificationContext(cwd, taskId);
    // A report whose scope moved while the commands ran is not a valid binding, even if the
    // recomputed fingerprint happens to match the post-change state.
    const valid = Boolean(taskId && report.task_id === taskId
      && report.context?.fingerprint === context.fingerprint
      && report.context?.changed_during_verification !== true);
    return { path: 'tmp/continue-harness/report.json', task_id: report.task_id || null,
      mode: report.mode || null, status: valid ? report.status : 'needs_confirmation',
      recorded_status: report.status, applicable: valid, generatedAt: report.generatedAt || null };
  } catch {
    return { mode: null, status: 'invalid' };
  }
}

function chooseNextActions({ task, snapshots, coverage, inputs, intake, acceptance, verification }) {
  const actions = [];
  if (['awaiting_answers', 'awaiting_evidence'].includes(intake?.status)) actions.push({ action: 'intake inspect', reason: '项目事实或输入证据尚未确认' });
  if (!task) actions.push({ action: 'task create', reason: '尚未找到当前任务' });
  else if (!snapshots.length && inputs.status === 'passed' && acceptance?.status === 'passed'
    && verification?.status === 'passed' && verification.applicable) {
    actions.push({ action: `task snapshot ${task.id}`, reason: '当前任务还没有任务快照' });
  }
  if (coverage.unresolved) actions.push({ action: 'verify feature', reason: `覆盖矩阵还有 ${coverage.unresolved} 行未收口` });
  if (task && acceptance?.status === 'not_configured') actions.push({ action: 'define acceptance', reason: '当前任务尚未配置验收关联' });
  if (inputs.status !== 'passed') actions.push({ action: 'inputs inspect', reason: '输入清单存在未收口项' });
  if (acceptance?.status === 'needs_confirmation') actions.push({ action: 'verify feature', reason: '验收标准存在未收口项' });
  if (acceptance?.status === 'closed_with_risks') actions.push({ action: 'verify feature', reason: '验收已记录延期或外部阻塞，不能宣称完成' });
  if (verification?.status && verification.status !== 'passed') actions.push({ action: 'verify audit', reason: `最近一次 ${verification.mode || '验证'} 未通过` });
  if (!actions.length) actions.push({ action: 'inspect', reason: '当前没有明确阻塞，先刷新项目状态' });
  return actions.slice(0, 3);
}

export async function buildResumeState(cwd, { taskId } = {}) {
  const metadata = await inspectTaskMetadata(cwd);
  const task = taskId
    ? metadata.modules.find((item) => item.id === taskId)
    : [...metadata.modules].sort((a, b) => String(b.metadata?.updated_at || '').localeCompare(String(a.metadata?.updated_at || '')))[0];
  const selectedTaskId = task?.id || taskId || null;
  const [inputs, coverage, branch, status, decisions, history, intake, acceptance, verification] = await Promise.all([
    inspectInputs(cwd),
    readCoverage(cwd),
    git(cwd, ['branch', '--show-current']),
    git(cwd, ['status', '--short']),
    readDecisionSummary(cwd),
    selectedTaskId ? inspectTaskHistory(cwd, selectedTaskId) : Promise.resolve({ snapshots: [], status: 'not_configured', task_id: null }),
    inspectIntake(cwd),
    inspectAcceptance(cwd, { taskId: selectedTaskId }),
    readVerificationSummary(cwd, selectedTaskId),
  ]);
  const state = {
    project: { branch: branch || null, dirty_files: status ? status.split(/\r?\n/).filter(Boolean) : [] },
    task: task ? { id: task.id, title: task.metadata?.title || null, status: task.metadata?.status || null, updated_at: task.metadata?.updated_at || null } : null,
    inputs: { status: inputs.status, count: inputs.inputs.length, unregistered: inputs.discovered.length,
      manifest: inputs.manifest, entries: inputs.inputs.filter((item) => item.status === 'active'), issues: inputs.issues },
    project_context: { facts: intake.project || {}, intake_path: intake.path,
      documents: await readProjectDocuments(cwd),
      tasks: metadata.modules.map((item) => ({ id: item.id, ...item.metadata })),
      logs: await readRecentLogs(cwd) },
    intake: { status: intake.status || 'not_initialized', phase: intake.phase || null, unresolved: (intake.questions || []).length },
    acceptance,
    verification,
    snapshots: history,
    coverage,
    decisions,
  };
  return { ...state, next_actions: chooseNextActions({ task, snapshots: history.snapshots, coverage, inputs, intake, acceptance, verification }) };
}
