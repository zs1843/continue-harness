import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import { inspectUiGovernance, validateLayoutSpecCollection, validatePageFlowModel } from '../packages/core/src/index.mjs';

const adapter = {
  id: 'fixture-ui',
  version: '1.0.0',
  components: [{ name: 'Button', semantic: 'action' }],
  semantic_mapping: { 'primary-action': { component: 'Button' } },
  token_mapping: { 'color.brand.primary': '--brand-color' },
};

async function pilot(name, pageFlow, layout) {
  const cwd = await mkdtemp(resolve(tmpdir(), `continue-harness-${name}-`));
  await mkdir(resolve(cwd, '.continue-harness/ui'), { recursive: true });
  await mkdir(resolve(cwd, '.continue-harness/models'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/ui/adapter.yaml'), JSON.stringify(adapter));
  await writeFile(resolve(cwd, '.continue-harness/ui/adjustments.yaml'), JSON.stringify({ schema: 'ui-adjustments/v1', adjustments: [] }));
  await writeFile(resolve(cwd, '.continue-harness/models/page-flow.yaml'), JSON.stringify(pageFlow));
  await writeFile(resolve(cwd, '.continue-harness/models/layout-specs.yaml'), JSON.stringify(layout));
  return cwd;
}

const config = {
  ui: { system: { adapter: 'fixture-ui', version: '1.0.0', policy: 'preferred' } },
  facts: {
    ui_system_adapter: '.continue-harness/ui/adapter.yaml',
    page_flow_model: '.continue-harness/models/page-flow.yaml',
    layout_specs: '.continue-harness/models/layout-specs.yaml',
    ui_adjustments: '.continue-harness/ui/adjustments.yaml',
  },
};

test('pilot A validates a list-detail consumer flow', async () => {
  const flow = { schema: 'page-flow-model/v1', nodes: [
    { id: 'list', type: 'page', route: '/pages/list/index', transitions: [{ trigger: 'item.click', target: 'detail' }] },
    { id: 'detail', type: 'page', route: '/pages/detail/index', transitions: [] },
  ] };
  const layout = { schema: 'layout-spec/v1', pages: [
    { id: 'list', route: '/pages/list/index', layout: { content: 'scroll' }, sections: [{ id: 'results', semantic_component: 'result-list' }] },
    { id: 'detail', route: '/pages/detail/index', layout: { content: 'scroll' }, sections: [{ id: 'actions', semantic_component: 'primary-action' }] },
  ] };
  const report = await inspectUiGovernance(await pilot('list-detail', flow, layout), config);
  assert.equal(report.status, 'passed');
});

test('pilot B validates a form-result flow with visual calibration evidence', async () => {
  const flow = { schema: 'page-flow-model/v1', nodes: [
    { id: 'form', type: 'page', route: '/pages/form/index', transitions: [{ trigger: 'submit', target: 'result' }] },
    { id: 'result', type: 'page', route: '/pages/result/index', transitions: [] },
  ] };
  const layout = { schema: 'layout-spec/v1', pages: [
    { id: 'form', route: '/pages/form/index', layout: { content: 'scroll' }, sections: [{ id: 'fields', semantic_component: 'form' }], visual_references: [{ input_id: 'UI-002', state: 'ready', viewport: { width: 390, height: 844 }, dpr: 1 }] },
    { id: 'result', route: '/pages/result/index', layout: { content: 'fixed' }, sections: [{ id: 'result', semantic_component: 'result-state' }] },
  ] };
  const report = await inspectUiGovernance(await pilot('form-result', flow, layout), config);
  assert.equal(report.status, 'passed');
});

test('models reject dangling transitions and incomplete visual references', () => {
  assert.match(validatePageFlowModel({ schema: 'page-flow-model/v1', nodes: [{ id: 'a', type: 'page', route: '/a', transitions: [{ target: 'missing' }] }] }).join('\n'), /不存在/);
  assert.match(validateLayoutSpecCollection({ schema: 'layout-spec/v1', pages: [{ id: 'a', route: '/a', layout: { content: 'scroll' }, sections: [{ id: 'x', semantic_component: 'content' }], visual_references: [{ input_id: 'UI-1' }] }] }).join('\n'), /viewport/);
});

test('UI runtime must be a matching production dependency when marked installed', async () => {
  const flow = { schema: 'page-flow-model/v1', nodes: [{ id: 'home', type: 'page', route: '/home', transitions: [] }] };
  const layout = { schema: 'layout-spec/v1', pages: [{ id: 'home', route: '/home', layout: { content: 'scroll' }, sections: [{ id: 'main', semantic_component: 'content' }] }] };
  const cwd = await pilot('runtime', flow, layout);
  await writeFile(resolve(cwd, 'package.json'), JSON.stringify({ devDependencies: { '@example/ui': '1.0.0' } }));
  const report = await inspectUiGovernance(cwd, {
    ...config,
    ui: { system: { ...config.ui.system, runtime: { status: 'installed', package: '@example/ui', version: '1.0.0' } } },
  });
  assert.equal(report.status, 'failed');
  assert.match(report.issues.find((item) => item.code === 'UI_SYSTEM_RUNTIME_DEPENDENCY').message, /生产依赖/);
});
