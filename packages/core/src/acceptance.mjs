import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ACCEPTANCE_PATH = 'docs/ACCEPTANCE.md';
const TERMINAL_STATUSES = new Set(['verified', 'deferred', 'blocked', '已验证', '明确延期', '外部阻塞']);

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function splitRow(line) {
  return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

export async function inspectAcceptance(cwd) {
  const path = resolve(cwd, ACCEPTANCE_PATH);
  if (!(await exists(path))) {
    return { exists: false, path: ACCEPTANCE_PATH, rows: [], status: 'not_configured', unresolved: 0 };
  }
  const source = await readFile(path, 'utf8');
  const lines = source.split(/\r?\n/).filter((line) => line.trim().startsWith('|'));
  if (lines.length < 2) {
    return { exists: true, path: ACCEPTANCE_PATH, rows: [], status: 'not_configured', unresolved: 0 };
  }
  const header = splitRow(lines[0]);
  const statusIndex = header.findIndex((cell) => /^(状态|status)$/i.test(cell));
  if (statusIndex < 0) {
    return { exists: true, path: ACCEPTANCE_PATH, rows: [], status: 'needs_confirmation', unresolved: 0, issue: '验收表缺少状态列' };
  }
  const rows = lines.slice(1)
    .filter((line) => !/^\|?\s*:?-{3,}/.test(line.replace(/\|/g, '').trim()))
    .map((line) => {
      const cells = splitRow(line);
      const status = cells[statusIndex] || '';
      return { id: cells[0] || 'unknown', status, evidence: cells[statusIndex + 1] || '' };
    });
  const unresolved = rows.filter((row) => !TERMINAL_STATUSES.has(row.status));
  if (unresolved.length) {
    return { exists: true, path: ACCEPTANCE_PATH, rows, status: 'needs_confirmation', unresolved: unresolved.length };
  }
  const hasNonVerified = rows.some((row) => !['verified', '已验证'].includes(row.status));
  return {
    exists: true,
    path: ACCEPTANCE_PATH,
    rows,
    status: hasNonVerified ? 'closed_with_risks' : 'passed',
    unresolved: 0,
  };
}

export const ACCEPTANCE_TERMINAL_STATUSES = [...TERMINAL_STATUSES];
