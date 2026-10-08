import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { inspectInputs } from './inputs.mjs';

const ACCEPTANCE_PATH = 'docs/ACCEPTANCE.md';
const TERMINAL_STATUSES = new Set(['verified', 'deferred', 'blocked', '已验证', '明确延期', '外部阻塞']);

function splitRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

export function localReference(reference) {
  const markdown = reference.match(/\]\(([^)]+)\)/);
  return (markdown ? markdown[1] : reference).replaceAll('`', '').split('#')[0].trim();
}

async function isFile(cwd, reference) {
  const path = localReference(reference);
  if (!path || /^[a-z]+:\/\//i.test(path)) return false;
  try { return (await stat(resolve(cwd, path))).isFile(); } catch { return false; }
}

export async function inspectAcceptance(cwd, { taskId } = {}) {
  let source;
  try { source = await readFile(resolve(cwd, ACCEPTANCE_PATH), 'utf8'); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { exists: false, path: ACCEPTANCE_PATH, rows: [], status: 'not_configured', unresolved: 0 };
  }
  const lines = source.split(/\r?\n/).filter((line) => line.trim().startsWith('|'));
  if (lines.length < 2) return { exists: true, path: ACCEPTANCE_PATH, rows: [], status: 'not_configured', unresolved: 0 };
  const header = splitRow(lines[0]);
  const column = (pattern) => header.findIndex((cell) => pattern.test(cell));
  const indices = {
    id: column(/^(编号|id)$/i),
    task: column(/^(任务|task|task_id)$/i),
    requirement: column(/^(需求|requirement)$/i),
    implementation: column(/^(实现项|implementation)$/i),
    criterion: column(/^(验收标准|criterion)$/i),
    status: column(/^(状态|status)$/i),
    evidence: column(/^(证据|evidence)$/i),
    reason: column(/^(原因|reason)$/i),
    owner: column(/^(确认人|owner)$/i),
    next: column(/^(后续条件|next)$/i),
  };
  const inspection = await inspectInputs(cwd);
  const rows = [];
  for (const line of lines.slice(1)) {
    const cells = splitRow(line);
    if (cells.every((cell) => /^:?-{3,}:?$/.test(cell))) continue;
    const row = Object.fromEntries(Object.entries(indices).map(([key, index]) => [key, cells[index] || '']));
    if (taskId && row.task && row.task !== taskId) continue;
    const issues = [];
    if (inspection.status !== 'passed') issues.push('input_integrity');
    for (const key of ['id', 'task', 'requirement', 'implementation', 'criterion', 'status']) {
      if (!row[key]) issues.push('missing_' + key);
    }
    if (!TERMINAL_STATUSES.has(row.status)) issues.push('unresolved_status');
    const input = inspection.inputs.find((item) => item.id === row.requirement.split('#')[0]);
    if (!input || !input.exists || input.changed || input.status !== 'active'
      || (input.task_id && input.task_id !== row.task)) issues.push('invalid_requirement');
    if (['verified', '已验证'].includes(row.status)) {
      if (!await isFile(cwd, row.implementation)) issues.push('missing_implementation');
      if (!await isFile(cwd, row.evidence)) issues.push('missing_evidence');
      if (/tmp\/continue-harness\/report\.(json|md)/.test(row.evidence)) issues.push('self_referencing_report');
    } else if (TERMINAL_STATUSES.has(row.status) && (!row.reason || !row.owner || !row.next)) {
      issues.push('missing_resolution');
    }
    rows.push({ ...row, issues });
  }
  const ids = new Set();
  for (const row of rows) {
    if (ids.has(row.id)) row.issues.push('duplicate_id');
    ids.add(row.id);
  }
  // Every active task input must appear in the acceptance ledger.
  for (const input of inspection.inputs.filter((item) => item.status === 'active'
    && ['requirements', 'prd'].includes(item.type) && (!taskId || item.task_id === taskId))) {
    if (!rows.some((row) => row.requirement.split('#')[0] === input.id)) {
      rows.push({ id: input.id, task: input.task_id || '', requirement: input.id, status: 'pending', evidence: '',
        implementation: '', issues: ['uncovered_requirement'] });
    }
  }
  const unresolved = rows.filter((row) => row.issues.length).length;
  return {
    exists: true, path: ACCEPTANCE_PATH, rows, unresolved,
    status: !rows.length ? 'not_configured' : unresolved ? 'needs_confirmation'
      : rows.some((row) => !['verified', '已验证'].includes(row.status)) ? 'closed_with_risks' : 'passed',
  };
}

export const ACCEPTANCE_TERMINAL_STATUSES = [...TERMINAL_STATUSES];
