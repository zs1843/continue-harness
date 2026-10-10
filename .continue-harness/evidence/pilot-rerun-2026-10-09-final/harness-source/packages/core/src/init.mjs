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

export async function planInitialization({ cwd, files, templateRoot }) {
  const entries = [];
  for (const [source, target] of files) {
    const sourcePath = resolve(templateRoot, source);
    const targetPath = resolve(cwd, target);
    const [sourceContent, targetContent] = await Promise.all([
      readFile(sourcePath),
      readOptional(targetPath),
    ]);
    const status =
      targetContent === null
        ? 'create'
        : sourceContent.equals(targetContent)
          ? 'managed_unchanged'
          : 'project_owned_modified';
    entries.push({ source, status, target });
  }
  return {
    entries,
    status: 'ready',
  };
}

export async function applyInitialization({ cwd, files, plan, templateRoot }) {
  if (plan.status !== 'ready') throw new Error('初始化计划包含冲突，未写入任何文件');
  for (const entry of plan.entries) {
    if (entry.status !== 'create') continue;
    await mkdir(dirname(resolve(cwd, entry.target)), { recursive: true });
    const [source] = files.find(([, target]) => target === entry.target);
    const content = (await readFile(resolve(templateRoot, source), 'utf8')).replaceAll(
      '__GENERATED_DATE__',
      new Date().toISOString().slice(0, 10),
    );
    await writeFile(resolve(cwd, entry.target), content, { encoding: 'utf8', flag: 'wx' });
  }
}
