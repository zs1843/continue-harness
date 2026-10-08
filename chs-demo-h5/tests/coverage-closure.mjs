import { readFile } from 'node:fs/promises';

const manifest = await readFile(
  new URL('../.continue-harness/inputs/manifest.yaml', import.meta.url),
  'utf8',
);
const coverage = await readFile(
  new URL('../docs/IMPLEMENTATION_COVERAGE.md', import.meta.url),
  'utf8',
);
const prdTasks = new Set();

for (const block of manifest.split(/\n(?=\s*-\s)/)) {
  if (
    !/\btype:\s*prd\b/.test(block) ||
    /\bstatus:\s*(?:superseded|inactive)\b/.test(block)
  )
    continue;
  const task =
    block.match(/\btask_id:\s*(T\d+)\b/)?.[1] ||
    block.match(/\bid:\s*PRD-(T\d+)\b/)?.[1];
  if (task) prdTasks.add(task);
}

const rows = coverage
  .split('\n')
  .filter((line) => /^\|\s*T\d+\s*\|/.test(line))
  .map((line) =>
    line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim()),
  );
const closed = new Set(['已验证', '明确延期', '外部阻塞']);
const errors = [];

for (const taskId of prdTasks) {
  const taskRows = rows.filter((row) => row[0] === taskId);
  if (!taskRows.length) {
    errors.push(`${taskId} 没有页面与流程覆盖记录`);
    continue;
  }
  for (const row of taskRows) {
    const node = row[2] || '<missing-node>';
    const status = row[10] || '<missing-status>';
    if (!closed.has(status))
      errors.push(`${taskId}/${node} 尚未收口：${status}`);
    if ((status === '明确延期' || status === '外部阻塞') && !row[11]) {
      errors.push(`${taskId}/${node} 缺少延期或阻塞依据`);
    }
    if (status === '已验证' && (!row[8] || !row[9])) {
      errors.push(`${taskId}/${node} 缺少实现文件或测试/基线`);
    }
  }
}

if (errors.length) {
  console.error(`需求闭包验证失败：\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(
    `需求闭包验证通过：${prdTasks.size} 个 PRD 任务，${rows.length} 个覆盖节点`,
  );
}
