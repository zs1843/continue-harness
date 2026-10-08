import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { displayStatus, localizeResult } from './status.mjs';

const VERIFY_DIMENSIONS = {
  audit: '汇总审计',
  build: '构建验证',
  e2e: '交互验证',
  feature: 'Feature 验证',
  interaction: '交互验证',
  lint: 'Lint',
  quick: '快速验证',
  runtime: '运行时验证',
  type_check: '类型检查',
  unit_test: '单元测试',
  visual: '视觉回归',
};

function renderMarkdown(report) {
  const lines = [
    '# continue-harness 验证报告',
    '',
    `- 验证模式：\`${report.mode}\``,
    `- 总体状态：**${displayStatus(report.status)}**`,
    `- 生成时间：${report.generatedAt}`,
    '',
    '## 完成度说明',
    '',
    '- 构建通过不等于功能完成。',
    '- 页面可打开不等于交互完成。',
    '- 交互可点击不等于业务正确。',
    '- E2E 通过不等于视觉还原通过。',
    '- 截图通过不等于 PRD 验收通过。',
    '- 少量冒烟测试不能代表全业务覆盖。',
    '',
    '| 检查 | 分类 | 状态 | 耗时 | 命令 |',
    '| --- | --- | --- | ---: | --- |',
  ];
  for (const result of report.results) {
    lines.push(
      `| ${result.name} | ${VERIFY_DIMENSIONS[result.name] || VERIFY_DIMENSIONS[report.mode] || '工程配置检查'} | ${displayStatus(result.status)} | ${result.durationMs}ms | \`${result.command}\` |`,
    );
  }
  if (!report.results.length) {
    lines.push('| 无 | 未配置 | 未配置 | 0ms | - |');
  }
  lines.push(
    '',
    '## 产品验收状态',
    '',
    '- PRD 覆盖：未配置',
    '- RP 覆盖：未配置',
    '- UI 覆盖：未配置',
    '- 产品验收：未完成',
  );
  if (report.acceptance) {
    lines.push(
      '',
      `- Harness 验收门禁：${report.acceptance.status}`,
      `- 未收口验收项：${report.acceptance.unresolved || 0}`,
    );
  }
  return `${lines.join('\n')}\n`;
}

export async function writeReport(cwd, verification) {
  const reportDir = resolve(cwd, 'tmp/continue-harness');
  const logDir = resolve(reportDir, 'logs');
  await mkdir(logDir, { recursive: true });
  const report = {
    ...verification,
    generatedAt: new Date().toISOString(),
    harnessVersion: '0.1.0',
    results: verification.results.map(localizeResult),
  };
  await Promise.all(
    report.results.map((result) =>
      writeFile(
        resolve(logDir, `${result.name}.log`),
        `${result.stdout || ''}${result.stderr || ''}`,
        'utf8',
      ),
    ),
  );
  await writeFile(resolve(reportDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(resolve(reportDir, 'report.md'), renderMarkdown(report));
  return report;
}
