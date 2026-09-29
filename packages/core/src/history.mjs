import { createHash } from 'node:crypto';
import { access, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

const SENSITIVE_PATTERNS = [
  /^\.env(?:\.|$)/,
  /(?:access|auth|api|refresh)[_-]?token/i,
  /cookie/i,
  /secret/i,
  /credential/i,
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
    else output.push(relative(root, path));
  }
  return output.sort();
}

async function fileHash(path) {
  return createHash('sha256').update(await readFile(path)).digest('hex');
}

function isSensitive(path) {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(path));
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
  const sensitive = allFiles.filter(isSensitive);
  if (sensitive.length) {
    throw new Error(`任务快照检测到敏感文件名，已停止：${sensitive.slice(0, 5).join(', ')}`);
  }
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
    `- 使用的 PRD：待确认`,
    `- 使用的 RP：待确认`,
    `- 使用的 UI：待确认`,
    `- 使用的 API/资产：待确认`,
    `- 已确认：待补充`,
    `- 推断：待补充`,
    `- 待确认：待补充`,
    `- 冲突：无已记录冲突`,
    `- 实际实现：待补充`,
    `- 未实现：待补充`,
    `- 修改文件：见 files.json`,
    `- 验证命令：见 verification.json`,
    `- 验证结果：见 verification.json`,
    `- 剩余风险：待确认`,
    `- 持久决策：待确认`,
    `- 创建时间：${new Date().toISOString()}`,
    '',
  ].join('\n');
  await Promise.all([
    writeFile(resolve(root, 'SNAPSHOT.md'), snapshot, { flag: 'wx' }),
    writeFile(resolve(root, 'files.json'), `${JSON.stringify({ files }, null, 2)}\n`, { flag: 'wx' }),
    writeFile(
      resolve(root, 'verification.json'),
      `${JSON.stringify({ commands: verification, status: '未验证' }, null, 2)}\n`,
      { flag: 'wx' },
    ),
    writeFile(
      resolve(root, 'design-token-diff.json'),
      `${JSON.stringify({ added: [], changed: [], deleted: [] }, null, 2)}\n`,
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
