#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { access, appendFile, copyFile, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  applyInitialization,
  applyOpenApiGeneration,
  applyProjectCreation,
  analyzeInputs,
  buildResumeState,
  createTaskSnapshot,
  discoverDesignTokenCandidates,
  inspectDesignTokens,
  inspectInputs,
  inspectUiGovernance,
  inspectUiContract,
  createInitialIntake,
  inspectIntake,
  evidenceDefinition,
  intakeEvidenceStatus,
  appendCommandLog,
  renderUiComponentInventory,
  scanUiComponentInventory,
  inspectTaskHistory,
  inspectAcceptance,
  loadProjectConfig,
  listOpenApiOperations,
  planInitialization,
  planOpenApiGeneration,
  planProjectCreation,
  publicPlan,
  resolveVerifySteps,
  runDoctor,
  runShellCommand,
  runVerification,
  readInputManifest,
  writeReport,
  HARNESS_DIRECTORY,
  LEGACY_HARNESS_DIRECTORY,
  resolveHarnessDirectory,
  resolveHarnessPath,
} from '@company/continue-harness-core';
import YAML from 'yaml';

const cwd = process.cwd();
const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = resolve(packageDirectory, '../..');
const packageRoot = existsSync(resolve(repositoryRoot, 'presets')) ? repositoryRoot : packageDirectory;
const defaultProjectSkills = ['generic-harness'];

async function copyDirectory(source, target, { force = false } = {}) {
  await mkdir(target, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = resolve(source, entry.name);
    const targetPath = resolve(target, entry.name);
    if (entry.isDirectory()) await copyDirectory(sourcePath, targetPath, { force });
    else if (force || !(await exists(targetPath))) await copyFile(sourcePath, targetPath);
  }
}
const initFiles = [
  ['templates/AGENTS.md', 'AGENTS.md'],
  ['templates/CLAUDE.md', 'CLAUDE.md'],
  ['templates/CURSOR_RULE.mdc', '.cursor/rules/continue-harness.mdc'],
  ['templates/PROJECT_MAP.md', 'docs/PROJECT_MAP.md'],
  ['templates/DESIGN.md', 'docs/DESIGN.md'],
  ['templates/PRODUCT.md', 'docs/PRODUCT.md'],
  ['templates/CURRENT_STATUS.md', 'docs/CURRENT_STATUS.md'],
  ['templates/DECISIONS.md', 'docs/DECISIONS.md'],
  ['templates/CHANGELOG.md', 'docs/CHANGELOG.md'],
  ['templates/INPUTS.md', '.continue-harness/inputs/README.md'],
  ['templates/INPUT_MANIFEST.yaml', '.continue-harness/inputs/manifest.yaml'],
  ['templates/PRD_INPUT.md', '.continue-harness/inputs/prd/README.md'],
  ['templates/RP_INPUT.md', '.continue-harness/inputs/rp/README.md'],
  ['templates/UI_INPUT.md', '.continue-harness/inputs/ui/README.md'],
  ['templates/API_INPUT.md', '.continue-harness/inputs/api/README.md'],
  ['templates/API_SELECTION.yaml', '.continue-harness/api/selection.yaml'],
  ['templates/ASSETS_INPUT.md', '.continue-harness/inputs/assets/README.md'],
  ['templates/SNAPSHOTS.md', '.continue-harness/snapshots/README.md'],
  ['templates/PRD_HISTORY.md', 'docs/history/PRD_HISTORY.md'],
  ['templates/CHANGE_HISTORY.md', 'docs/history/CHANGE_HISTORY.md'],
  ['templates/IMPLEMENTATION_COVERAGE.md', 'docs/IMPLEMENTATION_COVERAGE.md'],
  ['templates/TOKENS.json', 'docs/design/tokens.json'],
  ['templates/TOKENS.md', 'docs/design/TOKENS.md'],
  ['templates/COMPONENTS.md', 'docs/design/COMPONENTS.md'],
  ['templates/UI-CONTRACT-ADOPTION.md', 'docs/UI-CONTRACT-ADOPTION.md'],
  ['templates/UI-COMPONENT-INVENTORY.md', 'docs/UI-COMPONENT-INVENTORY.md'],
  ['templates/UI-COMPONENT-BOUNDARIES.md', 'docs/UI-COMPONENT-BOUNDARIES.md'],
  ['templates/UI-CONTRACT-EVIDENCE.md', 'docs/ui-contract-evidence/README.md'],
  ['templates/PAGE_FLOW_MODEL.yaml', '.continue-harness/models/page-flow.yaml'],
  ['templates/LAYOUT_SPECS.yaml', '.continue-harness/models/layout-specs.yaml'],
  ['templates/UI_ADJUSTMENTS.yaml', '.continue-harness/ui/adjustments.yaml'],
  ['templates/project.yaml', '.continue-harness/project.yaml'],
];

function has(flag) { return process.argv.includes(flag); }
function option(flag) { const index = process.argv.indexOf(flag); return index < 0 ? undefined : process.argv[index + 1]; }
async function exists(path) { try { await access(path); return true; } catch { return false; } }

const HELP = {
  main: `continue-harness - 项目协作约束、输入管理和验证工具

用法：
  continue-harness <命令> [参数] [选项]

默认流程：
  continue-harness create <项目名> --output <目录>  创建通用约束项目
  continue-harness init --dry-run                  查看接入现有项目会创建哪些文件
  continue-harness inputs inspect --json           登记并检查本次任务输入
  continue-harness task create --title "任务名称"  创建稳定任务编号
  continue-harness verify feature                  验证完整功能改动

基础命令：
  create      创建通用约束项目，可用 --preset consumer-h5 生成 H5 适配项目
  init        向现有项目补充通用 Harness 文件，不覆盖项目已维护内容
  migrate     将旧 .fe-harness 状态目录迁移为 .continue-harness
  inputs      查看、比对和分析 PRD/RP/UI/API/assets 输入
  task        创建任务、查看历史、创建不可变任务快照
  verify      执行 quick/feature/runtime/interaction/visual/audit

诊断与按需能力：
  inspect / doctor / plan                    项目检查、诊断和变更预览
  resume                                      恢复上一次 AI 协作现场
  design / ui                                UI 任务需要时启用
  api                                        接口任务需要时启用
  skills      列出或安装 continue-harness Skills
  version     输出 continue-harness 版本

全局选项：
  -h, --help  显示帮助
  -v, --version  输出 continue-harness 版本
  --json      输出稳定 JSON，适合 Agent 和 CI

按需查看帮助：
  continue-harness help <命令>
`,
  create: `continue-harness create - 创建通用约束项目

用法：
  continue-harness create <项目名> [--output <目录>] [--preset generic|consumer-h5] [--dry-run] [--skip-install] [--json]

说明：
  项目名只能使用小写字母、数字和连字符。
  默认输出到当前目录下的同名子目录。
  默认 preset=generic，只生成与技术栈无关的约束、输入、任务、日志、上下文和验收容器。
  consumer-h5 是显式 preset，会额外生成 uni-app H5 工程。create 不要求提前提供业务输入。
  离线创建或暂不安装依赖时使用 --skip-install。

示例：
  continue-harness create project-core
  continue-harness create hotel-h5 --preset consumer-h5
  continue-harness create hotel-h5 --output /tmp/hotel-h5
  continue-harness create hotel-h5 --dry-run --json
`,
  init: `continue-harness init - 接入现有项目

用法：
  continue-harness init [--preset generic|consumer-h5] [--dry-run] [--json]

说明：
  init 只创建缺失文件，不覆盖项目已有内容。
  已存在且与模板不同的文件显示为“项目已维护”，不会被当作真实冲突。

示例：
  continue-harness init --dry-run
  continue-harness init --dry-run --json
`,
  inspect: `continue-harness inspect - 查看项目 Harness 状态

用法：
  continue-harness inspect [--json]

输出：
  project.yaml 路径、项目类型、技术栈、事实文档存在性、verify 模式、输入清单、Design Token 和 Agent 工作流。
`,
  resume: `continue-harness resume - 恢复 AI 协作现场

用法：
  continue-harness resume [--task T001] [--json]

  输出当前任务、输入状态、最近快照、覆盖矩阵、持久决策、Git 改动和下一步动作。
`,
  intake: `continue-harness intake - 多轮项目事实与输入确认

用法：
  continue-harness intake inspect [--json]
  continue-harness intake answer --type <frontend|backend|client|data|infrastructure|mixed> [--goal <目标>] [--runtime <环境>] [--toolchain <工具链>] [--json]
  continue-harness intake evidence --id <输入项> --status <confirmed|not_applicable|pending> [--source <路径>] [--version <版本>] [--note <说明>] [--json]

第一轮确认项目基本信息，第二轮按项目类型生成最小输入清单；必需输入必须有来源，非适用输入可以明确标记，不将 UI、API 或技术栈模板强加给所有项目。
`,
  plan: `continue-harness plan - 输出结构化计划

用法：
  continue-harness plan init --json
  continue-harness plan create <项目名> [--output <目录>] --json

状态说明：
  create=待创建
  managed_unchanged=脚手架管理且未修改
  project_owned_modified=项目已维护
  true_conflict=真实冲突
`,
  doctor: `continue-harness doctor - 只读诊断项目

用法：
  continue-harness doctor [--json]

检查范围：
  Node/pnpm、package scripts、uni-app 页面注册、输入清单、PRD/RP/UI/API/assets、PRD 历史、变更历史、覆盖矩阵、Design Token、视觉基线、.env* 忽略和 Agent 工作流。

说明：
  确定性错误显示“失败”；未启用能力显示“未配置”；启发式问题显示“待确认”。
`,
  verify: `continue-harness verify - 执行验证模式

用法：
  continue-harness verify <模式> [--json]

模式：
  quick        快速验证，通常包含单元测试、类型检查和 Lint
  feature      功能完成验证，通常包含 quick 和生产构建
  runtime      页面启动和运行时错误验证
  interaction  关键交互流程验证
  visual       截图基线和像素差异验证
  audit        汇总审计，尽量运行所有已配置检查

说明：
  visual 没有截图基线时返回“未配置”，不能视为通过。
  端口监听或工具链权限失败会被归类为环境阻塞，不当作业务失败。
`,
  inputs: `continue-harness inputs - 输入清单、差异和基础分析

用法：
  continue-harness inputs inspect [--json]
  continue-harness inputs diff [--json]
  continue-harness inputs analyze [--json]

说明：
  inspect 检查 manifest、文件存在性、哈希变化、未登记输入和 active 冲突。
  diff 汇总需要处理的输入变化。
  analyze 对文本 PRD/RP/UI 抽取基础证据，并记录同名字段冲突。
`,
  api: `continue-harness api - Apifox/OpenAPI 接口生成

用法：
  continue-harness api inspect --task T001 [--json]
  continue-harness api generate --task T001 [--dry-run] [--json]

配置：
  在 .continue-harness/api/selection.yaml 中为任务关联 PRD 输入、API 输入和 operationId。
  API 输入必须登记在 .continue-harness/inputs/manifest.yaml，首版接受 Apifox 导出的 OpenAPI JSON。

原则：
  PRD 决定本任务使用哪些接口；OpenAPI 决定路径、方法、请求和响应字段。
  生成文件有哈希保护，检测到手工修改时不会覆盖。
`,
  design: `continue-harness design - 设计与 Token 工具

用法：
  continue-harness design tokens inspect [--json]
  continue-harness design tokens diff [--json]
  continue-harness design tokens discover [--json]

说明：
  当前支持检查唯一机器可读 Token 真值文件。
  默认路径为 docs/design/tokens.json，也可通过 project.yaml 的 facts.design_tokens 指定。
`,
  task: `continue-harness task - 任务编号、历史和快照

用法：
  continue-harness task create [T001] --title "<任务名称>" [--json]
  continue-harness task inspect T001 [--json]
  continue-harness task history T001 [--json]
  continue-harness task snapshot T001 --title "<任务名称>" --request "<用户要求>" [--json]

说明：
  create 会创建模块化 PRD、metadata.yaml，并登记到 inputs/manifest.yaml 和 PRD_HISTORY。
  snapshot 会创建不可变任务快照，包含 SNAPSHOT.md、files.json、verification.json 和 design-token-diff.json。
  快照不会保存 .env、密钥、Cookie 或 Access Token。
`,
  version: `continue-harness version - 输出当前 continue-harness 版本

用法：
  continue-harness version
  continue-harness -v
  continue-harness --version
`,
  migrate: `continue-harness migrate - 迁移旧状态目录

用法：
  continue-harness migrate --dry-run [--json]
  continue-harness migrate [--json]

说明：
  将项目根目录的 .fe-harness 整体迁移为 .continue-harness。
  目标目录已存在、旧目录不存在或检测到冲突时不会写入。
`,
  skills: `continue-harness skills - 管理命令 Skills

用法：
  continue-harness skills list [--json]
  continue-harness skills install --project [--provider codex|claude|cursor|all] [--name <名称>] [--force]
  continue-harness skills install --global [--provider codex|claude|cursor|all] [--name <名称>] [--target <目录>] [--force]

说明：
  --provider 默认为 codex；all 会同步 Codex、Claude Code 和 Cursor。
  项目级 Codex/Cursor 共用 .agents/skills；Claude Code 使用 .claude/skills。
  全局默认目录分别为 ~/.codex/skills、~/.claude/skills、~/.cursor/skills。
  已存在且未指定 --force 时不会覆盖。
`,
  ui: `continue-harness ui - 管理 UI System Adapter

用法：
  continue-harness ui systems list [--json]
  continue-harness ui systems install <名称> [--dry-run] [--json]
  continue-harness ui contract inspect [--json]
  continue-harness ui contract inventory [--write] [--json]

Adapter 不会自动修改项目依赖或 project.yaml；安装后按输出片段显式选择并锁定版本。
`,
};

function wantsHelp(value) {
  return value === '-h' || value === '--help' || value === 'help';
}

function printHelp(topic = 'main') {
  console.log(HELP[topic] || HELP.main);
}

async function listFiles(root, directory = root) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await listFiles(root, path)));
    else output.push(relative(root, path));
  }
  return output.sort();
}

function printPlan(plan) {
  const names = {
    conflict: '真实冲突',
    create: '待创建',
    managed_unchanged: '脚手架管理且未修改',
    project_owned_modified: '项目已维护',
    template_update_available: '存在模板更新',
    unchanged: '脚手架管理且未修改',
  };
  for (const entry of plan.entries) console.log(`${(names[entry.status] || entry.status).padEnd(14)} ${entry.target}`);
}

async function initializationPlan() {
  return planInitialization({ cwd, files: await initializationFiles(), templateRoot: packageRoot });
}

async function skillFiles() {
  const root = resolve(packageRoot, 'skills');
  const paths = [];
  const selected = option('--preset') === 'consumer-h5' ? ['consumer-h5-harness'] : defaultProjectSkills;
  for (const name of selected) {
    paths.push(...(await listFiles(resolve(root, name))).map((path) => `${name}/${path}`));
  }
  return paths.flatMap((path) => [
    [`skills/${path}`, `.agents/skills/${path}`],
    [`skills/${path}`, `.claude/skills/${path}`],
  ]);
}

async function initializationFiles() {
  const directory = await resolveHarnessDirectory(cwd);
  const preset = option('--preset') || 'generic';
  if (!['generic', 'consumer-h5'].includes(preset)) throw new Error('preset 必须是 generic 或 consumer-h5');
  const files = preset === 'generic'
    ? (await listFiles(resolve(packageRoot, 'presets/generic'))).map((path) => [`presets/generic/${path}`, path])
    : initFiles;
  return [...files, ...(await skillFiles())].map(([source, target]) => [
    source,
    target.replace(/^\.continue-harness(?=\/|$)/, directory),
  ]);
}

async function init() {
  if (has('-h') || has('--help')) {
    printHelp('init');
    return;
  }
  const plan = await initializationPlan();
  if (has('--json')) console.log(JSON.stringify({ action: 'init', ...plan }, null, 2));
  else printPlan(plan);
  if (has('--dry-run')) return;
  if (plan.status === 'conflict') throw new Error('初始化存在文件冲突，未写入任何文件');
  await applyInitialization({ cwd, files: await initializationFiles(), plan, templateRoot: packageRoot });
}

async function migrate() {
  const legacy = resolve(cwd, LEGACY_HARNESS_DIRECTORY);
  const target = resolve(cwd, HARNESS_DIRECTORY);
  const legacyExists = await exists(legacy);
  const targetExists = await exists(target);
  const files = legacyExists ? await listFiles(legacy) : [];
  const payload = {
    action: 'migrate',
    from: LEGACY_HARNESS_DIRECTORY,
    to: HARNESS_DIRECTORY,
    files,
    status: !legacyExists ? 'not_needed' : targetExists ? 'conflict' : 'ready',
  };
  if (has('--json') || has('--dry-run')) console.log(JSON.stringify(payload, null, 2));
  else if (payload.status === 'not_needed') console.log('未发现 .fe-harness，无需迁移');
  else if (payload.status === 'conflict') console.log('迁移冲突：.continue-harness 已存在');
  else console.log(`准备迁移 ${files.length} 个文件：.fe-harness → .continue-harness`);
  if (has('--dry-run') || payload.status === 'not_needed') return;
  if (payload.status === 'conflict') throw new Error('目标目录 .continue-harness 已存在，拒绝覆盖');
  const { rename } = await import('node:fs/promises');
  await rename(legacy, target);
  if (!has('--json')) console.log('迁移完成：.continue-harness');
}

async function creationPlan(name) {
  if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) throw new Error('项目名必须使用小写字母、数字和连字符');
  const preset = option('--preset') || 'generic';
  if (!['generic', 'consumer-h5'].includes(preset)) throw new Error('preset 必须是 generic 或 consumer-h5');
  const presetRoot = resolve(packageRoot, `presets/${preset}`);
  const files = await listFiles(presetRoot);
  const skills = preset === 'consumer-h5' ? ['consumer-h5-harness'] : defaultProjectSkills;
  for (const skillName of skills) {
    for (const path of await listFiles(resolve(packageRoot, 'skills', skillName))) {
      const skillPath = `${skillName}/${path}`;
      files.push({ source: resolve(packageRoot, 'skills', skillPath), target: `.agents/skills/${skillPath}` });
      files.push({ source: resolve(packageRoot, 'skills', skillPath), target: `.claude/skills/${skillPath}` });
    }
  }
  const plan = await planProjectCreation({ name, output: resolve(option('--output') || resolve(cwd, name)), presetRoot, files });
  plan.preset = preset;
  return plan;
}

async function create(name) {
  const plan = await creationPlan(name);
  if (has('--json') || has('--dry-run')) console.log(JSON.stringify(publicPlan(plan), null, 2));
  else printPlan(plan);
  if (has('--dry-run')) return;
  await applyProjectCreation(plan);
  console.log(`已创建项目 ${name}：${plan.output}`);
  if (!has('--skip-install') && await exists(resolve(plan.output, 'package.json'))) {
    console.log('正在使用项目声明的 pnpm/Corepack 安装依赖……');
    const installation = await runShellCommand('corepack pnpm install', { cwd: plan.output });
    if (installation.status !== 'passed') {
      throw new Error('项目已创建，但依赖安装失败。请检查 Node.js 20、Corepack 和 registry 后重试 pnpm install');
    }
    console.log('依赖安装完成。');
  }
  await createInitialIntake(plan.output, name);
  const inputRoot = resolve(plan.output, '.continue-harness/inputs');
  console.log('\n项目约束容器已准备好。先确认项目基本信息：');
  console.log(`cd ${plan.output}`);
  console.log('continue-harness intake inspect --json');
  console.log(`\n原始输入统一放入：${inputRoot}`);
  console.log('输入类型由第二轮 Intake 根据项目类型生成，不默认要求 UI、API 或其他技术栈输入。');
  console.log(`文件放好后：cd ${plan.output}`);
  console.log('然后执行：continue-harness inputs inspect --json');
  console.log('继续分析：continue-harness inputs analyze --json');
  console.log('确认输入后创建首个任务：continue-harness task create --title "根据首批输入实现项目" --json');
  console.log('最后执行：continue-harness doctor');
}

async function intake(command = 'inspect') {
  let state = await inspectIntake(cwd);
  if (!state.exists) {
    let name = 'project';
    try { name = (await loadProjectConfig(cwd)).config.project.name; } catch {}
    await createInitialIntake(cwd, name);
    state = await inspectIntake(cwd);
  }
  if (wantsHelp(command)) return printHelp('intake');
  if (command === 'answer') {
    const project = { ...(state.project || {}) };
    for (const key of ['type', 'goal', 'runtime', 'toolchain']) {
      const value = option(`--${key}`);
      if (value) project[key] = value;
    }
    const next = { ...state, project, updated_at: new Date().toISOString() };
    const type = project.type;
    const evidence = evidenceDefinition(type);
    if (type && evidence.length) {
      next.phase = 'evidence';
      next.status = 'awaiting_evidence';
      next.evidence = evidence.map((item) => ({ ...item, status: 'pending' }));
      next.questions = evidence.map(({ id, question, required }) => ({ id, question, required }));
    }
    await writeFile(resolve(cwd, '.continue-harness/intake.yaml'), YAML.stringify(next), 'utf8');
    await appendCommandLog(cwd, { kind: 'intake', action: 'answer', project: next.project, status: next.status });
    state = next;
  }
  if (command === 'evidence') {
    const id = option('--id');
    const status = option('--status');
    const allowed = ['confirmed', 'not_applicable', 'pending', 'needs_confirmation'];
    if (!id || !allowed.includes(status)) throw new Error('证据确认需要 --id 和有效的 --status');
    const evidence = Array.isArray(state.evidence) ? state.evidence : [];
    const index = evidence.findIndex((item) => item.id === id);
    if (index < 0) throw new Error(`当前 Intake 没有输入项：${id}`);
    const current = evidence[index];
    evidence[index] = {
      ...current,
      status,
      source: option('--source') || current.source || null,
      version: option('--version') || current.version || null,
      note: option('--note') || current.note || null,
    };
    const nextStatus = intakeEvidenceStatus({ ...state, evidence });
    state = {
      ...state,
      evidence,
      phase: 'evidence',
      status: nextStatus.complete ? 'confirmed' : 'awaiting_evidence',
      questions: evidence.filter((item) => item.status === 'pending' || item.status === 'needs_confirmation')
        .map(({ id: questionId, question, required }) => ({ id: questionId, question, required })),
      updated_at: new Date().toISOString(),
    };
    await writeFile(resolve(cwd, '.continue-harness/intake.yaml'), YAML.stringify(state), 'utf8');
    await appendCommandLog(cwd, { kind: 'intake', action: 'evidence', id, status, source: evidence[index].source });
  }
  const payload = { ...state, next_questions: state.questions || [] };
  console.log(has('--json') ? JSON.stringify(payload, null, 2) : `Intake：${state.phase} / ${state.status}\n${(state.questions || []).map((item) => `- ${item.question}`).join('\n')}`);
}

async function skills(command = 'list') {
  if (wantsHelp(command)) return printHelp('skills');
  const sourceRoot = resolve(packageRoot, 'skills');
  const names = (await readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  if (command === 'list') {
    console.log(has('--json') ? JSON.stringify({ skills: names }, null, 2) : names.join('\n'));
    return;
  }
  if (command !== 'install') throw new Error('skills 仅支持 list 或 install');
  const requested = option('--name');
  if (requested && !names.includes(requested)) throw new Error(`不存在 Skill：${requested}`);
  const selected = requested ? [requested] : names;
  const global = has('--global');
  if (!global && !has('--project')) throw new Error('请明确指定 --project 或 --global');
  const provider = option('--provider') || 'codex';
  if (!['codex', 'claude', 'cursor', 'all'].includes(provider)) {
    throw new Error('--provider 必须是 codex、claude、cursor 或 all');
  }
  if (option('--target') && provider === 'all') throw new Error('--target 不能与 --provider all 同时使用');
  const providers = provider === 'all' ? ['codex', 'claude', 'cursor'] : [provider];
  const roots = [];
  for (const currentProvider of providers) {
    const targetRoot = option('--target')
      ? resolve(option('--target'))
      : global
        ? currentProvider === 'codex'
          ? resolve(process.env.CODEX_HOME || resolve(homedir(), '.codex'), 'skills')
          : resolve(homedir(), currentProvider === 'claude' ? '.claude/skills' : '.cursor/skills')
        : resolve(cwd, currentProvider === 'claude' ? '.claude/skills' : '.agents/skills');
    if (!roots.some((item) => item.target === targetRoot)) {
      roots.push({ providers: [currentProvider], target: targetRoot });
    } else {
      roots.find((item) => item.target === targetRoot).providers.push(currentProvider);
    }
  }
  const installed = [];
  const skipped = [];
  const installations = [];
  for (const root of roots) {
    const rootInstalled = [];
    const rootSkipped = [];
    for (const name of selected) {
      const target = resolve(root.target, name);
      if ((await exists(target)) && !has('--force')) {
        skipped.push(name);
        rootSkipped.push(name);
        continue;
      }
      await mkdir(root.target, { recursive: true });
      await copyDirectory(resolve(sourceRoot, name), target, { force: has('--force') });
      installed.push(name);
      rootInstalled.push(name);
    }
    installations.push({ installed: rootInstalled, providers: root.providers, skipped: rootSkipped, target: root.target });
  }
  const uniqueInstalled = [...new Set(installed)];
  const uniqueSkipped = [...new Set(skipped)];
  const payload = {
    installations,
    installed: uniqueInstalled,
    provider,
    scope: global ? 'global' : 'project',
    skipped: uniqueSkipped,
    target: roots.length === 1 ? roots[0].target : null,
    targets: roots.map((item) => item.target),
  };
  console.log(has('--json') ? JSON.stringify(payload, null, 2) : `已安装 ${uniqueInstalled.length} 个 Skill，跳过 ${uniqueSkipped.length} 个：${payload.targets.join(', ')}`);
}

async function ui(subject = 'systems', command = 'list', name) {
  if (subject === 'contract') {
    if (command === 'inventory') {
      const inventory = await scanUiComponentInventory(cwd);
      const target = resolve(cwd, 'docs/UI-COMPONENT-INVENTORY.md');
      const payload = { ...inventory, target: relative(cwd, target), write: has('--write') };
      if (has('--write')) {
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, renderUiComponentInventory(inventory));
      }
      if (has('--json')) console.log(JSON.stringify(payload, null, 2));
      else console.log(`${has('--write') ? '已写入' : '扫描完成'} ${payload.count} 个组件${has('--write') ? `：${payload.target}` : ''}`);
      return;
    }
    if (command !== 'inspect' || wantsHelp(name)) return printHelp('ui');
    const { config } = await loadProjectConfig(cwd);
    const inspection = await inspectUiContract(cwd, config);
    const payload = { ...inspection, status: inspection.issues.some((item) => item.status === 'failed') ? 'failed' : inspection.issues.some((item) => item.status === 'needs_confirmation') ? 'needs_confirmation' : 'passed' };
    if (has('--json')) console.log(JSON.stringify(payload, null, 2));
    else {
      console.log(`UI Contract：${payload.status}`);
      for (const item of payload.issues) console.log(`- ${item.code}：${item.message}`);
    }
    return;
  }
  if (subject !== 'systems' || wantsHelp(command)) return printHelp('ui');
  const sourceRoot = resolve(packageRoot, 'ui-systems');
  const names = (await readdir(sourceRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  if (command === 'list') {
    const systems = [];
    for (const current of names) {
      const descriptor = YAML.parse(await readFile(resolve(sourceRoot, current, 'adapter.yaml'), 'utf8'));
      systems.push({ id: descriptor.id, status: descriptor.status, version: descriptor.version });
    }
    console.log(has('--json') ? JSON.stringify({ systems }, null, 2) : systems.map((item) => `${item.id}@${item.version} (${item.status})`).join('\n'));
    return;
  }
  if (command !== 'install' || !name || !names.includes(name)) throw new Error('请指定可用的 UI System Adapter');
  const source = resolve(sourceRoot, name, 'adapter.yaml');
  const targetInfo = await resolveHarnessPath(cwd, `ui-systems/${name}/adapter.yaml`);
  const target = targetInfo.absolutePath;
  const descriptor = YAML.parse(await readFile(source, 'utf8'));
  const payload = {
    action: 'install-ui-system',
    config: { facts: { ui_system_adapter: targetInfo.relativePath }, ui: { system: { adapter: descriptor.id, policy: 'preferred', version: descriptor.version } } },
    status: (await exists(target)) ? 'conflict' : 'ready',
    target: relative(cwd, target),
  };
  console.log(has('--json') || has('--dry-run') ? JSON.stringify(payload, null, 2) : `${payload.status} ${payload.target}`);
  if (has('--dry-run')) return;
  if (payload.status === 'conflict') throw new Error('目标 Adapter 已存在，拒绝覆盖');
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}

async function inspect() {
  const { config, path } = await loadProjectConfig(cwd);
  const inputInspection = await inspectInputs(cwd);
  const tokenInspection = await inspectDesignTokens(cwd, config);
  const uiInspection = config.project?.product_type === 'consumer_h5' ? await inspectUiGovernance(cwd, config) : null;
  const facts = {};
  for (const [name, value] of Object.entries(config.facts || {})) facts[name] = await exists(resolve(cwd, value));
  const payload = {
    configPath: path,
    project: config.project,
    stack: config.stack,
    facts,
    modes: Object.keys(config.verify || {}),
    apiSnapshot: config.sources?.api?.snapshot || null,
    designTokens: {
      source: tokenInspection.source || null,
      status: tokenInspection.status,
    },
    uiSystem: uiInspection ? {
      adapter: config.ui?.system?.adapter || null,
      issues: uiInspection.issues.length,
      status: uiInspection.status,
      version: config.ui?.system?.version || null,
    } : null,
    inputs: {
      count: inputInspection.inputs.length,
      manifest: inputInspection.manifest,
      status: inputInspection.status,
      unregistered: inputInspection.discovered.length,
    },
    agentWorkflow: {
      canonicalConstraints: await exists(resolve(cwd, 'AGENTS.md')),
      claudeAdapter: await exists(resolve(cwd, 'CLAUDE.md')),
      claudeSkills: await exists(resolve(cwd, `.claude/skills/${config.project?.product_type === 'generic' ? 'generic-harness' : 'consumer-h5-harness'}/SKILL.md`)),
      cursorAdapter: await exists(resolve(cwd, '.cursor/rules/continue-harness.mdc')),
      guide: await exists(resolve(cwd, config.facts?.agent_entry || 'AGENTS.md')),
      skill: await exists(resolve(cwd, `.agents/skills/${config.project?.product_type === 'generic' ? 'generic-harness' : 'consumer-h5-harness'}/SKILL.md`)),
      cli: true,
    },
  };
  console.log(has('--json') ? JSON.stringify(payload, null, 2) : `${payload.project.name}: ${payload.project.product_type || 'generic'} / ${payload.stack?.adapter || 'not-selected'}`);
}

async function resume() {
  const state = await buildResumeState(cwd, { taskId: option('--task') });
  if (has('--json')) {
    console.log(JSON.stringify(state, null, 2));
    return;
  }
  console.log(`项目分支：${state.project.branch || '未配置 Git'}`);
  console.log(`当前任务：${state.task ? `${state.task.id} ${state.task.title || ''}`.trim() : '未找到'}`);
  console.log(`输入：${state.inputs.status}，${state.inputs.count} 项，未登记 ${state.inputs.unregistered} 项`);
  if (state.intake) console.log(`Intake：${state.intake.phase || 'unknown'} / ${state.intake.status || 'unknown'}`);
  if (state.acceptance) console.log(`验收：${state.acceptance.status}，未收口 ${state.acceptance.unresolved || 0} 项`);
  if (state.verification) console.log(`最近验证：${state.verification.mode || 'unknown'} / ${state.verification.status || 'unknown'}`);
  console.log(`快照：${state.snapshots.snapshots.length} 个；覆盖矩阵：${state.coverage.total} 行，未收口 ${state.coverage.unresolved} 行`);
  if (state.project.dirty_files.length) console.log(`Git 改动：${state.project.dirty_files.length} 个文件`);
  if (state.decisions.length) console.log(`最近决策：${state.decisions[0]}`);
  console.log('下一步：');
  state.next_actions.forEach((item, index) => console.log(`${index + 1}. ${item.action}（${item.reason}）`));
}

async function plan(kind, name) {
  if (wantsHelp(kind) || !kind) {
    printHelp('plan');
    return;
  }
  const value = kind === 'init' ? { action: 'init', ...(await initializationPlan()) } : publicPlan(await creationPlan(name));
  console.log(JSON.stringify(value, null, 2));
  if (value.status === 'conflict') process.exitCode = 1;
}

function printDoctor(report) {
  for (const item of report.results) console.log(`${(item.display_name || item.status).padEnd(8)} ${item.code} ${item.name} - ${item.message}`);
}

async function doctor() {
  const { config } = await loadProjectConfig(cwd);
  const report = await runDoctor(cwd, config);
  if (has('--json')) console.log(JSON.stringify(report, null, 2)); else printDoctor(report);
  process.exitCode = report.status === 'passed' ? 0 : 1;
}

async function verify(mode) {
  if (wantsHelp(mode) || !mode) {
    printHelp('verify');
    return;
  }
  const { config } = await loadProjectConfig(cwd);
  const definition = resolveVerifySteps(config, mode);
  let verification = await runVerification({ cwd, mode, ...definition });
  if (['feature', 'audit'].includes(mode)) {
    const acceptance = await inspectAcceptance(cwd);
    verification = { ...verification, acceptance };
    if (acceptance.status === 'needs_confirmation') {
      verification.results.push({
        name: 'acceptance',
        command: 'docs/ACCEPTANCE.md',
        durationMs: 0,
        status: 'failed',
        stderr: acceptance.issue || `存在 ${acceptance.unresolved} 个未收口验收项`,
        stdout: '',
      });
      verification.status = 'failed';
    } else if (acceptance.status === 'closed_with_risks') {
      verification.results.push({
        name: 'acceptance',
        command: 'docs/ACCEPTANCE.md',
        durationMs: 0,
        status: 'blocked',
        stderr: '验收项已记录延期或外部阻塞，不能宣称功能完成',
        stdout: '',
      });
      verification.status = 'failed';
    }
  }
  const report = await writeReport(cwd, verification);
  console.log(has('--json') ? JSON.stringify(report, null, 2) : `continue-harness ${mode}: ${report.status}`);
  process.exitCode = report.status === 'passed' ? 0 : 1;
}

async function inputs(command) {
  if (wantsHelp(command)) {
    printHelp('inputs');
    return;
  }
  const inspection = command === 'analyze' ? await analyzeInputs(cwd) : await inspectInputs(cwd);
  if (has('--json')) {
    console.log(JSON.stringify(inspection, null, 2));
    return;
  }
  if (command === 'analyze') {
    console.log(`输入分析：${inspection.status === 'passed' ? '通过' : '需要处理'}`);
    console.log(`抽取证据：${inspection.facts.length}`);
    for (const issue of inspection.issues) console.log(`- ${issue.display_name}：${issue.message}`);
    return;
  }
  if (command === 'diff') {
    console.log(`输入变更：${inspection.issues.length ? '需要处理' : '无未处理差异'}`);
  } else {
    console.log(`输入清单：${inspection.exists ? '已配置' : '未配置'}`);
    console.log(`已登记输入：${inspection.inputs.length}`);
    console.log(`未登记输入：${inspection.discovered.length}`);
  }
  for (const issue of inspection.issues) console.log(`- ${issue.display_name}：${issue.message}`);
}

async function apiContext(taskId) {
  if (!taskId || !/^T\d+$/.test(taskId)) throw new Error('请使用 --task T001 指定任务');
  const selectionInfo = await resolveHarnessPath(cwd, 'api/selection.yaml');
  const selectionPath = selectionInfo.absolutePath;
  if (!(await exists(selectionPath))) throw new Error(`缺少 ${selectionInfo.relativePath}`);
  const selection = YAML.parse(await readFile(selectionPath, 'utf8')) || {};
  const taskSelection = selection.tasks?.[taskId];
  if (!taskSelection) throw new Error(`selection.yaml 未配置任务 ${taskId}`);
  if (!Array.isArray(taskSelection.operations) || !taskSelection.operations.length) {
    throw new Error(`任务 ${taskId} 尚未选择 operation`);
  }
  const manifest = await readInputManifest(cwd);
  const apiInput = manifest.inputs.find((item) => item.id === taskSelection.api_input && item.type === 'api' && item.status !== 'superseded');
  if (!apiInput) throw new Error(`manifest 中找不到 API 输入 ${taskSelection.api_input || '<missing>'}`);
  const prdInputs = Array.isArray(taskSelection.prd_inputs) ? taskSelection.prd_inputs : [];
  const missingPrd = prdInputs.filter((id) => !manifest.inputs.some((item) => item.id === id && item.type === 'prd'));
  if (missingPrd.length) throw new Error(`manifest 中找不到 PRD 输入：${missingPrd.join(', ')}`);
  const sourcePath = resolve(cwd, apiInput.path || '');
  if (!(await exists(sourcePath))) throw new Error(`API 输入文件不存在：${apiInput.path}`);
  let document;
  try { document = JSON.parse(await readFile(sourcePath, 'utf8')); } catch { throw new Error('API 输入不是有效 JSON；首版请从 Apifox 导出 OpenAPI JSON'); }
  return { apiInput, document, prdInputs, sourcePath: apiInput.path, taskId, taskSelection };
}

async function api(command) {
  if (wantsHelp(command) || !command) return printHelp('api');
  if (!['inspect', 'generate'].includes(command)) throw new Error('api 仅支持 inspect 或 generate');
  const context = await apiContext(option('--task'));
  const available = listOpenApiOperations(context.document);
  const selected = new Set(context.taskSelection.operations);
  const missing = [...selected].filter((operationId) => !available.some((item) => item.operationId === operationId));
  if (missing.length) throw new Error(`OpenAPI 中找不到 operation：${missing.join(', ')}`);
  if (command === 'inspect') {
    const payload = {
      apiInput: context.apiInput.id,
      availableOperations: available,
      prdInputs: context.prdInputs,
      selectedOperations: available.filter((item) => selected.has(item.operationId)),
      sourcePath: context.sourcePath,
      taskId: context.taskId,
    };
    console.log(has('--json') ? JSON.stringify(payload, null, 2) : `任务 ${context.taskId}：已选择 ${payload.selectedOperations.length}/${available.length} 个接口`);
    return;
  }
  const generation = await planOpenApiGeneration({
    cwd,
    document: context.document,
    operationIds: context.taskSelection.operations,
    sourcePath: context.sourcePath,
    taskId: context.taskId,
  });
  const payload = {
    entries: generation.entries.map(({ content: _content, ...entry }) => entry),
    metadataPath: generation.metadataPath,
    operations: generation.metadata.operations,
    status: generation.status,
    taskId: context.taskId,
  };
  if (has('--json') || has('--dry-run')) console.log(JSON.stringify(payload, null, 2));
  else for (const entry of payload.entries) console.log(`${entry.status.padEnd(14)} ${entry.target}`);
  if (has('--dry-run')) {
    if (generation.status === 'conflict') process.exitCode = 1;
    return;
  }
  await applyOpenApiGeneration(cwd, generation);
  if (!has('--json')) console.log(`已为任务 ${context.taskId} 生成 ${generation.metadata.operations.length} 个接口封装`);
}

async function design(command, subject) {
  if (wantsHelp(command) || wantsHelp(subject)) {
    printHelp('design');
    return;
  }
  if (command !== 'tokens') throw new Error('design 目前仅支持 tokens');
  const { config } = await loadProjectConfig(cwd);
  if (subject === 'discover') {
    const discovery = await discoverDesignTokenCandidates(cwd);
    if (has('--json')) console.log(JSON.stringify(discovery, null, 2));
    else console.log(discovery.summary);
    return;
  }
  const inspection = await inspectDesignTokens(cwd, config);
  if (has('--json')) {
    console.log(JSON.stringify(inspection, null, 2));
    return;
  }
  console.log(subject === 'diff' ? 'Design Token 差异：需要项目提供前后版本时计算' : `Design Token：${inspection.source || '未配置'}`);
  for (const issue of inspection.issues || []) console.log(`- ${issue.display_name}：${issue.message}`);
}

async function nextTaskId() {
  let max = 0;
  const harnessDirectory = await resolveHarnessDirectory(cwd);
  const roots = [
    `${harnessDirectory}/inputs/prd`,
    `${harnessDirectory}/inputs/manifest.yaml`,
    'docs/history/PRD_HISTORY.md',
    'docs/history/CHANGE_HISTORY.md',
    'docs/IMPLEMENTATION_COVERAGE.md',
    'docs/history/tasks',
  ];
  async function scan(path) {
    try {
      const info = await stat(path);
      if (info.isDirectory()) {
        for (const entry of await readdir(path, { withFileTypes: true })) {
          if (['node_modules', '.git', 'dist', 'tmp'].includes(entry.name)) continue;
          await scan(resolve(path, entry.name));
        }
        return;
      }
      const source = await readFile(path, 'utf8');
      for (const match of source.matchAll(/\bT(\d+)\b/g)) max = Math.max(max, Number(match[1]));
    } catch {}
    const nameMatch = String(path).match(/(?:^|[/\\])T(\d+)(?:[/\\]|\.|$)/);
    if (nameMatch) max = Math.max(max, Number(nameMatch[1]));
  }
  for (const root of roots) await scan(resolve(cwd, root));
  return `T${String(max + 1).padStart(3, '0')}`;
}

async function task(command, taskId) {
  if (wantsHelp(command) || !command) {
    printHelp('task');
    return;
  }
  if (command === 'create') {
    const harnessDirectory = await resolveHarnessDirectory(cwd);
    const id = taskId && /^T\d+$/.test(taskId) ? taskId : await nextTaskId();
    const title = option('--title') || '未命名任务';
    const root = resolve(cwd, harnessDirectory, 'inputs/prd/modules', id);
    await mkdir(resolve(root, 'attachments'), { recursive: true });
    const today = new Date().toISOString().slice(0, 10);
    await writeFile(resolve(root, 'PRD.md'), `# ${title}\n\n待补充产品需求。\n`, { flag: 'wx' });
    await writeFile(
      resolve(root, 'metadata.yaml'),
      YAML.stringify({
        created_at: today,
        dependencies: [],
        id,
        sources: [],
        status: '草稿',
        supersedes: [],
        title,
        updated_at: today,
        version: '1.0',
      }),
      { flag: 'wx' },
    );
    const manifestPath = resolve(cwd, harnessDirectory, 'inputs/manifest.yaml');
    const manifest = (await exists(manifestPath))
      ? YAML.parse(await readFile(manifestPath, 'utf8')) || {}
      : {};
    const inputs = Array.isArray(manifest.inputs) ? manifest.inputs : [];
    const prdPath = `${harnessDirectory}/inputs/prd/modules/${id}/PRD.md`;
    if (!inputs.some((item) => item.id === `PRD-${id}` || item.path === prdPath)) {
      inputs.push({
        id: `PRD-${id}`,
        path: prdPath,
        status: 'active',
        task_id: id,
        type: 'prd',
        version: '1.0',
      });
    }
    await mkdir(dirname(manifestPath), { recursive: true });
    await writeFile(manifestPath, YAML.stringify({ ...manifest, inputs }), 'utf8');
    const historyPath = resolve(cwd, 'docs/history/PRD_HISTORY.md');
    if (await exists(historyPath)) {
      await appendFile(
        historyPath,
        `| ${id} | ${title} | 1.0 | 草稿 | ${prdPath} | ${today} | 未执行 | 未创建 |\n`,
        'utf8',
      );
    }
    const payload = { id, path: relative(cwd, root), title };
    console.log(has('--json') ? JSON.stringify(payload, null, 2) : `已创建任务 ${id}：${title}`);
    return;
  }
  if (!taskId) throw new Error('请提供任务编号，例如 T001');
  if (command === 'snapshot') {
    const snapshot = await createTaskSnapshot(cwd, {
      taskId,
      title: option('--title') || '未命名任务',
      userRequest: option('--request') || '',
    });
    console.log(has('--json') ? JSON.stringify(snapshot, null, 2) : `已创建任务快照：${snapshot.path}`);
    return;
  }
  const history = await inspectTaskHistory(cwd, taskId);
  console.log(has('--json') ? JSON.stringify(history, null, 2) : `任务 ${taskId} 快照数：${history.snapshots.length}`);
}

async function main() {
  const [, , command, argument, secondArgument, thirdArgument] = process.argv;
  if (command === '-v' || command === '--version') {
    return console.log((await readFile(resolve(packageRoot, 'VERSION'), 'utf8')).trim());
  }
  if (command === 'help') return printHelp(argument || 'main');
  if (!command || wantsHelp(command)) return printHelp('main');
  if (command === 'init') return init();
  if (command === 'migrate') {
    if (wantsHelp(argument)) return printHelp('migrate');
    return migrate();
  }
  if (command === 'create') {
    if (wantsHelp(argument) || !argument) return printHelp('create');
    return create(argument);
  }
  if (command === 'inspect') {
    if (wantsHelp(argument)) return printHelp('inspect');
    return inspect();
  }
  if (command === 'resume') {
    if (wantsHelp(argument)) return printHelp('resume');
    return resume();
  }
  if (command === 'intake') {
    if (wantsHelp(argument)) return printHelp('intake');
    return intake(argument || 'inspect');
  }
  if (command === 'plan') return plan(argument, secondArgument);
  if (command === 'doctor') {
    if (wantsHelp(argument)) return printHelp('doctor');
    return doctor();
  }
  if (command === 'verify') return verify(argument);
  if (command === 'inputs') return inputs(argument || 'inspect');
  if (command === 'api') return api(argument);
  if (command === 'design') return design(argument, secondArgument || 'inspect');
  if (command === 'task') return task(argument, secondArgument, thirdArgument);
  if (command === 'skills') return skills(argument || 'list');
  if (command === 'ui') return ui(argument, secondArgument, thirdArgument);
  if (command === 'version') {
    if (wantsHelp(argument)) return printHelp('version');
    return console.log((await readFile(resolve(packageRoot, 'VERSION'), 'utf8')).trim());
  }
  console.error(`未知命令：${command}\n`);
  printHelp('main');
  process.exitCode = 1;
}

main().catch((error) => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; });
