import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

async function readOptional(path) {
  try {
    return await readFile(path);
  } catch (error) {
    if (error?.code === 'ENOENT') return null;
    throw error;
  }
}

export async function planProjectCreation({ name, output, presetRoot, files }) {
  const entries = [];
  for (const file of files) {
    const relativePath = typeof file === 'string' ? file : file.target;
    const sourcePath = typeof file === 'string' ? resolve(presetRoot, file) : file.source;
    const source = await readFile(sourcePath, 'utf8');
    const content = source
      .replaceAll('__PROJECT_NAME__', name)
      .replaceAll('__GENERATED_DATE__', new Date().toISOString().slice(0, 10));
    const targetPath = resolve(output, relativePath);
    const existing = await readOptional(targetPath);
    const status = existing === null ? 'create' : existing.equals(Buffer.from(content)) ? 'unchanged' : 'conflict';
    entries.push({ content, status, target: relativePath });
  }
  return {
    action: 'create',
    entries: entries.map(({ content: _content, ...entry }) => entry),
    name,
    output,
    status: entries.some((entry) => entry.status === 'conflict') ? 'conflict' : 'ready',
    _entries: entries,
  };
}

export async function applyProjectCreation(plan) {
  if (plan.status !== 'ready') throw new Error('项目创建计划包含冲突，未写入任何文件');
  for (const entry of plan._entries) {
    if (entry.status !== 'create') continue;
    const targetPath = resolve(plan.output, entry.target);
    await mkdir(dirname(targetPath), { recursive: true });
    await writeFile(targetPath, entry.content, 'utf8');
  }
}

export function publicPlan(plan) {
  const { _entries, ...serializable } = plan;
  return serializable;
}
