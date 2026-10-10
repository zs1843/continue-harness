import { access, readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

import YAML from 'yaml';

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function readStructured(path) {
  const source = await readFile(path, 'utf8');
  return extname(path) === '.json' ? JSON.parse(source) : YAML.parse(source);
}

function issue(code, status, message, suggestion) {
  return { code, status, message, ...(suggestion ? { suggestion } : {}) };
}

export function validateUiSystemConfig(config = {}) {
  const system = config.ui?.system;
  if (!system || system.status === 'not_configured') return [];
  const issues = [];
  if (typeof system.adapter !== 'string' || !system.adapter.trim()) issues.push('ui.system.adapter 必须是非空字符串');
  if (typeof system.version !== 'string' || !system.version.trim()) issues.push('ui.system.version 必须是非空字符串');
  if (!['required', 'preferred', 'none'].includes(system.policy)) issues.push('ui.system.policy 必须是 required、preferred 或 none');
  const runtime = system.runtime;
  if (runtime !== undefined) {
    if (!['not_installed', 'installed'].includes(runtime?.status)) issues.push('ui.system.runtime.status 必须是 not_installed 或 installed');
    if (runtime?.status === 'installed' && (typeof runtime.package !== 'string' || !runtime.package.trim())) issues.push('已安装 UI runtime 时必须配置 ui.system.runtime.package');
    if (runtime?.status === 'installed' && (typeof runtime.version !== 'string' || !runtime.version.trim())) issues.push('已安装 UI runtime 时必须配置 ui.system.runtime.version');
  }
  return issues;
}

export async function inspectUiGovernance(cwd, config = {}) {
  const system = config.ui?.system;
  if (!system || system.status === 'not_configured') {
    return { adapter: null, issues: [issue('UI_SYSTEM_NOT_CONFIGURED', 'not_configured', '未选择 UI System Adapter')], status: 'not_configured' };
  }
  const issues = validateUiSystemConfig(config).map((message) => issue('UI_SYSTEM_CONFIG', 'failed', message));
  const runtime = system.runtime;
  if (runtime?.status === 'installed') {
    try {
      const packageJson = JSON.parse(await readFile(resolve(cwd, 'package.json'), 'utf8'));
      const declared = packageJson.dependencies?.[runtime.package];
      if (!declared) issues.push(issue('UI_SYSTEM_RUNTIME_DEPENDENCY', 'failed', `UI runtime ${runtime.package} 未声明为生产依赖`, `安装并锁定 ${runtime.package}@${runtime.version}，不要只放在 devDependencies`));
      else if (!String(declared).includes(runtime.version)) issues.push(issue('UI_SYSTEM_RUNTIME_VERSION', 'failed', `UI runtime 声明 ${declared} 与锁定版本 ${runtime.version} 不一致`));
    } catch (error) {
      issues.push(issue('UI_SYSTEM_RUNTIME_PACKAGE_JSON', 'failed', `无法检查 UI runtime 生产依赖：${error.message}`));
    }
  }
  const adapterPath = config.facts?.ui_system_adapter;
  let adapter = null;
  if (!adapterPath || !(await exists(resolve(cwd, adapterPath)))) {
    issues.push(issue('UI_SYSTEM_ADAPTER', 'failed', '缺少项目锁定的 UI System Adapter 描述', '配置 facts.ui_system_adapter 并保存与依赖版本对应的 Adapter 证据'));
  } else {
    try {
      adapter = await readStructured(resolve(cwd, adapterPath));
      if (adapter.id !== system.adapter) issues.push(issue('UI_SYSTEM_ADAPTER_ID', 'failed', `Adapter id ${adapter.id || '<missing>'} 与配置 ${system.adapter} 不一致`));
      if (adapter.version !== system.version) issues.push(issue('UI_SYSTEM_ADAPTER_VERSION', 'failed', `Adapter version ${adapter.version || '<missing>'} 与配置 ${system.version} 不一致`));
      if (!Array.isArray(adapter.components) || !adapter.components.length) issues.push(issue('UI_SYSTEM_COMPONENTS', 'failed', 'Adapter 未声明组件目录'));
      if (!adapter.semantic_mapping || typeof adapter.semantic_mapping !== 'object') issues.push(issue('UI_SYSTEM_SEMANTIC_MAPPING', 'failed', 'Adapter 未声明语义组件映射'));
      if (!adapter.token_mapping || typeof adapter.token_mapping !== 'object') issues.push(issue('UI_SYSTEM_TOKEN_MAPPING', 'failed', 'Adapter 未声明语义 Token 映射'));
    } catch (error) {
      issues.push(issue('UI_SYSTEM_ADAPTER_PARSE', 'failed', `UI System Adapter 无法解析：${error.message}`));
    }
  }

  const modelChecks = [
    ['page_flow_model', 'PAGE_FLOW_MODEL', validatePageFlowModel],
    ['layout_specs', 'LAYOUT_SPEC', validateLayoutSpecCollection],
    ['ui_adjustments', 'UI_ADJUSTMENTS', validateAdjustmentLog],
  ];
  for (const [fact, code, validator] of modelChecks) {
    const path = config.facts?.[fact];
    if (!path || !(await exists(resolve(cwd, path)))) {
      issues.push(issue(code, 'not_configured', `未配置 ${fact}`));
      continue;
    }
    try {
      for (const message of validator(await readStructured(resolve(cwd, path)))) issues.push(issue(code, 'failed', message));
    } catch (error) {
      issues.push(issue(code, 'failed', `${path} 无法解析：${error.message}`));
    }
  }
  return {
    adapter,
    issues,
    status: issues.some((item) => item.status === 'failed') ? 'failed' : issues.some((item) => item.status === 'not_configured') ? 'not_configured' : 'passed',
  };
}

export function validatePageFlowModel(model = {}) {
  const issues = [];
  if (model.schema !== 'page-flow-model/v1') issues.push('Page Flow Model schema 必须是 page-flow-model/v1');
  if (!Array.isArray(model.nodes) || !model.nodes.length) issues.push('Page Flow Model 至少包含一个节点');
  const ids = new Set((model.nodes || []).map((node) => node.id));
  for (const node of model.nodes || []) {
    if (!node.id || !node.type || !node.route) issues.push('每个页面节点必须包含 id、type 和 route');
    for (const transition of node.transitions || []) if (!ids.has(transition.target) && transition.target !== 'external') issues.push(`节点 ${node.id} 指向不存在的目标 ${transition.target}`);
  }
  return issues;
}

export function validateLayoutSpecCollection(collection = {}) {
  const issues = [];
  if (collection.schema !== 'layout-spec/v1') issues.push('Layout Spec schema 必须是 layout-spec/v1');
  if (!Array.isArray(collection.pages) || !collection.pages.length) issues.push('Layout Spec 至少包含一个页面');
  for (const page of collection.pages || []) {
    if (!page.id || !page.route || !page.layout?.content) issues.push('每个 Layout Spec 页面必须包含 id、route 和 layout.content');
    if (!Array.isArray(page.sections) || !page.sections.length) issues.push(`页面 ${page.id || '<missing>'} 至少包含一个 section`);
    for (const section of page.sections || []) if (!section.id || !section.semantic_component) issues.push(`页面 ${page.id || '<missing>'} 的 section 必须包含 id 和 semantic_component`);
    for (const reference of page.visual_references || []) {
      if (!reference.input_id || !reference.viewport?.width || !reference.viewport?.height || !reference.state) {
        issues.push(`页面 ${page.id || '<missing>'} 的视觉参考必须包含 input_id、viewport.width、viewport.height 和 state`);
      }
    }
  }
  return issues;
}

export function validateAdjustmentLog(log = {}) {
  const allowed = new Set(['token', 'component', 'layout', 'responsive', 'page_exception']);
  const issues = [];
  if (log.schema !== 'ui-adjustments/v1') issues.push('UI 调整记录 schema 必须是 ui-adjustments/v1');
  if (log.evaluation) {
    for (const key of ['generation_iterations', 'manual_adjustment_count']) {
      if (!Number.isInteger(log.evaluation[key]) || log.evaluation[key] < 0) issues.push(`UI 评估字段 ${key} 必须是非负整数`);
    }
  }
  for (const entry of log.adjustments || []) {
    if (!allowed.has(entry.type)) issues.push(`未知 UI 调整类型：${entry.type}`);
    if (!entry.scope || !entry.reason || !entry.source) issues.push('每条 UI 调整必须包含 scope、reason 和 source');
  }
  return issues;
}
