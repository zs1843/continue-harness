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
  assert.equal(checks.VISUAL_BASELINE.status, 'not_applicable');
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
  await mkdir(resolve(cwd, '.claude/skills/consumer-h5-harness'), { recursive: true });
  await writeFile(resolve(cwd, 'package.json'), '{}\n');
  await writeFile(resolve(cwd, '.gitignore'), 'tmp/\n');
  await writeFile(resolve(cwd, 'AGENTS.md'), '# 唯一约束本体\n');
  await writeFile(resolve(cwd, 'CLAUDE.md'), '@AGENTS.md\n');
  await writeFile(
    resolve(cwd, '.cursor/rules/continue-harness.mdc'),
    '---\nalwaysApply: true\n---\n读取 AGENTS.md。\n',
  );
  await writeFile(
    resolve(cwd, '.claude/skills/consumer-h5-harness/SKILL.md'),
    '---\nname: consumer-h5-harness\ndescription: 测试\n---\n',
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
