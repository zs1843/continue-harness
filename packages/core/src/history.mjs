import { createHash } from 'node:crypto';
import { access, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

import { inspectAcceptance } from './acceptance.mjs';
import { inspectInputs } from './inputs.mjs';
import { inspectIntake } from './intake.mjs';
import { verificationContext, readProjectDocuments } from './verification-context.mjs';

const EXCLUDED_SENSITIVE_BASENAMES = [
  /^\.env(?:\..*)?$/i,
  /^id_rsa(?:\..*)?$/i,
  /\.(?:pem|key|p12|pfx)$/i,
];

const SENSITIVE_CONTENT_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bBearer\s+[A-Za-z0-9._-]{24,}/i,
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function timestamp() {
  const now = new Date();
  const iso = now.toISOString().replace(/\.\d{3}Z$/, '+0000');
  return iso.replaceAll(':', '').replace('T', 'T');
}

async function walk(directory, root = directory) {
  if (!(await exists(directory))) return [];
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['node_modules', '.git', 'dist', 'tmp', 'playwright-report', 'test-results'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walk(path, root)));
    else if (!EXCLUDED_SENSITIVE_BASENAMES.some((pattern) => pattern.test(entry.name))) output.push(relative(root, path));
  }
  return output.sort();
}

async function fileHash(path) {
  return createHash('sha256').update(await readFile(path)).digest('hex');
}

async function containsSensitiveContent(path) {
  try {
    const source = await readFile(path, 'utf8');
    if (source.includes('\u0000')) return false;
    return SENSITIVE_CONTENT_PATTERNS.some((pattern) => pattern.test(source));
  } catch {
    return false;
  }
}

async function readDecisionLines(cwd) {
  try {
    return (await readFile(resolve(cwd, 'docs/DECISIONS.md'), 'utf8'))
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith('- '));
  } catch {
    return [];
  }
}

export async function inspectTaskHistory(cwd, taskId) {
  const taskRoot = resolve(cwd, 'docs/history/tasks', taskId);
  if (!(await exists(taskRoot))) return { snapshots: [], status: 'not_configured', task_id: taskId };
  const snapshots = [];
  for (const entry of await readdir(taskRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const snapshotPath = resolve(taskRoot, entry.name, 'SNAPSHOT.md');
    snapshots.push({
      id: entry.name,
      snapshot: relative(cwd, snapshotPath),
      snapshot_exists: await exists(snapshotPath),
    });
  }
  return {
    snapshots,
    status: snapshots.length ? 'passed' : 'not_configured',
    task_id: taskId,
  };
}

export async function createTaskSnapshot(cwd, {
  taskId,
  title = '未命名任务',
  goal = '记录本次任务结果',
  userRequest = '',
  verification = [],
} = {}) {
  if (!taskId) throw new Error('创建任务快照需要任务编号');
  const allFiles = await walk(cwd);
  const sensitiveContent = [];
  for (const file of allFiles) {
    if (await containsSensitiveContent(resolve(cwd, file))) sensitiveContent.push(file);
  }
  if (sensitiveContent.length) {
    throw new Error(`任务快照检测到敏感内容，已停止：${sensitiveContent.slice(0, 5).join(', ')}`);
  }
  const inputs = await inspectInputs(cwd);
  if (inputs.status !== 'passed') {
    throw new Error(`任务快照前输入未收口：${inputs.issues.map((issue) => issue.message).slice(0, 3).join('；')}`);
  }
  const acceptance = await inspectAcceptance(cwd, { taskId });
  const intake = await inspectIntake(cwd);
  if (acceptance.status === 'needs_confirmation' || acceptance.status === 'not_configured') {
    throw new Error(`任务快照前验收未收口：${acceptance.unresolved || acceptance.issue || '存在未确认验收项'}`);
  }
  const reportPath = resolve(cwd, 'tmp/continue-harness/report.json');
  let latestReport = null;
  try {
    latestReport = JSON.parse(await readFile(reportPath, 'utf8'));
  } catch {
    throw new Error('任务快照前必须先执行一次 continue-harness verify，并保留 tmp/continue-harness/report.json');
  }
  const context = await verificationContext(cwd, taskId);
  if (latestReport.task_id !== taskId || latestReport.context?.fingerprint !== context.fingerprint) {
    throw new Error('验证报告与当前任务或输入/实现版本不匹配，请重新验证');
  }
  const inputByType = (type) => inputs.inputs
    .filter((item) => item.type === type)
    .map((item) => `${item.id} (${item.path})`);
  const confirmedEvidence = (intake.evidence || [])
    .filter((item) => item.status === 'confirmed')
    .map((item) => `${item.id}${item.source ? `: ${item.source}` : ''}`);
  const pendingEvidence = (intake.evidence || [])
    .filter((item) => item.status === 'pending' || item.status === 'needs_confirmation')
    .map((item) => item.id);
  const decisions = await readDecisionLines(cwd);
  const risks = acceptance.status === 'closed_with_risks'
    ? acceptance.rows.filter((row) => !['verified', '已验证'].includes(row.status)).map((row) => `${row.id}: ${row.evidence}`)
    : [];
  const implementation = latestReport.status === 'passed'
    ? '验证命令全部通过；具体文件清单见 files.json'
    : `验证结果为 ${latestReport.status || 'unknown'}；具体失败见 tmp/continue-harness/report.json`;
  const id = timestamp();
  const root = resolve(cwd, 'docs/history/tasks', taskId, id);
  await mkdir(root, { recursive: true });
  const files = [];
  for (const file of allFiles) {
    const absolutePath = resolve(cwd, file);
    const info = await stat(absolutePath);
    files.push({
      bytes: info.size,
      path: file,
      sha256: await fileHash(absolutePath),
      ui: file.startsWith('src/') || file.startsWith('docs/design/'),
    });
  }
  const snapshot = [
    `# 任务快照 ${taskId}`,
    '',
    `- 任务编号：${taskId}`,
    `- 任务名称：${title}`,
    `- 本次目标：${goal}`,
    `- 用户要求：${userRequest || '待确认'}`,
    `- 使用的输入：${context.inputs.map((item) => item.id).join('；') || '无'}`,
    `- 已确认：${[...confirmedEvidence, ...inputByType('prd')].join('；') || '无'}`,
    `- 推断与待确认事实：见 context.json 中的项目文档与 Intake；未登记不代表不存在`,
    `- 待确认：${[...pendingEvidence, ...risks].join('；') || '无'}`,
    `- 冲突：${inputs.issues.map((item) => item.message).join('；') || '输入检查未发现冲突'}`,
    `- 实际实现：${implementation}`,
    `- 未实现：${risks.join('；') || '无已登记未实现项'}`,
    `- 修改文件：见 files.json`,
    `- 验证命令：见 verification.json`,
    `- 验证结果：见 verification.json`,
    `- 验收状态：${acceptance.status}`,
    `- 最近验证：${latestReport.status || 'unknown'}（${latestReport.mode || 'unknown'}）`,
    `- 剩余风险：${acceptance.status === 'closed_with_risks' || latestReport.status !== 'passed' ? '见验收表和最近验证报告' : '无已登记风险'}`,
    `- 持久决策：${decisions.join('；') || '无已登记持久决策'}`,
    `- 创建时间：${new Date().toISOString()}`,
    '',
  ].join('\n');
  await Promise.all([
    writeFile(resolve(root, 'SNAPSHOT.md'), snapshot, { flag: 'wx' }),
    writeFile(resolve(root, 'files.json'), `${JSON.stringify({ files }, null, 2)}\n`, { flag: 'wx' }),
    writeFile(
      resolve(root, 'verification.json'),
      `${JSON.stringify({ commands: verification, report: latestReport, status: latestReport.status, mode: latestReport.mode }, null, 2)}\n`,
      { flag: 'wx' },
    ),
    writeFile(
      resolve(root, 'context.json'),
      `${JSON.stringify({ intake, acceptance, context, decisions, documents: await readProjectDocuments(cwd) }, null, 2)}\n`,
      { flag: 'wx' },
    ),
  ]);
  return {
    path: relative(cwd, root),
    task_id: taskId,
  };
}

export async function ensureHistoryFile(path, title, tableHeader) {
  await mkdir(dirname(path), { recursive: true });
  if (await exists(path)) return false;
  await writeFile(path, `# ${title}\n\n${tableHeader}\n`, 'utf8');
  return true;
}
