import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function issue(code, status, message, suggestion) {
  return { code, status, message, ...(suggestion ? { suggestion } : {}) };
}

const allowedStatuses = new Set(['stable', 'candidate', 'pending', 'legacy', 'page-specific', 'pending_extraction', 'inferred', 'needs_confirmation']);

async function collectVueFiles(root, current = root, files = []) {
  if (!(await exists(current))) return files;
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const path = resolve(current, entry.name);
    if (entry.isDirectory()) await collectVueFiles(root, path, files);
    else if (entry.isFile() && entry.name.endsWith('.vue')) files.push(path);
  }
  return files;
}

export async function scanUiComponentInventory(cwd) {
  const roots = ['src/components', 'src/component', 'src/widgets', 'src/pages'];
  const files = [];
  for (const root of roots) await collectVueFiles(resolve(cwd, root), resolve(cwd, root), files);
  const unique = [...new Set(files)].sort();
  const rows = unique.map((path) => {
    const relative = path.slice(cwd.length + 1);
    const type = relative.startsWith('src/pages/') ? 'page-local' : 'shared';
    return { name: relative.split('/').pop().replace(/\.vue$/, ''), path: relative, state: 'protected', type };
  });
  return { roots, count: rows.length, components: rows };
}

export function renderUiComponentInventory(inventory) {
  const rows = inventory.components.length
    ? inventory.components.map((item) => `| ${item.name} | ${item.path} | ${item.type} | 待扫描 | \`${item.state}\` | 待确认 | 待确认 | 自动扫描 |`).join('\n')
    : '| 暂无 | 暂无 | 暂无 | 待确认 | `protected` | 待确认 | 待确认 | 未发现 Vue 组件 |';
  return `# UI Component Inventory\n\n本清单由 Harness 只读扫描生成。已有组件默认属于 \`protected\`，修改前必须遵守 \`UI-COMPONENT-BOUNDARIES.md\`。\n\n| 名称 | 路径 | 类型 | 使用页面 | 状态 | 公开接口 | 视觉状态 | 备注 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${rows}\n`;
}

export async function inspectUiContract(cwd, config = {}) {
  if (config.project?.product_type !== 'consumer_h5') return { enabled: false, issues: [] };
  const required = [
    'docs/UI-CONTRACT-ADOPTION.md',
    'docs/UI-COMPONENT-INVENTORY.md',
    'docs/UI-COMPONENT-BOUNDARIES.md',
    'docs/ui-contract-evidence/README.md',
  ];
  const missing = [];
  for (const path of required) if (!(await exists(resolve(cwd, path)))) missing.push(path);
  const issues = [];
  if (missing.length) {
    issues.push(issue('UI_CONTRACT_FILES', 'not_configured', `UI Contract 文件尚未完整配置：${missing.join(', ')}`, '运行 continue-harness init 补齐 UI Contract 模板'));
  } else {
    const inventory = await readFile(resolve(cwd, 'docs/UI-COMPONENT-INVENTORY.md'), 'utf8');
    if (inventory.includes('待扫描')) {
      issues.push(issue('UI_COMPONENT_INVENTORY', 'needs_confirmation', 'UI 组件清单仍待扫描，已有组件保护基线尚未确认', '扫描项目组件并更新 docs/UI-COMPONENT-INVENTORY.md'));
    } else {
      issues.push(issue('UI_COMPONENT_INVENTORY', 'passed', 'UI 组件保护清单已建立'));
    }
    const adoption = await readFile(resolve(cwd, 'docs/UI-CONTRACT-ADOPTION.md'), 'utf8');
    issues.push(adoption.includes('`confirmed`') ? issue('UI_CONTRACT_ADOPTION', 'passed', 'UI Contract 采用记录已确认') : issue('UI_CONTRACT_ADOPTION', 'needs_confirmation', 'UI Contract 采用记录仍待用户确认', '完成首次 UI Contract 扫描并记录确认结果'));
  }
  const tokenPath = resolve(cwd, 'docs/design/tokens.json');
  const externalTokenPath = resolve(cwd, 'docs/design-tokens.json');
  if (!(await exists(tokenPath)) && (await exists(externalTokenPath))) {
    issues.push(issue('UI_TOKEN_EXTERNAL_PATH', 'needs_confirmation', '检测到外部 UI Contract Token 文件 docs/design-tokens.json，尚未迁移到 Harness 真值路径', '确认唯一 Token 真值后迁移到 docs/design/tokens.json'));
  }
  if (await exists(tokenPath)) {
    try {
      const tokens = JSON.parse(await readFile(tokenPath, 'utf8'));
      const status = tokens.status;
      const valid = status === undefined || allowedStatuses.has(status);
      issues.push(valid ? issue('UI_TOKEN_STATUS', status === 'stable' ? 'passed' : 'needs_confirmation', `Design Token 状态：${status || '未声明'}`, status === 'stable' ? undefined : '确认 Token 后标记为 stable') : issue('UI_TOKEN_STATUS', 'failed', `Design Token 状态不受支持：${status}`, '使用 stable、candidate、pending、legacy 或 page-specific'));
      if (await exists(externalTokenPath)) issues.push(issue('UI_TOKEN_DUPLICATE', 'failed', '同时存在 docs/design/tokens.json 和 docs/design-tokens.json，Token 真值不唯一', '迁移后只保留一个机器可读 Token 真值文件'));
    } catch {
      issues.push(issue('UI_TOKEN_STATUS', 'failed', 'Design Token 文件不是有效 JSON', '修复 docs/design/tokens.json 后重新运行 doctor'));
    }
  }
  return { enabled: true, issues };
}
