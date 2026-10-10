import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import { runDoctor } from '../packages/core/src/index.mjs';

test('doctor returns stable issue codes and remediation', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-doctor-'));
  await writeFile(resolve(cwd, 'package.json'), '{"scripts":{}}\n');
  const report = await runDoctor(cwd, {
    commands: { build: 'pnpm build:h5' },
    facts: { design_guide: 'docs/DESIGN.md' },
  });
  assert.equal(report.status, 'failed');
  assert.ok(report.results.every((item) => typeof item.code === 'string'));
  const missingScript = report.results.find((item) => item.name === 'command:build');
  assert.equal(missingScript.code, 'PROJECT_SCRIPT');
  assert.match(missingScript.suggestion, /build:h5/);
});

test('doctor recognizes the Node.js test runner and CI entry point', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-node-test-doctor-'));
  await mkdir(resolve(cwd, '.github/workflows'), { recursive: true });
  await writeFile(resolve(cwd, '.github/workflows/verify.yml'), 'name: verify\n');
  await writeFile(resolve(cwd, 'package.json'), JSON.stringify({
    engines: { node: '>=20' },
    scripts: { test: 'node --test tests/*.test.mjs' },
  }));
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n.env*\n!.env.example\n');
  const report = await runDoctor(cwd, { commands: { unit_test: 'pnpm test' }, project: { product_type: 'developer_tooling' } });
  const checks = Object.fromEntries(report.results.map((item) => [item.code, item]));
  assert.equal(checks.TEST_ISOLATION.status, 'passed');
  assert.equal(checks.NODE_ENGINE_DECLARATION.status, 'passed');
  assert.equal(checks.CI_ENTRY_POINT.status, 'passed');
  // Non consumer-h5 projects still get the visual check evaluated instead of skipped.
  assert.equal(checks.VISUAL_BASELINE.status, 'not_configured');
});

test('doctor inspects inputs, task history and agent entry for generic projects', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-generic-doctor-'));
  await writeFile(resolve(cwd, 'package.json'), '{"scripts":{}}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n.env*\n');
  await writeFile(resolve(cwd, 'AGENTS.md'), '# 唯一约束本体\n');
  const genericConfig = {
    harness: { mode: 'generic', version: '0.1.0' },
    project: { name: 'generic-doctor', product_type: 'generic' },
  };
  const report = await runDoctor(cwd, genericConfig);
  const checks = Object.fromEntries(report.results.map((item) => [item.code, item]));
  // These used to collapse into a single "not_applicable", which hid the generic closure gaps.
  assert.equal(checks.INPUT_MANIFEST.status, 'not_configured');
  assert.equal(checks.INPUT_REGISTRY.status, 'not_configured');
  assert.equal(checks.HISTORY_ROOT.status, 'not_configured');
  assert.equal(checks.TASK_SNAPSHOT_ROOT.status, 'not_configured');
  assert.equal(checks.AGENT_ADAPTERS.status, 'not_configured');
  // The canonical project instructions work without an aggregate project Skill.
  assert.equal(checks.AGENT_WORKFLOW.status, 'needs_confirmation');
  assert.equal(checks.DESIGN_GOVERNANCE.status, 'not_applicable');
  assert.ok(!report.results.some((item) => item.status === 'not_applicable'
    && ['INPUT_MANIFEST', 'INPUT_REGISTRY', 'TASK_SNAPSHOT_ROOT', 'AGENT_WORKFLOW'].includes(item.code)));
  assert.equal(report.status, 'passed');

  // A generic project with a broken task snapshot must fail, not skip.
  await mkdir(resolve(cwd, 'docs/history/tasks/T001/snapshot-1'), { recursive: true });
  const snapshotReport = await runDoctor(cwd, genericConfig);
  const snapshotChecks = Object.fromEntries(snapshotReport.results.map((item) => [item.code, item]));
  assert.equal(snapshotChecks.TASK_SNAPSHOT_INTEGRITY.status, 'failed');
  assert.match(snapshotChecks.TASK_SNAPSHOT_INTEGRITY.message, /SNAPSHOT\.md/);
  assert.equal(snapshotReport.status, 'failed');
});

test('doctor does not impose source-tree or built-in toolchain assumptions on an arbitrary project', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-arbitrary-doctor-'));
  await mkdir(resolve(cwd, 'app/modules'), { recursive: true });
  await writeFile(resolve(cwd, 'app/modules/main.txt'), 'project-owned layout\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n.env*\n');
  await writeFile(resolve(cwd, 'package.json'), JSON.stringify({ packageManager: 'workspace-manager@1.0' }));
  await writeFile(resolve(cwd, 'AGENTS.md'), '# Constraints\n');
  const report = await runDoctor(cwd, {
    harness: { mode: 'generic' },
    project: { name: 'arbitrary-layout', product_type: 'service-platform', platforms: ['custom-runtime'] },
    stack: { adapter: 'custom-build', package_manager: 'workspace-manager' },
  });
  const checks = Object.fromEntries(report.results.map((item) => [item.code, item]));
  assert.equal(checks.PACKAGE_MANAGER.status, 'not_configured');
  assert.ok(!report.results.some((item) => ['UNI_APP_PAGE_REGISTRY', 'UNI_APP_DEPENDENCIES'].includes(item.code)));
  assert.ok(!report.results.some((item) => item.status === 'failed'));
});

test('doctor does not require a package manifest for a non-package project', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-no-package-doctor-'));
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n.env*\n');
  await writeFile(resolve(cwd, 'AGENTS.md'), [
    'continue-harness inspect',
    'continue-harness doctor',
    'continue-harness verify',
    'task snapshot',
    'manifest.yaml',
    '输入清单',
  ].join('\n'));
  const report = await runDoctor(cwd, {
    harness: { mode: 'generic' },
    project: { name: 'non-package-project', product_type: 'knowledge-system' },
  });
  const checks = Object.fromEntries(report.results.map((item) => [item.code, item]));
  assert.equal(checks.PROJECT_PACKAGE_JSON.status, 'not_configured');
  assert.ok(!report.results.some((item) => item.status === 'failed'));
  assert.equal(report.status, 'passed');
});

test('doctor retains complete legacy snapshots without demanding retroactive context', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-legacy-snapshot-'));
  const root = resolve(cwd, 'docs/history/tasks/T001/old');
  await mkdir(root, { recursive: true });
  for (const name of ['SNAPSHOT.md', 'files.json', 'verification.json', 'design-token-diff.json']) {
    await writeFile(resolve(root, name), name.endsWith('.json') ? '{}' : '# Historical snapshot');
  }
  const report = await runDoctor(cwd, { project: { product_type: 'generic' }, harness: { mode: 'generic' } });
  assert.equal(report.results.find((item) => item.code === 'TASK_SNAPSHOT_INTEGRITY').status, 'passed');
  assert.equal(report.results.find((item) => item.code === 'TASK_SNAPSHOT_LEGACY').status, 'not_configured');
});

test('doctor validates a configured consumer H5 OpenAPI snapshot and uni-app structure', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-consumer-doctor-'));
  await mkdir(resolve(cwd, 'src'), { recursive: true });
  await mkdir(resolve(cwd, 'src/pages/index'), { recursive: true });
  await mkdir(resolve(cwd, '.continue-harness/snapshots'), { recursive: true });
  await writeFile(
    resolve(cwd, 'package.json'),
    JSON.stringify({
      dependencies: { '@dcloudio/uni-app': '1.0.0', vue: '3.0.0' },
      packageManager: 'pnpm@10.12.1',
      scripts: { 'build:h5': 'vite build' },
    }),
  );
  await writeFile(resolve(cwd, 'pnpm-lock.yaml'), 'lockfileVersion: 9\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n');
  await writeFile(resolve(cwd, 'src/pages.json'), '{"pages":[{"path":"pages/index/index"}]}\n');
  await writeFile(resolve(cwd, 'src/pages/index/index.vue'), '<template><view /></template>\n');
  await writeFile(
    resolve(cwd, '.continue-harness/snapshots/openapi.json'),
    '{"openapi":"3.1.0","paths":{}}\n',
  );
  const report = await runDoctor(cwd, {
    commands: { build: 'pnpm build:h5' },
    project: { product_type: 'consumer_h5' },
    sources: {
      api: { provider: 'openapi', snapshot: '.continue-harness/snapshots/openapi.json' },
    },
    stack: { adapter: 'uni-app', package_manager: 'pnpm' },
  });
  const checks = Object.fromEntries(report.results.map((item) => [item.code, item]));
  assert.equal(checks.PACKAGE_MANAGER.status, 'passed');
  assert.equal(checks.UNI_APP_PAGE_REGISTRY.status, 'passed');
  assert.equal(checks.UNI_APP_DEPENDENCIES.status, 'passed');
  assert.equal(checks.GITIGNORE_REPORTS.status, 'passed');
  assert.equal(checks.OPENAPI_SNAPSHOT.status, 'passed');
});

test('doctor rejects page registrations without matching Vue components', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-pages-doctor-'));
  await mkdir(resolve(cwd, 'src'), { recursive: true });
  await writeFile(resolve(cwd, 'package.json'), '{}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n');
  await writeFile(resolve(cwd, 'src/pages.json'), '{"pages":[{"path":"pages/missing"}]}\n');
  const report = await runDoctor(cwd, { stack: { adapter: 'uni-app' } });
  const pageRegistry = report.results.find((item) => item.code === 'UNI_APP_PAGE_REGISTRY');
  assert.equal(pageRegistry.status, 'failed');
  assert.match(pageRegistry.message, /pages\/missing/);
});

test('doctor reports a malformed configured OpenAPI snapshot', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-openapi-doctor-'));
  await mkdir(resolve(cwd, '.continue-harness/snapshots'), { recursive: true });
  await writeFile(resolve(cwd, 'package.json'), '{}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/continue-harness/\n');
  await writeFile(resolve(cwd, '.continue-harness/snapshots/openapi.json'), '{bad json}\n');
  const report = await runDoctor(cwd, {
    sources: {
      api: { provider: 'openapi', snapshot: '.continue-harness/snapshots/openapi.json' },
    },
  });
  const openapi = report.results.find((item) => item.code === 'OPENAPI_SNAPSHOT');
  assert.equal(openapi.status, 'failed');
  assert.match(openapi.suggestion, /仅接受.*JSON/);
});

test('doctor requires the project Agent workflow for consumer H5', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-agent-doctor-'));
  await writeFile(resolve(cwd, 'package.json'), '{}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n');
  const report = await runDoctor(cwd, {
    facts: { agent_entry: 'AGENTS.md' },
    project: { product_type: 'consumer_h5' },
  });
  const workflow = report.results.find((item) => item.code === 'AGENT_WORKFLOW');
  assert.equal(workflow.status, 'failed');
  assert.match(workflow.suggestion, /continue-harness plan init/);
});

test('doctor accepts thin Claude and Cursor adapters to the canonical AGENTS constraints', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-adapter-doctor-'));
  await mkdir(resolve(cwd, '.cursor/rules'), { recursive: true });
  await writeFile(resolve(cwd, 'package.json'), '{}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n');
  await writeFile(resolve(cwd, 'AGENTS.md'), '# 唯一约束本体\n');
  await writeFile(resolve(cwd, 'CLAUDE.md'), '@AGENTS.md\n');
  await writeFile(
    resolve(cwd, '.cursor/rules/continue-harness.mdc'),
    '---\nalwaysApply: true\n---\n读取 AGENTS.md。\n',
  );
  const report = await runDoctor(cwd, {
    facts: { agent_entry: 'AGENTS.md' },
    project: { product_type: 'consumer_h5' },
  });
  const adapters = report.results.find((item) => item.code === 'AGENT_ADAPTERS');
  assert.equal(adapters.status, 'passed');
  assert.match(adapters.message, /唯一约束本体/);
});

test('doctor validates generic UI governance without importing the concrete library', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-ui-doctor-'));
  await mkdir(resolve(cwd, '.continue-harness/ui'), { recursive: true });
  await mkdir(resolve(cwd, '.continue-harness/models'), { recursive: true });
  await writeFile(resolve(cwd, 'package.json'), '{}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n.env*\n');
  await writeFile(resolve(cwd, '.continue-harness/ui/adapter.yaml'), JSON.stringify({ id: 'custom-ui', version: '1.0.0', components: [{}], semantic_mapping: {}, token_mapping: {} }));
  await writeFile(resolve(cwd, '.continue-harness/ui/adjustments.yaml'), JSON.stringify({ schema: 'ui-adjustments/v1', adjustments: [] }));
  await writeFile(resolve(cwd, '.continue-harness/models/page-flow.yaml'), JSON.stringify({ schema: 'page-flow-model/v1', nodes: [{ id: 'home', type: 'page', route: '/home', transitions: [] }] }));
  await writeFile(resolve(cwd, '.continue-harness/models/layout.yaml'), JSON.stringify({ schema: 'layout-spec/v1', pages: [{ id: 'home', route: '/home', layout: { content: 'scroll' }, sections: [{ id: 'main', semantic_component: 'content' }] }] }));
  const report = await runDoctor(cwd, { project: { product_type: 'consumer_h5' }, ui: { system: { adapter: 'custom-ui', version: '1.0.0', policy: 'preferred' } }, facts: { ui_system_adapter: '.continue-harness/ui/adapter.yaml', page_flow_model: '.continue-harness/models/page-flow.yaml', layout_specs: '.continue-harness/models/layout.yaml', ui_adjustments: '.continue-harness/ui/adjustments.yaml' } });
  assert.equal(report.results.find((item) => item.code === 'UI_GOVERNANCE').status, 'passed');
});
