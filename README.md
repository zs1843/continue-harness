# continue-harness

[中文](README.md) ｜ [English](README.en.md)

`continue-harness` 是一个与技术栈无关的项目约束与质量保障工具。它提供可追踪的项目事实、可恢复的 AI 交接、输入与决策管理、结构化日志、自动化验证、验收闭环和可审计报告。

当前仓库已内置的可选适配器包括：

- 产品形态：`consumer-h5`
- 平台适配器：`web-mobile`
- 技术栈适配器：`uni-app`

以上适配器只在显式选择对应 preset 时启用，默认项目不绑定语言、框架或技术栈。

## 安装

当前 `0.1.0` 版本尚未发布到 npm，`@company` 仍是待配置的占位 scope。请先从源码安装依赖：

```bash
git clone https://github.com/zs1843/continue-harness.git
cd continue-harness
pnpm install
node packages/cli/bin/continue-harness.mjs version
```

环境要求：Node.js 20 或更高版本、pnpm 10.12.1 或兼容版本。本文后续命令使用已加入 PATH 的 `continue-harness` 写法；在源码目录直接运行时，将其替换为 `node packages/cli/bin/continue-harness.mjs`。

## 快速开始

### 创建新项目

```bash
continue-harness plan create project-core --json
continue-harness create project-core
cd project-core
continue-harness intake inspect --json
continue-harness intake answer --type backend --json
continue-harness inspect --json
continue-harness doctor
```

`create` 默认只生成约束容器，不创建业务代码或技术栈依赖。确认项目类型后，使用 `intake answer` 生成最小必要输入清单；技术栈适配器按需启用。

### 接入已有项目

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

`init` 会先预检，创建缺失文件并保留项目已有文件；发现真实冲突时不会写入任何文件。

### 登记输入并验证任务

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "实现首批需求"
continue-harness verify feature
```

## 命令

```bash
continue-harness create my-h5 --dry-run
continue-harness create my-h5
continue-harness init --dry-run
continue-harness init
continue-harness migrate --dry-run
continue-harness inspect --json
continue-harness plan init --json
continue-harness plan create my-h5 --json
continue-harness doctor
continue-harness verify quick
continue-harness verify feature
continue-harness verify visual
continue-harness verify audit
continue-harness inputs inspect --json
continue-harness design tokens inspect --json
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
continue-harness task create --title "首次需求"
continue-harness skills list --json
continue-harness skills install --project
continue-harness skills install --global
continue-harness version
continue-harness -v
continue-harness --version
```

`create --preset consumer-h5` 才会生成 uni-app、Vue 3、Vite、Playwright 等 H5 工程内容。`init` 会接入已有项目，不覆盖项目自有文件。AI Agent 应先恢复上下文和 Intake，再登记证据、创建任务，并根据项目配置选择验证模式。

如果任务需要，仍可通过显式安装使用命令级 Skill。

`AGENTS.md` 是唯一的项目约束正文。生成的 `CLAUDE.md` 会导入它，Cursor 会获得指向它的薄规则；Codex/Cursor 使用 `.agents/skills`，Claude Code 使用 `.claude/skills`。支持的 Provider 可以这样安装工作流：

```bash
continue-harness skills install --project --provider all --name consumer-h5-harness
continue-harness skills install --global --provider claude
continue-harness skills install --global --provider cursor
```

## 架构

```text
Core
  + Product Profile
  + Platform Adapter
  + Stack Adapter
  + Project-owned configuration
```

Core 不包含产品页面、业务状态、API 端点、品牌值或设计 Token，也不导入具体 UI 组件库。可选的 UI System Adapter 负责将语义组件和项目自有语义 Token 映射到选定的组件库，详见 [`docs/UI_SYSTEMS.md`](docs/UI_SYSTEMS.md)。

## 文档站点

可部署的 VitePress 文档站点位于 `site/continue-harness-docs/`，介绍项目背景、SOP、模块设计、Agent 工作流、验证策略和静态部署方式。

在线文档：[https://ai.zs1843.cn](https://ai.zs1843.cn)

具体行为和当前限制请参阅[项目案例](site/continue-harness-docs/docs/showcase/case-study.md)和[可复现 CLI 示例](site/continue-harness-docs/docs/showcase/workflow-example.md)。

```bash
cd site/continue-harness-docs
pnpm install
pnpm docs:build
```

## 状态

本仓库目前是初始的 `0.1.0` 实现。Core 和 CLI 包已经可以进行 registry 打包验证，但发布前仍需替换或配置占位的 `@company` scope。发布、升级、API 合约适配器以及更多项目 Profile 仍需单独做出发布决策。
