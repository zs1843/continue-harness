import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { displayStatus, localizeResult } from './status.mjs';
import { verificationContext } from './verification-context.mjs';

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
    '# Continue Harness 验证报告',
    '',
    `- 验证模式：\`${report.mode}\``,
    `- 总体状态：**${displayStatus(report.status)}**`,
    `- 生成时间：${report.generatedAt}`,
    '',
    '## 完成度说明',
    '',
    '- 检查结果只覆盖本次配置的范围。',
    '- 完成结论需要需求、实现项、验收项与证据关联。',
    '- 延期、阻塞及未配置验收不表示交付通过。',
    `- 关联任务：${report.task_id || '未绑定'}`,
    ...(report.context?.fingerprint ? [`- 验证绑定指纹：\`${String(report.context.fingerprint).slice(0, 12)}\``] : []),
    ...(report.context?.changed_during_verification
      ? ['- **验证期间输入、实现、证据或验证配置发生变化，本报告不能视为有效绑定**']
      : []),
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
    `- 验收：${report.acceptance?.status || 'not_configured'}`,
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
    context: verification.context || await verificationContext(cwd, verification.task_id),
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
