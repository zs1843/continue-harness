import { spawn } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { appendCommandLog } from './intake.mjs';

export function runShellCommand(command, { cwd, env = process.env, quiet = false } = {}) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    const child = spawn(command, {
      cwd,
      env,
      shell: true,
      stdio: ['inherit', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      const text = String(chunk);
      stdout += text;
      if (!quiet) process.stdout.write(text);
    });
    child.stderr.on('data', (chunk) => {
      const text = String(chunk);
      stderr += text;
      if (!quiet) process.stderr.write(text);
    });
    child.on('error', async (error) => {
      const result = {
        command,
        durationMs: Math.round(performance.now() - startedAt),
        error: error.message,
        status: 'blocked',
        stderr,
        stdout,
      };
      await appendCommandLog(cwd, { kind: 'command', ...result }).catch(() => {});
      resolve(result);
    });
    child.on('exit', async (code) => {
      const result = {
        command,
        durationMs: Math.round(performance.now() - startedAt),
        exitCode: code ?? 1,
        status: code === 0 ? 'passed' : 'failed',
        stderr,
        stdout,
      };
      await appendCommandLog(cwd, { kind: 'command', ...result }).catch(() => {});
      resolve(result);
    });
  });
}

export async function runVerification({ cwd, failFast, mode, notConfigured = false, steps, quiet = false }) {
  if (notConfigured) {
    return {
      mode,
      results: [],
      status: 'not_configured',
      summary: '该验证模式未配置，不能视为通过',
    };
  }
  const results = [];
  for (const step of steps) {
    const result = await runShellCommand(step.command, { cwd, quiet });
    const output = `${result.stdout || ''}\n${result.stderr || ''}`;
    const environmentBlocked = result.status !== 'passed' &&
      /listen EPERM|EACCES.*listen|operation not permitted.*listen/i.test(output);
    const visualMissingBaseline =
      mode === 'visual' &&
      /snapshot.*doesn'?t exist|has no baseline|Missing.*snapshot|toHaveScreenshot/i.test(output);
    const normalized = environmentBlocked
      ? {
          ...result,
          status: 'blocked',
          summary: '工具链或当前执行环境阻止服务监听端口，不归类为项目业务失败',
        }
      : visualMissingBaseline
      ? {
          ...result,
          status: 'not_configured',
          summary: '视觉截图基线未配置，请执行显式更新基线命令',
        }
      : result;
    results.push({ ...normalized, name: step.name });
    if (failFast && normalized.status !== 'passed') break;
  }
  if (mode === 'visual' && results.some((item) => item.status === 'not_configured')) {
    return {
      mode,
      results,
      status: 'not_configured',
      summary: '视觉回归未配置截图基线，不能视为通过',
    };
  }
  return {
    mode,
    results,
    status: results.length && results.every((item) => item.status === 'passed') ? 'passed' : 'failed',
  };
}
