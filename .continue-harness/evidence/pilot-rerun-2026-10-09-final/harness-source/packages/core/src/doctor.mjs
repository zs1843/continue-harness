import { access, readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { basename, dirname, resolve } from 'node:path';

import { discoverDesignTokenCandidates, inspectDesignTokens } from './design.mjs';
import { inspectInputs, inspectTaskMetadata } from './inputs.mjs';
import { resolveHarnessDirectory, resolveHarnessPath } from './paths.mjs';
import { displayStatus } from './status.mjs';
import { inspectUiGovernance } from './ui-system.mjs';
import { inspectUiContract } from './ui-contract.mjs';
import { inspectIntake } from './intake.mjs';

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function hasDirectoryMatching(directory, predicate) {
  if (!(await exists(directory))) return false;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && predicate(entry.name)) return true;
  }
  return false;
}

async function hasFileMatching(directory, predicate) {
  if (!(await exists(directory))) return false;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isFile() && predicate(entry.name)) return true;
    if (entry.isDirectory() && (await hasFileMatching(path, predicate))) return true;
  }
  return false;
}

function result(code, name, status, message, suggestion) {
  return { code, display_name: displayStatus(status), message, name, status, ...(suggestion ? { suggestion } : {}) };
}

const CONSUMER_H5_PRODUCT_TYPE = 'consumer_h5';

// consumer-h5 is today's only product profile with fixed directory and file conventions.
// Every other product type still runs the universal checks instead of a blanket "not_applicable",
// Doctor reports configured structural checks; it does not replace task acceptance.
function isConsumerH5(config) {
  return config?.project?.product_type === CONSUMER_H5_PRODUCT_TYPE;
}

function hasDependency(packageJson, name) {
  return Boolean(packageJson.dependencies?.[name] || packageJson.devDependencies?.[name]);
}

async function findUp(start, names, maxDepth = 5) {
  let directory = start;
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    for (const name of names) {
      const candidate = resolve(directory, name);
      if (await exists(candidate)) return candidate;
    }
    const parent = dirname(directory);
    if (parent === directory) break;
    directory = parent;
  }
  return null;
}

async function checkOpenApi(cwd, config) {
  const source = config.sources?.api;
  if (!source) {
    return result(
      'OPENAPI_SNAPSHOT',
      'openapi-snapshot',
      'not_configured',
      '未配置 OpenAPI Snapshot',
    );
  }
  const snapshotPath = resolve(cwd, source.snapshot);
  if (!(await exists(snapshotPath))) {
    return result(
      'OPENAPI_SNAPSHOT',
      'openapi-snapshot',
      'failed',
      `缺少 OpenAPI Snapshot：${source.snapshot}`,
      '从 Apifox 导出 OpenAPI JSON 到配置路径',
    );
  }
  try {
    const document = JSON.parse(await readFile(snapshotPath, 'utf8'));
    const version = document.openapi || document.swagger;
    const validVersion =
      (typeof document.openapi === 'string' && document.openapi.startsWith('3.')) ||
      document.swagger === '2.0';
    if (!validVersion || !document.paths || typeof document.paths !== 'object') {
      return result(
        'OPENAPI_SNAPSHOT',
        'openapi-snapshot',
        'failed',
        'OpenAPI Snapshot 缺少受支持的版本或 paths 对象',
        '从 Apifox 重新导出 OpenAPI 3.x JSON',
      );
    }
    return result(
      'OPENAPI_SNAPSHOT',
      'openapi-snapshot',
      'passed',
      `OpenAPI ${version} Snapshot 可解析`,
    );
  } catch {
    return result(
      'OPENAPI_SNAPSHOT',
      'openapi-snapshot',
      'failed',
      'OpenAPI Snapshot 不是有效 JSON',
      '首版仅接受 Apifox 导出的 OpenAPI JSON',
    );
  }
}

async function checkApiGeneration(cwd) {
  const metadataPath = (await resolveHarnessPath(cwd, 'api/generated.json')).absolutePath;
  if (!(await exists(metadataPath))) {
    return result('API_GENERATION', 'api-generation', 'not_configured', '尚未生成任务级接口代码');
  }
  try {
    const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
    const mismatches = [];
    for (const [path, record] of Object.entries(metadata.outputs || {})) {
      const target = resolve(cwd, path);
      if (!(await exists(target))) { mismatches.push(path); continue; }
      const digest = createHash('sha256').update(await readFile(target)).digest('hex');
      if (digest !== record.sha256) mismatches.push(path);
    }
    return result(
      'API_GENERATION',
      'api-generation',
      mismatches.length ? 'failed' : 'passed',
      mismatches.length ? `生成文件已丢失或被修改：${mismatches.join(', ')}` : `任务 ${metadata.task_id} 的接口生成文件完整`,
      mismatches.length ? '运行 continue-harness api generate --task <任务号> --dry-run，迁移手工改动后重新生成' : undefined,
    );
  } catch {
    return result('API_GENERATION', 'api-generation', 'failed', '接口生成元数据无效');
  }
}

async function checkUniAppPageRegistry(cwd, relativePath) {
  const absolutePath = resolve(cwd, relativePath);
  if (!(await exists(absolutePath))) {
    return result(
      'UNI_APP_PAGE_REGISTRY',
      'uni-app-page-registry',
      'failed',
      `缺少 uni-app 页面注册文件 ${relativePath}`,
    );
  }
  try {
    const registry = JSON.parse(await readFile(absolutePath, 'utf8'));
    if (!Array.isArray(registry.pages) || !registry.pages.length) {
      throw new Error('pages 不能为空');
    }
    const invalidPages = [];
    for (const page of registry.pages) {
      if (typeof page?.path !== 'string' || !page.path.trim()) {
        invalidPages.push('<missing-path>');
        continue;
      }
      const componentPath = resolve(cwd, 'src', `${page.path}.vue`);
      if (!(await exists(componentPath))) invalidPages.push(page.path);
    }
    if (invalidPages.length) {
      return result(
        'UNI_APP_PAGE_REGISTRY',
        'uni-app-page-registry',
        'failed',
        `页面注册缺少对应组件：${invalidPages.join(', ')}`,
        '修正 src/pages.json 或创建对应的 Vue 页面文件',
      );
    }
    return result(
      'UNI_APP_PAGE_REGISTRY',
      'uni-app-page-registry',
      'passed',
      `${relativePath} 注册了 ${registry.pages.length} 个有效页面`,
    );
  } catch (error) {
    return result(
      'UNI_APP_PAGE_REGISTRY',
      'uni-app-page-registry',
      'failed',
      `${relativePath} 无效：${error instanceof Error ? error.message : String(error)}`,
      '使用有效 JSON 并至少注册一个页面',
    );
  }
}

async function checkAgentWorkflow(cwd, config) {
  const agentEntry = config.facts?.agent_entry || 'AGENTS.md';
  const agentGuidePath = resolve(cwd, agentEntry);
  const guidePresent = await exists(agentGuidePath);
  if (!guidePresent) {
    return result(
      'AGENT_WORKFLOW',
      'agent-workflow',
      'failed',
      `缺少唯一 Agent 约束本体 ${agentEntry}`,
      '重新执行 continue-harness plan init，并在无冲突后执行 continue-harness init',
    );
  }
  const guide = await readFile(agentGuidePath, 'utf8');
  const workflowText = guide;
  const commandGroups = [
    { label: 'continue-harness inspect', commands: ['continue-harness inspect'] },
    { label: 'continue-harness doctor', commands: ['continue-harness doctor', 'harness:doctor'] },
    { label: 'continue-harness verify', commands: ['continue-harness verify', 'harness:quick', 'pnpm harness:'] },
    { label: '任务快照', commands: ['task snapshot', '任务快照'] },
    { label: '输入清单', commands: ['manifest.yaml', '输入清单'] },
  ];
  const missing = commandGroups
    .filter(({ commands }) => !commands.some((command) => workflowText.includes(command)))
    .map(({ label }) => label);
  return result(
    'AGENT_WORKFLOW',
    'agent-workflow',
    missing.length ? 'needs_confirmation' : 'passed',
    missing.length ? `Agent 约束文档尚未说明：${missing.join(', ')}` : 'Agent 工作流已在项目约束文档中说明',
    missing.length ? '在 Agent 约束文档中补充对应的任务与验证约定' : undefined,
  );
}

async function checkAgentAdapters(cwd, config) {
  const canonicalPath = resolve(cwd, config.facts?.agent_entry || 'AGENTS.md');
  if (!(await exists(canonicalPath))) {
    return result('AGENT_ADAPTERS', 'agent-adapters', 'failed', '缺少唯一 Agent 约束本体 AGENTS.md');
  }
  const claudePath = resolve(cwd, 'CLAUDE.md');
  const cursorPath = resolve(cwd, '.cursor/rules/continue-harness.mdc');
  const missing = [];
  if (!(await exists(claudePath))) missing.push('CLAUDE.md');
  if (!(await exists(cursorPath))) missing.push('.cursor/rules/continue-harness.mdc');
  if (missing.length) {
    return result(
      'AGENT_ADAPTERS',
      'agent-adapters',
      'not_configured',
      `供应商适配尚未完整配置：${missing.join(', ')}`,
      '执行 continue-harness plan init，确认后执行 continue-harness init；或运行 continue-harness skills install --project --provider all',
    );
  }
  const [claude, cursor] = await Promise.all([
    readFile(claudePath, 'utf8'),
    readFile(cursorPath, 'utf8'),
  ]);
  const invalid = [];
  if (!claude.includes('@AGENTS.md')) invalid.push('CLAUDE.md 未导入 AGENTS.md');
  if (!cursor.includes('AGENTS.md') || !cursor.includes('alwaysApply: true')) {
    invalid.push('Cursor Rule 未始终指向 AGENTS.md');
  }
  if (claude.length > 2000 || cursor.length > 2000) invalid.push('供应商适配文件过大，可能复制了约束正文');
  return result(
    'AGENT_ADAPTERS',
    'agent-adapters',
    invalid.length ? 'needs_confirmation' : 'passed',
    invalid.length
      ? `供应商适配可能偏离唯一约束本体：${invalid.join('；')}`
      : 'Codex、Claude Code 和 Cursor 均指向唯一约束本体 AGENTS.md',
    invalid.length ? '将供应商文件收敛为只导入或指向 AGENTS.md 的薄适配层' : undefined,
  );
}

async function checkInputs(cwd, config) {
  const inspection = await inspectInputs(cwd);
  const results = [
    result(
      'INPUT_MANIFEST',
      'input-manifest',
      inspection.exists ? 'passed' : 'not_configured',
      inspection.exists ? '输入清单 manifest.yaml 已存在' : `未配置输入清单 ${inspection.manifest}`,
      inspection.exists ? undefined : '执行模板升级，或手动创建标准输入目录和 manifest.yaml',
    ),
  ];
  if (isConsumerH5(config)) {
    // Fixed directories are the consumer-h5 scaffold example, not a whitelist of valid types.
    for (const type of ['prd', 'rp', 'ui', 'api', 'assets']) {
      const readme = `${await resolveHarnessDirectory(cwd)}/inputs/${type}/README.md`;
      const present = await exists(resolve(cwd, readme));
      results.push(
        result(
          'INPUT_DIRECTORY',
          `input:${type}`,
          present ? 'passed' : 'not_configured',
          present ? `${readme} 已存在` : `缺少 ${readme}`,
        ),
      );
    }
  } else {
    const readme = `${await resolveHarnessDirectory(cwd)}/inputs/README.md`;
    const present = await exists(resolve(cwd, readme));
    results.push(
      result(
        'INPUT_REGISTRY',
        'input-registry',
        present ? 'passed' : 'not_configured',
        present ? `${readme} 已存在` : `缺少 ${readme}`,
        present ? undefined : '创建输入清单说明并说明如何登记本次任务的输入，类型可按项目自定义',
      ),
    );
  }
  for (const issue of inspection.issues) {
    results.push(result(issue.code, issue.code.toLowerCase(), issue.status, issue.message));
  }
  return results;
}

async function checkTaskAndHistory(cwd, config) {
  const results = [];
  const historyRoot = resolve(cwd, 'docs/history');
  const historyPresent = await exists(historyRoot);
  results.push(
    result(
      'HISTORY_ROOT',
      'history-root',
      historyPresent ? 'passed' : 'not_configured',
      historyPresent ? '历史根目录 docs/history 已存在' : '未创建历史根目录 docs/history',
      historyPresent ? undefined : '创建 docs/history 记录任务与变更历史',
    ),
  );
  const snapshotRoot = resolve(cwd, 'docs/history/tasks');
  const snapshotRootPresent = await exists(snapshotRoot);
  results.push(
    result(
      'TASK_SNAPSHOT_ROOT',
      'task-snapshot-root',
      snapshotRootPresent ? 'passed' : 'not_configured',
      snapshotRootPresent ? '任务快照目录已存在' : '未创建任务快照目录 docs/history/tasks',
      snapshotRootPresent ? undefined : '首次执行 continue-harness task snapshot 时会创建该目录',
    ),
  );
  if (snapshotRootPresent) {
    const required = ['SNAPSHOT.md', 'context.json', 'files.json', 'verification.json'];
    const incomplete = [];
    let legacy = 0;
    for (const task of await readdir(snapshotRoot, { withFileTypes: true })) {
      if (!task.isDirectory()) continue;
      for (const snapshot of await readdir(resolve(snapshotRoot, task.name), { withFileTypes: true })) {
        if (!snapshot.isDirectory()) continue;
        const root = resolve(snapshotRoot, task.name, snapshot.name);
        let oldFormat = false;
        try {
          const verification = JSON.parse(await readFile(resolve(root, 'verification.json'), 'utf8'));
          oldFormat = !verification.report?.context && await exists(resolve(root, 'design-token-diff.json'));
        } catch { /* Missing files are reported below. */ }
        if (oldFormat) legacy++;
        for (const file of required) {
          if (file === 'context.json' && oldFormat) continue;
          if (!(await exists(resolve(snapshotRoot, task.name, snapshot.name, file)))) {
            incomplete.push(`${task.name}/${snapshot.name}/${file}`);
          }
        }
      }
    }
    results.push(
      result(
        'TASK_SNAPSHOT_INTEGRITY',
        'task-snapshot-integrity',
        incomplete.length ? 'failed' : 'passed',
        incomplete.length
          ? `任务快照缺少记录文件：${incomplete.slice(0, 5).join(', ')}`
          : '任务快照均保留快照、文件清单、验证结果与上下文记录',
        incomplete.length ? '重新执行 continue-harness task snapshot，避免手工删改快照记录' : undefined,
      ),
    );
    if (legacy) results.push(result('TASK_SNAPSHOT_LEGACY', 'task-snapshot-legacy', 'not_configured',
      `${legacy} 个旧格式快照缺少当前上下文绑定，仅作历史记录；请新建快照，不修改旧快照`));
  }
  if (!isConsumerH5(config)) return results;
  const paths = [
    ['PRD_HISTORY', 'prd-history', 'docs/history/PRD_HISTORY.md'],
    ['CHANGE_HISTORY', 'change-history', 'docs/history/CHANGE_HISTORY.md'],
    ['IMPLEMENTATION_COVERAGE', 'implementation-coverage', 'docs/IMPLEMENTATION_COVERAGE.md'],
  ];
  for (const [code, name, path] of paths) {
    const present = await exists(resolve(cwd, path));
    results.push(
      result(
        code,
        name,
        present ? 'passed' : 'not_configured',
        present ? `${path} 已存在` : `缺少 ${path}`,
      ),
    );
  }
  const metadata = await inspectTaskMetadata(cwd);
  results.push(
    result(
      'PRD_TASK_MODULES',
      'prd-task-modules',
      metadata.status === 'passed' ? 'passed' : 'not_configured',
      metadata.status === 'passed'
        ? `发现 ${metadata.modules.length} 个 PRD 任务模块`
        : '未配置模块化 PRD 任务目录',
    ),
  );
  return results;
}

async function checkDesignGovernance(cwd, config) {
  if (!isConsumerH5(config) && !config.facts?.design_tokens && !config.design?.tokens
    && !(config.ui?.system && config.ui.system.status !== 'not_configured')) {
    return [result('DESIGN_GOVERNANCE', 'design-governance', 'not_applicable', '项目未启用设计治理')];
  }
  const tokenInspection = await inspectDesignTokens(cwd, config);
  const results = [
    result(
      'DESIGN_TOKEN_SOURCE',
      'design-token-source',
      tokenInspection.status === 'passed' ? 'passed' : tokenInspection.status,
      tokenInspection.source
        ? `Design Token 真值文件：${tokenInspection.source}`
        : '未找到独立机器可读 Design Token 真值文件',
      tokenInspection.source ? undefined : '在 docs/design/tokens.json 中记录唯一 Token 真值',
    ),
  ];
  for (const issue of tokenInspection.issues || []) {
    if (issue.code === 'DESIGN_TOKEN_SOURCE') continue;
    results.push(result(issue.code, issue.code.toLowerCase(), issue.status, issue.message));
  }
  const discovery = await discoverDesignTokenCandidates(cwd);
  if (tokenInspection.status !== 'passed' && discovery.scannedFiles) {
    results.push(result(
      'DESIGN_TOKEN_EXISTING_STYLE_CANDIDATES',
      'design-token-existing-style-candidates',
      'needs_confirmation',
      discovery.summary,
      '运行 continue-harness design tokens discover --json，确认存量风格后写入语义 Token 真值',
    ));
  }
  return results;
}

async function checkVisualGovernance(cwd, config) {
  const visual = config.verify?.visual;
  const configured = visual && visual.status !== 'not_configured' && Array.isArray(visual.commands) && visual.commands.length;
  const baselinePresent =
    (await hasFileMatching(resolve(cwd, 'tests/e2e/__screenshots__'), (name) => name.endsWith('.png'))) ||
    ((await hasDirectoryMatching(resolve(cwd, 'tests/e2e'), (name) => name.endsWith('-snapshots'))) &&
      (await hasFileMatching(resolve(cwd, 'tests/e2e'), (name) => name.endsWith('.png')))) ||
    ((await hasFileMatching(resolve(cwd, 'tests/visual/baselines'), (name) => name.endsWith('.png'))) && String(config.commands?.visual || '').includes('test:visual')) ||
    ((await exists(resolve(cwd, 'tests/e2e'))) && String(config.commands?.visual || '').includes('toHaveScreenshot'));
  return result(
    'VISUAL_BASELINE',
    'visual-baseline',
    baselinePresent ? 'passed' : 'not_configured',
    baselinePresent
      ? '视觉回归基础设施已配置'
      : configured
        ? '已配置 visual 命令，但未检测到已确认截图基线'
        : '视觉回归未配置',
    baselinePresent ? undefined : '提供 tests/visual 或 Playwright screenshot 基线，并配置显式更新命令',
  );
}

export async function runDoctor(cwd, config) {
  const results = [];
  const nodeMajor = Number(process.versions.node.split('.')[0]);
  results.push(
    result(
      'RUNTIME_NODE_VERSION',
      'node-version',
      nodeMajor >= 20 ? 'passed' : 'failed',
      nodeMajor >= 20 ? `Node.js ${process.versions.node} 满足要求` : `Node.js ${process.versions.node} 低于 20`,
      nodeMajor >= 20 ? undefined : '使用 Node.js 20 或更高版本',
    ),
  );
  const packageJsonPath = resolve(cwd, 'package.json');
  const packageJsonPresent = await exists(packageJsonPath);
  results.push(
    result(
      'PROJECT_PACKAGE_JSON',
      'package-json',
      packageJsonPresent ? 'passed' : config.harness?.mode === 'generic' ? 'not_configured' : 'failed',
      packageJsonPresent ? 'package.json 已存在' : '缺少 package.json',
    ),
  );

  for (const [name, relativePath] of Object.entries(config.facts || {})) {
    if (!relativePath || Array.isArray(relativePath)) continue;
    const present = await exists(resolve(cwd, relativePath));
    results.push(
      result(
        'PROJECT_FACT',
        `fact:${name}`,
        present ? 'passed' : 'failed',
        present ? `${relativePath} 已存在` : `缺少事实来源 ${relativePath}`,
      ),
    );
  }

  const packageJson = packageJsonPresent
    ? JSON.parse(await readFile(packageJsonPath, 'utf8'))
    : {};
  const configuredTestCommand = String(config.commands?.unit_test || packageJson.scripts?.test || '');
  const configuredScript = configuredTestCommand.match(/^(?:pnpm|npm run|yarn) ([\w:-]+)/)?.[1];
  const testCommand = configuredScript && packageJson.scripts?.[configuredScript]
    ? String(packageJson.scripts[configuredScript])
    : configuredTestCommand;
  const vitestConfigs = ['vitest.config.ts', 'vitest.config.js', 'vitest.config.mts', 'vitest.config.mjs'];
  let vitestConfig;
  for (const name of vitestConfigs) {
    if (await exists(resolve(cwd, name))) {
      vitestConfig = name;
      break;
    }
  }
  if (vitestConfig) {
    const source = await readFile(resolve(cwd, vitestConfig), 'utf8');
    const overlapsE2e =
      source.includes("tests/**/*.{test,spec}.ts") && !source.includes("tests/e2e/**");
    results.push(
      result(
        'TEST_ISOLATION',
        'test-isolation',
        overlapsE2e ? 'failed' : 'passed',
        overlapsE2e ? 'Vitest 可能会加载 tests/e2e 下的 Playwright 用例' : '测试目录已隔离',
        overlapsE2e ? '在 Vitest 配置中排除 tests/e2e/**' : undefined,
      ),
    );
  } else if (/node\s+--test(?:\s|$)/.test(testCommand)) {
    results.push(result('TEST_ISOLATION', 'test-isolation', 'passed', 'Node.js test runner 使用显式测试命令'));
  } else if (/playwright\s+test/.test(testCommand)) {
    results.push(result('TEST_ISOLATION', 'test-isolation', 'needs_confirmation', '主测试命令直接运行 Playwright，请确认未混入单元测试'));
  } else {
    results.push(
      result('TEST_ISOLATION_NOT_CONFIGURED', 'test-isolation', 'not_configured', '未识别可判断隔离性的测试运行器配置'),
    );
  }

  const enginesNode = packageJson.engines?.node;
  results.push(result(
    'NODE_ENGINE_DECLARATION',
    'node-engine-declaration',
    enginesNode && /20|>=\s*20|\^20/.test(enginesNode) ? 'passed' : 'not_configured',
    enginesNode ? `package.json 声明 Node.js ${enginesNode}` : 'package.json 未声明 engines.node',
    enginesNode ? undefined : '在 package.json 中声明 engines.node >=20',
  ));

  const ciCandidates = ['.gitlab-ci.yml', '.github/workflows', 'Jenkinsfile'];
  const ciEntry = [];
  for (const candidate of ciCandidates) if (await exists(resolve(cwd, candidate))) ciEntry.push(candidate);
  results.push(result(
    'CI_ENTRY_POINT',
    'ci-entry-point',
    ciEntry.length ? 'passed' : 'not_configured',
    ciEntry.length ? `检测到 CI 入口：${ciEntry.join(', ')}` : '未检测到 CI 入口',
    ciEntry.length ? undefined : '配置 GitLab CI、GitHub Actions 或 Jenkins 入口并执行 Harness gate',
  ));

  const packageManager = config.stack?.package_manager;
  if (packageManager) {
    const lockfileNames = {
      npm: ['package-lock.json'],
      pnpm: ['pnpm-lock.yaml'],
      yarn: ['yarn.lock'],
    }[packageManager];
    if (!lockfileNames) {
      results.push(result(
        'PACKAGE_MANAGER',
        'package-manager',
        'not_configured',
        `项目声明的包管理方式 ${packageManager} 没有内置锁文件检查规则；未作通过或失败判断`,
      ));
    } else {
      const lockfilePath = await findUp(cwd, lockfileNames);
      const packageManagerMatches =
        !packageJson.packageManager || packageJson.packageManager.startsWith(`${packageManager}@`);
      const passed = Boolean(lockfilePath) && packageManagerMatches;
      results.push(
        result(
          'PACKAGE_MANAGER',
          'package-manager',
          passed ? 'passed' : 'failed',
          passed
            ? `${packageManager} 与 ${basename(lockfilePath)} 一致`
            : `未找到匹配 ${packageManager} 的锁文件，或 packageManager 声明不一致`,
          passed ? undefined : `提交 ${lockfileNames[0]} 并检查 package.json packageManager`,
        ),
      );
    }
  }

  if (config.stack?.adapter === 'uni-app') {
    const pageRegistry = config.stack.page_registry || 'src/pages.json';
    results.push(await checkUniAppPageRegistry(cwd, pageRegistry));
    const requiredDependencies = ['@dcloudio/uni-app', 'vue'];
    const missingDependencies = requiredDependencies.filter((name) => !hasDependency(packageJson, name));
    results.push(
      result(
        'UNI_APP_DEPENDENCIES',
        'uni-app-dependencies',
        missingDependencies.length ? 'failed' : 'passed',
        missingDependencies.length
          ? `缺少依赖：${missingDependencies.join(', ')}`
          : 'uni-app 和 Vue 依赖已配置',
        missingDependencies.length ? '在项目依赖中安装缺失项' : undefined,
      ),
    );
  }

  const gitignorePath = resolve(cwd, '.gitignore');
  if (await exists(gitignorePath)) {
    const gitignore = await readFile(gitignorePath, 'utf8');
    const ignoresReports = /(^|\n)(?:tmp\/|tmp\/continue-harness\/)(?:\n|$)/.test(gitignore);
    const ignoresEnv = /(^|\n)\.env(?:\*|(?:\n|$))/.test(gitignore) || gitignore.includes('.env.local');
    results.push(
      result(
        'GITIGNORE_REPORTS',
        'gitignore-reports',
        ignoresReports ? 'passed' : 'failed',
        ignoresReports ? 'Harness 报告目录已被 Git 忽略' : 'Harness 报告目录未被 Git 忽略',
        ignoresReports ? undefined : '在 .gitignore 中添加 tmp/continue-harness/',
      ),
    );
    results.push(
      result(
        'GITIGNORE_ENV',
        'gitignore-env',
        ignoresEnv ? 'passed' : 'failed',
        ignoresEnv ? '.env* 已被 Git 忽略' : '.env* 未被安全忽略',
        ignoresEnv ? undefined : '在 .gitignore 中添加 .env*，可保留 .env.example',
      ),
    );
  } else {
    results.push(
      result('GITIGNORE_REPORTS', 'gitignore-reports', 'failed', '缺少 .gitignore'),
    );
  }

  results.push(await checkOpenApi(cwd, config));
  results.push(await checkApiGeneration(cwd));
  results.push(await checkAgentWorkflow(cwd, config));
  results.push(await checkAgentAdapters(cwd, config));
  const intake = await inspectIntake(cwd);
  results.push(result('INTAKE', 'intake', !intake.exists ? 'not_configured'
    : intake.status === 'confirmed' ? 'passed' : 'needs_confirmation',
  !intake.exists ? '未配置 Intake' : `Intake: ${intake.status}`));
  results.push(...(await checkInputs(cwd, config)));
  results.push(...(await checkTaskAndHistory(cwd, config)));
  results.push(...(await checkDesignGovernance(cwd, config)));
  const uiSystemConfigured = Boolean(config.ui?.system && config.ui.system.status !== 'not_configured');
  if (isConsumerH5(config) || uiSystemConfigured) {
    const uiGovernance = await inspectUiGovernance(cwd, config);
    results.push(...uiGovernance.issues.map((item) => result(item.code, item.code.toLowerCase(), item.status, item.message, item.suggestion)));
    if (!uiGovernance.issues.length) {
      results.push(result(
        'UI_GOVERNANCE',
        'ui-governance',
        'passed',
        uiSystemConfigured
          ? `UI System ${config.ui.system.adapter}@${config.ui.system.version} 及页面模型已就绪`
          : 'UI System 未配置，未启用 UI 治理检查',
      ));
    }
    const uiContract = await inspectUiContract(cwd, config);
    results.push(...uiContract.issues.map((item) => result(item.code, item.code.toLowerCase(), item.status, item.message, item.suggestion)));
    if (!uiContract.issues.length) results.push(result('UI_CONTRACT', 'ui-contract', 'not_configured', 'UI Contract 未启用'));
  }
  results.push(await checkVisualGovernance(cwd, config));
  for (const [name, command] of Object.entries(config.commands || {})) {
    const scriptMatch = String(command).match(/^(?:pnpm|npm run|yarn) ([\w:-]+)/);
    if (!scriptMatch) continue;
    const present = Boolean(packageJson.scripts?.[scriptMatch[1]]);
    results.push(
      result(
        'PROJECT_SCRIPT',
        `command:${name}`,
        present ? 'passed' : 'failed',
        present ? `脚本 ${scriptMatch[1]} 已配置` : `package.json 缺少脚本 ${scriptMatch[1]}`,
        present ? undefined : `在 package.json scripts 中添加 ${scriptMatch[1]}`,
      ),
    );
  }
  return {
    results,
    status: results.some((item) => item.status === 'failed') ? 'failed' : 'passed',
  };
}
