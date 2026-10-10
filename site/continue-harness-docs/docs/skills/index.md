# 内置 Skills

本页说明操作 Skill 与 CLI 的关系及当前内置清单。安装方式见[安装 Skills](/skills/install)，操作步骤见[执行步骤](/skills/steps)。

## Skill 的职责

Skill 是由 Agent 加载的 Markdown 操作说明，用于指引具体能力的调用。它不是项目约束正文，也不是通用协作流程的前置条件。项目约束统一维护在 `AGENTS.md`。

仓库提供按操作划分的 Skills。根据当前阶段选择；也可以通过 Agent 对话完成流程，或在自动化中调用 CLI。`create` 和 `init` 不会默认安装 Skill，也不会创建聚合项目 Skill。

## 内置清单

仓库根目录 `skills/` 当前提供 12 个操作 Skill。以 `continue-harness skills list --json` 的当前输出为准。

| 名称 | 用途 |
| --- | --- |
| `continue-harness-create` | 从零创建项目协作空间 |
| `continue-harness-init` | 接入已有项目 |
| `continue-harness-inspect` | 读取项目事实与机器可读状态 |
| `continue-harness-plan` | 预览 `create`、`init` 的写入 |
| `continue-harness-doctor` | 只读诊断 |
| `continue-harness-verify` | 执行项目配置的验证 |
| `continue-harness-inputs` | 登记与分析按需选择的输入 |
| `continue-harness-task` | 任务编号、历史与快照 |
| `continue-harness-design-tokens` | 可选：维护设计值来源 |
| `continue-harness-api` | 可选：基于接口契约生成代码 |
| `continue-harness-skills` | 列出与安装 Skill |
| `continue-harness-version` | 检查 CLI 可用性与版本 |

## 安装位置

项目级 Skills 可放在 `.agents/skills/<名称>/` 或 `.claude/skills/<名称>/`。Codex 与 Cursor 使用 `.agents/skills/`；Claude Code 使用 `.claude/skills/`。全局安装位置由宿主决定。

## 项目约束

`AGENTS.md` 是项目约束的唯一权威来源；`CLAUDE.md` 与 `.cursor/rules/` 只做入口适配。Skill 说明操作，不覆盖项目约束。

## 相关页面

- [安装 Skills](/skills/install)
- [执行步骤](/skills/steps)
