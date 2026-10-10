import { access, readFile, readdir } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

import YAML from 'yaml';

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readStructured(path) {
  const source = await readFile(path, 'utf8');
  if (path.endsWith('.json')) return JSON.parse(source);
  return YAML.parse(source);
}

function isTokenGroupEmpty(value) {
  if (!value || typeof value !== 'object') return true;
  const keys = Object.keys(value).filter((key) => key !== 'description');
  return keys.length === 0;
}

function tokenExtractionIssues(tokens = {}) {
  const issues = [];
  const tokenGroups = tokens.tokens && typeof tokens.tokens === 'object' ? tokens.tokens : {};
  const groups = Object.keys(tokenGroups);
  const emptyGroups = groups.filter((key) => isTokenGroupEmpty(tokenGroups[key]));
  const hasConcreteToken = groups.some((key) => !isTokenGroupEmpty(tokenGroups[key]));
  if (['pending_extraction', 'pending', 'candidate', 'inferred', 'needs_confirmation'].includes(tokens.status) || !hasConcreteToken) {
    issues.push({
      code: 'DESIGN_TOKEN_PENDING_EXTRACTION',
      display_name: '待确认',
      message: 'Design Token 仍待从 UI/RP 输入提炼',
      status: 'needs_confirmation',
    });
  }
  if (emptyGroups.length) {
    issues.push({
      code: 'DESIGN_TOKEN_EMPTY_GROUP',
      display_name: '待确认',
      message: `Token 分组尚未提炼：${emptyGroups.join(', ')}`,
      status: 'needs_confirmation',
    });
  }
  return issues;
}

export async function inspectDesignTokens(cwd, config = {}) {
  const configured = config.facts?.design_tokens || config.design?.tokens;
  const candidates = [
    configured,
    'docs/design/tokens.json',
    'docs/design/tokens.yaml',
    'docs/design/tokens.yml',
  ].filter(Boolean);
  const uniqueCandidates = [...new Set(candidates)];
  const present = [];
  for (const path of uniqueCandidates) {
    const absolutePath = resolve(cwd, path);
    if (await exists(absolutePath)) present.push(path);
  }
  if (!present.length) {
    return {
      issues: [
        {
          code: 'DESIGN_TOKEN_SOURCE',
          display_name: '未配置',
          message: '未配置独立 Design Token 真值文件',
          status: 'not_configured',
        },
      ],
      source: null,
      status: 'not_configured',
    };
  }
  if (present.length > 1) {
    return {
      issues: [
        {
          code: 'DESIGN_TOKEN_MULTIPLE_SOURCES',
          display_name: '冲突',
          message: `存在多个 Token 真值文件：${present.join(', ')}`,
          status: 'conflict',
        },
      ],
      sources: present,
      status: 'failed',
    };
  }
  const sourcePath = present[0];
  try {
    const tokens = await readStructured(resolve(cwd, sourcePath));
    const missing = ['version', 'updated_at', 'sources', 'tokens'].filter((key) => tokens?.[key] === undefined);
    if (config.ui?.system && config.ui.system.status !== 'not_configured' && tokens?.schema !== 'semantic-design-tokens/v1') {
      missing.push('schema=semantic-design-tokens/v1');
    }
    const issues = [
      ...missing.map((key) => ({
        code: 'DESIGN_TOKEN_FIELD',
        display_name: '待确认',
        message: `Token 文件缺少字段：${key}`,
        status: 'needs_confirmation',
      })),
      ...tokenExtractionIssues(tokens),
    ];
    return {
      issues,
      source: sourcePath,
      status: issues.length ? 'needs_confirmation' : 'passed',
      tokens,
    };
  } catch (error) {
    return {
      issues: [
        {
          code: 'DESIGN_TOKEN_PARSE',
          display_name: '失败',
          message: `Token 文件无法解析：${error instanceof Error ? error.message : String(error)}`,
          status: 'failed',
        },
      ],
      source: sourcePath,
      status: 'failed',
    };
  }
}

export function diffDesignTokens(before = {}, after = {}) {
  const beforeTokens = before.tokens || {};
  const afterTokens = after.tokens || {};
  const changes = [];
  for (const key of new Set([...Object.keys(beforeTokens), ...Object.keys(afterTokens)])) {
    if (!(key in beforeTokens)) {
      changes.push({ after: afterTokens[key], before: null, key, type: '新增 Token' });
    } else if (!(key in afterTokens)) {
      changes.push({ after: null, before: beforeTokens[key], key, type: '删除 Token' });
    } else if (JSON.stringify(beforeTokens[key]) !== JSON.stringify(afterTokens[key])) {
      changes.push({ after: afterTokens[key], before: beforeTokens[key], key, type: '修改 Token' });
    }
  }
  return changes;
}

const STYLE_EXTENSIONS = new Set(['.css', '.less', '.scss', '.sass', '.vue']);
const TOKEN_PROPERTY_GROUPS = [
  [/^(?:color|background(?:-color)?|border-(?:top-|right-|bottom-|left-)?color)$/, 'color'],
  [/^font-family$/, 'font_family'],
  [/^font-size$/, 'font_size'],
  [/^font-weight$/, 'font_weight'],
  [/^line-height$/, 'line_height'],
  [/^(?:margin|padding|gap|row-gap|column-gap)(?:-.+)?$/, 'space'],
  [/^border-radius$/, 'radius'],
  [/^box-shadow$/, 'shadow'],
  [/^border(?:-.+)?$/, 'border'],
  [/^(?:height|min-height|max-height)$/, 'control_height'],
  [/^z-index$/, 'z_index'],
  [/^(?:transition|animation)(?:-.+)?$/, 'motion'],
];

async function styleFiles(root, directory = root) {
  if (!(await exists(directory))) return [];
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'tmp', '.git'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await styleFiles(root, path)));
    else if (STYLE_EXTENSIONS.has(extname(entry.name))) files.push(path);
  }
  return files;
}

export async function discoverDesignTokenCandidates(cwd, { sourceDirectories = ['src'] } = {}) {
  const records = new Map();
  const variables = new Map();
  const add = (group, key, value, path, line) => {
    const id = `${group}\u0000${key}\u0000${value}`;
    const current = records.get(id) || { count: 0, evidence: [], group, key, value };
    current.count += 1;
    if (current.evidence.length < 5) current.evidence.push({ line, path: relative(cwd, path) });
    records.set(id, current);
  };
  let scannedFiles = 0;
  for (const directory of sourceDirectories) {
    for (const path of await styleFiles(resolve(cwd, directory))) {
      scannedFiles += 1;
      const lines = (await readFile(path, 'utf8')).split(/\r?\n/);
      lines.forEach((line, index) => {
        for (const match of line.matchAll(/(--[\w-]+)\s*:\s*([^;}{]+)/g)) {
          const current = variables.get(match[1]) || { count: 0, evidence: [], name: match[1], value: match[2].trim() };
          current.count += 1;
          if (current.evidence.length < 5) current.evidence.push({ line: index + 1, path: relative(cwd, path) });
          variables.set(match[1], current);
        }
        for (const match of line.matchAll(/([a-z-]+)\s*:\s*([^;}{]+)/g)) {
          const property = match[1];
          if (property.startsWith('--')) continue;
          const group = TOKEN_PROPERTY_GROUPS.find(([pattern]) => pattern.test(property))?.[1];
          if (group) add(group, property, match[2].trim(), path, index + 1);
        }
        for (const match of line.matchAll(/@media[^\n]*(?:min|max)-width\s*:\s*([^)]+)/g)) add('breakpoint', 'viewport', match[1].trim(), path, index + 1);
      });
    }
  }
  const candidates = [...records.values()].sort((a, b) => b.count - a.count || a.group.localeCompare(b.group));
  return {
    candidates,
    cssVariables: [...variables.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    scannedFiles,
    status: scannedFiles ? 'needs_confirmation' : 'not_configured',
    summary: scannedFiles ? `从 ${scannedFiles} 个样式源文件发现 ${candidates.length} 个候选值和 ${variables.size} 个 CSS 变量` : '未发现可扫描的存量样式文件',
  };
}
