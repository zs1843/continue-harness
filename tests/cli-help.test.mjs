import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

const repository = resolve(import.meta.dirname, '..');
const cli = resolve(repository, 'packages/cli/bin/continue-harness.mjs');

function run(args = []) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd: repository,
    encoding: 'utf8',
  });
}

test('prints lightweight default workflow with no arguments', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /continue-harness - 项目协作约束、输入管理和验证工具/);
  assert.match(result.stdout, /默认流程/);
  assert.match(result.stdout, /continue-harness create <项目名> --output <目录>/);
  assert.match(result.stdout, /基础命令/);
  assert.match(result.stdout, /intake\s+通过多轮问答确认项目事实和最小输入清单/);
});

test('prints rich help for -h', () => {
  const result = run(['-h']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /全局选项/);
  assert.match(result.stdout, /continue-harness verify feature/);
  assert.match(result.stdout, /intake\s+通过多轮问答确认项目事实和最小输入清单/);
});

test('prints intake topic help from the main command router', () => {
  const result = run(['help', 'intake']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /continue-harness intake - 多轮项目事实与输入确认/);
  assert.match(result.stdout, /continue-harness intake inspect/);
  assert.match(result.stdout, /continue-harness intake answer/);
});

test('prints the same version through command and option aliases', () => {
  const command = run(['version']);
  const shortOption = run(['-v']);
  const longOption = run(['--version']);
  assert.equal(command.status, 0, command.stderr);
  assert.equal(shortOption.status, 0, shortOption.stderr);
  assert.equal(longOption.status, 0, longOption.stderr);
  assert.equal(shortOption.stdout, command.stdout);
  assert.equal(longOption.stdout, command.stdout);
  assert.match(command.stdout, /^0\.1\.0\n$/);
});

test('prints topic help through help subcommand', () => {
  const result = run(['help', 'verify']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /continue-harness verify - 执行验证模式/);
  assert.match(result.stdout, /quick/);
  assert.match(result.stdout, /visual/);
});

test('prints topic help through subcommand help flag', () => {
  const result = run(['verify', '-h']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /用法：\n\x20\x20continue-harness verify <模式> \[--json\]/);
});

test('unknown command exits non-zero and shows main help', () => {
  const result = run(['unknown']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /未知命令：unknown/);
  assert.match(result.stdout, /基础命令/);
});

test('lists command skills as stable JSON', () => {
  const result = run(['skills', 'list', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.ok(payload.skills.includes('continue-harness-create'));
  assert.ok(payload.skills.includes('continue-harness-verify'));
  assert.ok(payload.skills.includes('continue-harness-api'));
  assert.ok(payload.skills.includes('consumer-h5-harness'));
});

test('lists experimental UI System adapters as stable JSON', () => {
  const result = run(['ui', 'systems', 'list', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.deepEqual(payload.systems[0], { id: 'tdesign-uniapp', status: 'experimental', version: '0.1.0-experimental' });
});

test('previews UI System adapter installation without mutation', () => {
  const result = run(['ui', 'systems', 'install', 'tdesign-uniapp', '--dry-run', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.status, 'ready');
  assert.equal(payload.config.ui.system.policy, 'preferred');
});

test('installs an individual skill into an explicit global target', async () => {
  const target = await mkdtemp(resolve(tmpdir(), 'continue-harness-skills-'));
  const result = run([
    'skills',
    'install',
    '--global',
    '--target',
    target,
    '--name',
    'continue-harness-create',
    '--json',
  ]);
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.deepEqual(payload.installed, ['continue-harness-create']);
  assert.match(await readFile(resolve(target, 'continue-harness-create/SKILL.md'), 'utf8'), /创建问答/);
});

test('installs a Claude skill into an explicit provider target', async () => {
  const target = await mkdtemp(resolve(tmpdir(), 'continue-harness-claude-skills-'));
  const result = run([
    'skills',
    'install',
    '--global',
    '--provider',
    'claude',
    '--target',
    target,
    '--name',
    'continue-harness-create',
    '--json',
  ]);
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.provider, 'claude');
  assert.deepEqual(payload.installations[0].providers, ['claude']);
  assert.match(await readFile(resolve(target, 'continue-harness-create/SKILL.md'), 'utf8'), /创建问答/);
});
