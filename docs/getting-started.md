# Getting started

Install dependencies and run the self-tests:

```bash
corepack pnpm install
corepack pnpm test
```

To create a new consumer H5 project:

```bash
continue-harness plan create my-h5 --json
continue-harness create my-h5
cd my-h5
pnpm exec playwright install chromium
continue-harness doctor
continue-harness verify audit
```

`create` 默认使用项目声明的 Corepack/pnpm 安装依赖。离线生成时使用
`continue-harness create my-h5 --skip-install`，之后手动执行 `pnpm install`。

生成项目默认只包含总工作流 Skill，避免把每个命令 Skill 重复复制到项目。默认工作路径只有
`create/init → inputs → task → verify`；Design Token、UI System、OpenAPI 和视觉基线仅在对应任务
需要时启用。独立 Skills 可通过 `continue-harness skills install --project --name <名称>` 按需安装，
或经用户确认后使用
`continue-harness skills install --global` 安装到全局 Codex Skills 目录。

项目约束只维护在根目录 `AGENTS.md`。Claude Code 通过 `CLAUDE.md` 导入它；Cursor 会读取
`AGENTS.md`，并由 `.cursor/rules/continue-harness.mdc` 明确该唯一来源。不要在供应商配置中复制约束。
多供应商项目可执行：

```bash
continue-harness skills install --project --provider all
```

For local Harness development, make `continue-harness` available on `PATH` by linking the package binary
with a Node.js 20 environment. Published installations should provide the same global command; AI
agents should call that command directly instead of relying on a repository-relative path.

To inspect initialization without changing a target project:

```bash
node packages/cli/bin/continue-harness.mjs init --dry-run
```

Projects own `.continue-harness/project.yaml`; the package only supplies defaults and validation.

Initialization performs a complete preflight before writing. Existing identical files are kept;
if any target differs, initialization reports the conflict and writes nothing.

接入已有项目后必须主动执行存量视觉发现，而不是让新 Token 文件长期停留在空模板：

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```

发现命令只读扫描 `src/` 下 Vue/CSS/SCSS/Less 样式，输出 CSS Variables、高频颜色、字体、间距、
圆角、阴影、尺寸、层级、动效和断点候选。确认后再写入唯一 Token 真值，不自动重写旧样式。

Consumer H5 项目把原始证据分别放入 `.continue-harness/inputs/prd/`、`rp/`、`ui/`、`api/` 和
`assets/`，并登记到 `manifest.yaml`。原始证据默认只读。Agent 分别按业务、交互和视觉
优先级分析输入，维护中文事实文档、覆盖矩阵、变更历史和不可变任务快照。

输入收集发生在项目创建之后。输入暂时为空时，项目保持“等待输入”，不要创建虚假业务任务或
直接实现脚手架示例页。文件放好后依次执行：

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "根据首批输入实现项目" --json
```

To consume an Apifox contract, export OpenAPI 3.x JSON through Apifox's official export, script, or
an MCP integration, store it under `.continue-harness/snapshots/openapi.json`, and enable the commented
`sources.api` block in `.continue-harness/project.yaml`. Doctor checks that the snapshot exists, parses as
JSON, declares OpenAPI 3.x (or Swagger 2.0), and contains a `paths` object. Credentials remain in
environment variables and must not be written to configuration or snapshots.
