# 内置 Skills

本页说明 Skill 是什么、Skill 与 CLI 的关系，以及内置清单与默认安装策略。安装命令和参数见[安装 Skills](/skills/install)，逐项执行步骤见[执行步骤](/skills/steps)。

## Skill 是什么

Skill 的主体是 `SKILL.md` 中的纯 Markdown 指令，本身不含可执行代码。它描述读取顺序、判断条件和要调用的 CLI 命令，由支持项目级 Skill 的 Agent 加载并执行。

每个 Skill 是一个目录，包含 `SKILL.md` 以及可选的 `agents/`（宿主元数据）和 `references/`。项目级安装位置为 `.agents/skills/<名称>/` 或 `.claude/skills/<名称>/`。

写盘、校验和生成由 CLI 执行；Skill 负责选择命令、参数和顺序。

## Skill 与 CLI 的关系

推荐用法是把项目打开在支持 Skill 的 Agent 里，让 Agent 用 Skill 执行。CLI 是可选回退，用在自动化、CI 和排查。

| 事项 | Skill | CLI |
| --- | --- | --- |
| 定位 | 工作流与判断 | 确定性动作 |
| 调用者 | Agent | Agent、脚本、CI |
| 典型场景 | 打开项目后交给 Agent | 自动化、CI、排查 |
| 手写 | 不适用 | 可用，不推荐作为日常入口 |

## 两类 Skill

聚合工作流 Skill 覆盖一次任务的完整流程，命令级 Skill 覆盖单个动作。

| 类型 | 数量 | 职责 | 安装时机 |
| --- | --- | --- | --- |
| 聚合工作流 | 2 | 从读取事实到验收闭环 | `create`、`init` 默认安装 |
| 命令级 | 12 | 单个命令的判断与参数 | 需要时用 `--name` 安装 |

## 默认安装策略

`create` 和 `init` 默认只安装一个聚合 Skill。

| preset | 安装的聚合 Skill |
| --- | --- |
| `generic`（默认） | `generic-harness` |
| `consumer-h5` | `consumer-h5-harness` |

默认落点为 `.agents/skills/<名称>/` 与 `.claude/skills/<名称>/`，不写 `.cursor/skills`，因为 Cursor 读 `.agents/skills`。

只安装一个的原因是控制上下文：全部安装会让 Agent 在每次任务里看到 OpenAPI 生成、视觉基线等与当前阶段无关的规则。命令级 Skill 在具体阶段需要时再安装。

## 内置清单

仓库根 `skills/` 下可发现 14 个 Skill。npm 包内另有历史 `fe-harness-*` 别名，引用旧 `.fe-harness/` 目录，已过时；本页以仓库根 `skills/` 为准。

| 名称 | 类型 | 用途 | 默认是否安装 |
| --- | --- | --- | --- |
| `generic-harness` | 聚合工作流 | 通用项目流程：Intake、上下文恢复、日志和验收闭环 | 是 |
| `consumer-h5-harness` | 聚合工作流 | Consumer H5 完整流程：输入、页面拆分、Token、验证、快照 | 否，仅 `--preset consumer-h5` 时 |
| `continue-harness-create` | 命令级 | 从零创建项目 | 否 |
| `continue-harness-init` | 命令级 | 接入已有项目 | 否 |
| `continue-harness-inspect` | 命令级 | 读取项目事实与机器可读状态 | 否 |
| `continue-harness-plan` | 命令级 | 预览 `create`、`init` 的写入 | 否 |
| `continue-harness-doctor` | 命令级 | 只读诊断 | 否 |
| `continue-harness-verify` | 命令级 | 分层验证 | 否 |
| `continue-harness-inputs` | 命令级 | 登记与分析项目按需选择的输入 | 否 |
| `continue-harness-task` | 命令级 | 任务编号、历史与快照 | 否 |
| `continue-harness-design-tokens` | 命令级 | 维护唯一 Token 真值 | 否 |
| `continue-harness-api` | 命令级 | 选择 operationId 并生成类型与 wrapper | 否 |
| `continue-harness-skills` | 命令级 | 列出与安装 Skill | 否 |
| `continue-harness-version` | 命令级 | 检查 CLI 可用性与版本 | 否 |

## Skill 与项目约束

`AGENTS.md` 是唯一项目约束正文；`CLAUDE.md` 与 `.cursor/rules/` 只做供应商适配，指向 `AGENTS.md`。Skill 定义可调用工作流，不覆盖约束。

## 相关页面

- [安装 Skills](/skills/install)
- [执行步骤](/skills/steps)
