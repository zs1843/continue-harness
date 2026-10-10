import { createHash } from 'node:crypto';
import { access, readdir, readFile, stat } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

import YAML from 'yaml';
import { isHarnessPath, resolveHarnessDirectory, resolveHarnessPath } from './paths.mjs';

export const INPUT_TYPES = ['prd', 'rp', 'ui', 'api', 'assets'];

export const INPUT_TYPE_DISPLAY = {
  api: '接口输入',
  assets: '品牌与素材输入',
  prd: '产品需求输入',
  rp: '低保真原型输入',
  ui: '高保真 UI 输入',
};

export const INPUT_PRIORITY = {
  business: ['用户当前任务', '最新有效 PRD', '最新有效 RP', '最新有效 UI', '项目事实文档', 'Harness 默认模板', 'Agent 推断'],
  interaction: ['用户当前任务', '最新有效高保真 UI', '最新有效 RP', '最新有效 PRD', '项目已有实现', 'Harness 默认模板', 'Agent 推断'],
  token: ['高保真 UI', '低保真 RP', '用户当前任务临时视觉要求', '项目已有 Design Token', 'DESIGN.md 全局原则', 'Harness 默认 Token', 'Agent 推断'],
};

function inputPriorityForTypes(types) {
  const selected = new Set(types.filter(Boolean));
  const priority = {};
  if (selected.has('prd')) priority.business = INPUT_PRIORITY.business;
  if (selected.has('rp') || selected.has('ui')) priority.interaction = INPUT_PRIORITY.interaction;
  if (selected.has('rp') || selected.has('ui')) priority.token = INPUT_PRIORITY.token;
  return priority;
}

const PLACEHOLDER_INPUTS = [
  /^待补充产品需求。?$/m,
  /^待补充(?:需求|输入|内容)。?$/m,
  /^待确认(?:需求|输入|内容)。?$/m,
];

function isPlaceholderInput(source) {
  const normalized = source.trim();
  return PLACEHOLDER_INPUTS.some((pattern) => pattern.test(normalized));
}

const BUSINESS_PATTERNS = [
  ['amount', /金额|价格|费用|支付|退款|total|price|amount/i],
  ['permission', /权限|角色|认证|登录|租户|permission|role|auth/i],
  ['state', /状态|流程|审批|完成|失败|取消|state|status|flow/i],
  ['field', /字段|表单|校验|required|必填|field|validate/i],
];

const VISUAL_PATTERNS = [
  ['color', /颜色|色值|#[0-9a-f]{3,8}|rgb\(|color/i],
  ['font', /字体|字号|字重|行高|font|line-height/i],
  ['space', /间距|边距|padding|margin|gap/i],
  ['radius', /圆角|radius|border-radius/i],
  ['shadow', /阴影|shadow|box-shadow/i],
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function fileHash(path) {
  const content = await readFile(path);
  return createHash('sha256').update(content).digest('hex');
}

function extractLabeledFacts(source, type) {
  const facts = [];
  const text = source.slice(0, 200_000);
  const lines = text.split(/\r?\n/);
  for (const [index, line] of lines.entries()) {
    const trimmed = line.trim();
    const match = trimmed.match(/^[-*]?\s*([^:：]{2,40})\s*[:：]\s*(.{1,160})$/);
    if (match) {
      const key = match[1].replace(/[`*#]/g, '').trim();
      const value = match[2].replace(/<[^>]+>/g, '').trim();
      facts.push({ dimension: classifyFact(`${key} ${value}`, type), key, line: index + 1, type, value });
    }
  }
  return facts.slice(0, 80);
}

function classifyFact(text, type) {
  if (type === 'ui') {
    const visual = VISUAL_PATTERNS.find(([, pattern]) => pattern.test(text));
    if (visual) return `visual:${visual[0]}`;
  }
  if (type === 'rp') return 'interaction';
  if (!['prd', 'api', 'assets'].includes(type)) return `input:${type || 'unclassified'}`;
  const business = BUSINESS_PATTERNS.find(([, pattern]) => pattern.test(text));
  return business ? `business:${business[0]}` : `input:${type}`;
}

function detectFactConflicts(facts) {
  const issues = [];
  const byKey = new Map();
  for (const fact of facts) {
    const normalizedKey = fact.key.toLowerCase();
    const previous = byKey.get(normalizedKey);
    if (previous && previous.value !== fact.value) {
      issues.push({
        code: 'INPUT_FACT_CONFLICT',
        display_name: '冲突',
        message: `${previous.type.toUpperCase()} 与 ${fact.type.toUpperCase()} 对“${fact.key}”给出不同结论：${previous.value} / ${fact.value}`,
        status: 'conflict',
      });
    } else {
      byKey.set(normalizedKey, fact);
    }
  }
  return issues;
}

export async function analyzeInputs(cwd) {
  const inspection = await inspectInputs(cwd);
  const facts = [];
  for (const input of inspection.inputs) {
    if (!input.exists || input.status !== 'active') continue;
    const absolutePath = resolve(cwd, input.path);
    try {
      const source = await readFile(absolutePath, 'utf8');
      if (source.includes('\u0000') || source.includes('\uFFFD')) throw new Error('Non-text input');
      facts.push(...extractLabeledFacts(source, input.type).map((fact) => ({ ...fact, input_id: input.id, path: input.path })));
    } catch {
      facts.push({
        dimension: '待确认',
        input_id: input.id,
        key: '二进制或不可直接读取输入',
        path: input.path,
        type: input.type,
        value: '需要 Agent 人工解析',
      });
    }
  }
  const issues = [...inspection.issues, ...detectFactConflicts(facts)];
  return {
    facts,
    inputs: inspection.inputs,
    issues,
    priority: inspection.priority,
    status: issues.some((issue) => issue.status === 'failed' || issue.status === 'conflict')
      ? 'failed'
      : issues.length
        ? 'needs_confirmation'
        : 'passed',
  };
}

async function walk(directory) {
  if (!(await exists(directory))) return [];
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walk(path)));
    else output.push(path);
  }
  return output.sort();
}

export async function readInputManifest(cwd, manifestPath) {
  const resolved = manifestPath
    ? { absolutePath: resolve(cwd, manifestPath), relativePath: manifestPath }
    : await resolveHarnessPath(cwd, 'inputs/manifest.yaml');
  const absolutePath = resolved.absolutePath;
  if (!(await exists(absolutePath))) {
    return { exists: false, inputs: [], path: resolved.relativePath };
  }
  const source = await readFile(absolutePath, 'utf8');
  const manifest = YAML.parse(source) || {};
  return {
    exists: true,
    inputs: Array.isArray(manifest.inputs) ? manifest.inputs : [],
    path: resolved.relativePath,
    raw: manifest,
  };
}

function inferTypeFromPath(path) {
  const normalized = String(path || '').replaceAll('\\', '/');
  return INPUT_TYPES.find((type) => normalized.includes(`/inputs/${type}/`)
    && isHarnessPath(normalized));
}

export async function inspectInputs(cwd) {
  const manifest = await readInputManifest(cwd);
  const issues = [];
  const entries = [];
  const seenActive = new Map();

  for (const item of manifest.inputs) {
    const path = item.path;
    const type = item.type || inferTypeFromPath(path);
    const absolutePath = resolve(cwd, path || '');
    const present = Boolean(path) && (await exists(absolutePath));
    const hash = present ? await fileHash(absolutePath) : null;
    const changed = Boolean(item.sha256 && hash && item.sha256 !== hash);
    const key = `${type || 'unknown'}:${item.task_id || item.id || path}`;
    if (item.status === 'active') {
      const previous = seenActive.get(key);
      if (previous && !previous.supersedes?.includes?.(item.id)) {
        issues.push({
          code: 'INPUT_ACTIVE_CONFLICT',
          display_name: '冲突',
          message: `存在多个 active 输入：${previous.id} 与 ${item.id}`,
          status: 'conflict',
        });
      }
      seenActive.set(key, item);
    }
    if (typeof type !== 'string' || !/^[a-z][a-z0-9_-]*$/.test(type)) {
      issues.push({
        code: 'INPUT_TYPE_UNKNOWN',
        display_name: '待确认',
        message: `输入 ${item.id || path || '<unknown>'} 缺少有效类型`,
        status: 'needs_confirmation',
      });
    }
    if (!present) {
      issues.push({
        code: 'INPUT_FILE_MISSING',
        display_name: '失败',
        message: `输入文件不存在：${path || '<missing-path>'}`,
        status: 'failed',
      });
    }
    if (changed) {
      issues.push({
        code: 'INPUT_HASH_CHANGED',
        display_name: '待确认',
        message: `输入文件哈希已变化，需要重新分析：${path}`,
        status: 'needs_confirmation',
      });
    }
    if (present) {
      try {
        const source = await readFile(absolutePath, 'utf8');
        if (isPlaceholderInput(source)) {
          issues.push({
            code: 'INPUT_PLACEHOLDER',
            display_name: '失败',
            message: `输入仍是 Harness 占位内容，需要补充真实证据：${path}`,
            status: 'failed',
          });
        }
      } catch {
        // Binary inputs are valid evidence and are handled by the corresponding tool/agent.
      }
    }
    entries.push({
      ...item,
      changed,
      display_type: INPUT_TYPE_DISPLAY[type] || type || '待确认输入',
      exists: present,
      sha256: hash,
      type,
    });
  }

  const discovered = [];
  const harnessDirectory = await resolveHarnessDirectory(cwd);
  const inputRoot = resolve(cwd, harnessDirectory, 'inputs');
  const directories = (await exists(inputRoot)) ? (await readdir(inputRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name) : [];
  for (const type of new Set([...INPUT_TYPES, ...directories])) {
    const directory = resolve(cwd, harnessDirectory, 'inputs', type);
    for (const file of await walk(directory)) {
      if (file.endsWith('/README.md') || file.endsWith('\\README.md')) continue;
      if (file.endsWith('/metadata.yaml') || file.endsWith('\\metadata.yaml')) continue;
      const relativePath = relative(cwd, file);
      if (!entries.some((entry) => entry.path === relativePath)) {
        discovered.push({
          extension: extname(file).slice(1) || 'unknown',
          path: relativePath,
          type,
        });
      }
    }
  }
  if (discovered.length) {
    issues.push({
      code: 'INPUT_UNREGISTERED',
      display_name: '待确认',
      message: `发现 ${discovered.length} 个未登记输入，需要写入 manifest.yaml`,
      status: 'needs_confirmation',
    });
  }

  return {
    discovered,
    exists: manifest.exists,
    inputs: entries,
    issues,
    manifest: manifest.path,
    priority: inputPriorityForTypes([
      ...entries.map((entry) => entry.type),
      ...discovered.map((entry) => entry.type),
    ]),
    status: issues.some((issue) => issue.status === 'failed' || issue.status === 'conflict')
      ? 'failed'
      : issues.length
        ? 'needs_confirmation'
        : 'passed',
  };
}

export async function inspectTaskMetadata(cwd) {
  const harnessDirectory = await resolveHarnessDirectory(cwd);
  const modulesRoot = resolve(cwd, harnessDirectory, 'inputs/prd/modules');
  const modules = [];
  if (!(await exists(modulesRoot))) return { modules, status: 'not_configured' };
  for (const entry of await readdir(modulesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const metadataPath = resolve(modulesRoot, entry.name, 'metadata.yaml');
    const prdPath = resolve(modulesRoot, entry.name, 'PRD.md');
    const metadataExists = await exists(metadataPath);
    const prdExists = await exists(prdPath);
    const metadata = metadataExists ? YAML.parse(await readFile(metadataPath, 'utf8')) : {};
    modules.push({
      id: entry.name,
      metadata,
      metadata_exists: metadataExists,
      prd_exists: prdExists,
    });
  }
  return {
    modules,
    status: modules.length ? 'passed' : 'not_configured',
  };
}

export async function readFileSummary(path) {
  const info = await stat(path);
  return {
    bytes: info.size,
    mtime: info.mtime.toISOString(),
    sha256: await fileHash(path),
  };
}
