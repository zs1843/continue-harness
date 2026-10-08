# 只读命令示例

本页列出在仓库 `0.1.0`（2026-10-08）上执行过的只读命令及输出片段。`plan` 只输出目标清单，不写入文件；命令均从仓库根目录执行。

## 版本

```bash
node packages/cli/bin/continue-harness.mjs version
```

```text
0.1.0
```

## 创建计划

`plan create` 输出将要创建的文件清单，不写入文件。

```bash
node packages/cli/bin/continue-harness.mjs plan create demo-h5 --json
```

```json
{
  "action": "create",
  "entries": [
    { "status": "create", "target": ".continue-harness/inputs/README.md" },
    { "status": "create", "target": ".continue-harness/inputs/manifest.yaml" },
    { "status": "create", "target": ".continue-harness/intake.yaml" },
    { "status": "create", "target": ".continue-harness/logs/README.md" },
    { "status": "create", "target": ".continue-harness/project.yaml" },
    { "status": "create", "target": ".cursor/rules/continue-harness.mdc" },
    { "status": "create", "target": ".gitignore" },
    { "status": "create", "target": "AGENTS.md" },
    { "status": "create", "target": "CLAUDE.md" },
    { "status": "create", "target": "docs/ACCEPTANCE.md" },
    { "status": "create", "target": "docs/CURRENT_STATUS.md" },
    { "status": "create", "target": "docs/DECISIONS.md" },
    { "status": "create", "target": "docs/PROJECT.md" },
    { "status": "create", "target": "docs/history/README.md" },
    { "status": "create", "target": ".agents/skills/generic-harness/SKILL.md" },
    { "status": "create", "target": ".claude/skills/generic-harness/SKILL.md" },
    { "status": "create", "target": ".agents/skills/generic-harness/agents/openai.yaml" },
    { "status": "create", "target": ".claude/skills/generic-harness/agents/openai.yaml" }
  ],
  "name": "demo-h5",
  "output": "<工作目录>/demo-h5",
  "status": "ready",
  "preset": "generic"
}
```

默认 `preset` 为 `generic`，`output` 是当前工作目录下的绝对路径，`status: ready` 表示本次计划未发现阻止创建的冲突。上面的 18 个 `target` 就是 generic 清单的全部条目。

`--preset consumer-h5` 在同一协议下生成 70 个目标，其中包含 generic 清单没有的 `src/App.vue`、`src/components/BaseButton.vue`、`src/pages.json`、`src/pages/index/index.vue`、`package.json`、`playwright.config.mjs`、`tests/e2e/runtime.spec.mjs`、`docs/design/tokens.json` 等。

接入已有项目时使用 `plan init --json`，每个条目给出 `create`、`managed_unchanged` 或 `project_owned_modified` 状态，项目自有文件不会被覆盖。后续步骤见[创建项目 SOP](../sop/create-project.md) 和[接入已有项目 SOP](../sop/init-existing-project.md)。

## 项目事实

```bash
node packages/cli/bin/continue-harness.mjs inspect --json
```

本仓库的输出为 `product_type: developer_tooling`、`stack.adapter: node-esm`，`modes` 列出 `quick`、`feature`、`audit`。生成项目读取自己的 `.continue-harness/project.yaml`，其项目类型、技术栈、验证模式和输入状态与本仓库相互独立。

## 诊断

```bash
node packages/cli/bin/continue-harness.mjs doctor --json
```

`doctor --json` 返回顶层 `status` 和 `results`，每项检查带稳定的 `code` 和状态。本仓库中 `RUNTIME_NODE_VERSION`、`CI_ENTRY_POINT`、`PROJECT_SCRIPT` 为 `passed`；`OPENAPI_SNAPSHOT` 为 `not_configured`，表示该项尚未配置；`INPUTS`、`TASK_HISTORY`、`VISUAL_BASELINE` 为 `not_applicable`。目标项目的诊断内容来自该项目自己的配置和文件。

## 示例状态

`demo-h5` 已登记一份 PRD 草稿，当前可验证的是输入登记、哈希检查和 `draft` 状态。[证据记录](./demo-h5-capture.md)列出已验证事实与待补证据。
