import { mkdtemp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  HARNESS_DIRECTORY,
  LEGACY_HARNESS_DIRECTORY,
  loadProjectConfig,
  resolveHarnessDirectory,
} from '../packages/core/src/index.mjs';

const config = `harness:\n  package: "@company/continue-harness"\n  version: "0.1.0"\nproject:\n  name: legacy-project\n  product_type: developer_tooling\n  platforms: [node]\nstack:\n  adapter: node-esm\n  language: javascript\n  package_manager: pnpm\ncommands:\n  test: pnpm test\nverify:\n  quick:\n    commands: [test]\n`;

test('new projects prefer .continue-harness', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-path-'));
  await mkdir(resolve(cwd, HARNESS_DIRECTORY), { recursive: true });
  assert.equal(await resolveHarnessDirectory(cwd), HARNESS_DIRECTORY);
  const loaded = await loadProjectConfig(cwd).catch((error) => error);
  assert.equal(loaded.code, 'ENOENT');
});

test('legacy .fe-harness projects remain readable', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-legacy-'));
  await mkdir(resolve(cwd, LEGACY_HARNESS_DIRECTORY), { recursive: true });
  await writeFile(resolve(cwd, LEGACY_HARNESS_DIRECTORY, 'project.yaml'), config);
  assert.equal(await resolveHarnessDirectory(cwd), LEGACY_HARNESS_DIRECTORY);
  const loaded = await loadProjectConfig(cwd);
  assert.equal(loaded.config.project.name, 'legacy-project');
  assert.match(loaded.path, /\.fe-harness[\\/]project\.yaml$/);
});

test('canonical configuration wins when both directories exist', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-both-'));
  await mkdir(resolve(cwd, HARNESS_DIRECTORY), { recursive: true });
  await mkdir(resolve(cwd, LEGACY_HARNESS_DIRECTORY), { recursive: true });
  await writeFile(resolve(cwd, HARNESS_DIRECTORY, 'project.yaml'), config.replace('legacy-project', 'canonical-project'));
  await writeFile(resolve(cwd, LEGACY_HARNESS_DIRECTORY, 'project.yaml'), config);
  const loaded = await loadProjectConfig(cwd);
  assert.equal(loaded.config.project.name, 'canonical-project');
  assert.match(await readFile(resolve(cwd, HARNESS_DIRECTORY, 'project.yaml'), 'utf8'), /canonical-project/);
});

test('CLI migrates a legacy directory without overwriting a target', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-cli-migrate-'));
  const legacy = resolve(cwd, LEGACY_HARNESS_DIRECTORY);
  await mkdir(legacy, { recursive: true });
  await writeFile(resolve(legacy, 'project.yaml'), config);
  const cli = resolve(process.cwd(), 'packages/cli/bin/continue-harness.mjs');
  const result = spawnSync(process.execPath, [cli, 'migrate', '--json'], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  await access(resolve(cwd, HARNESS_DIRECTORY, 'project.yaml'));
  await assert.rejects(access(legacy));
});
