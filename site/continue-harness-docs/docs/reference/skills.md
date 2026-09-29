# Skill 列表说明

## 查看 Skill

```bash
continue-harness skills list --json
```

## 安装策略

默认项目只需要聚合 Skill：

```bash
continue-harness skills install --project --provider all --name consumer-h5-harness
```

命令级 Skills 按需安装：

```bash
continue-harness skills install --project --name continue-harness-api
```

全局安装需要用户确认：

```bash
continue-harness skills install --global --provider claude --name consumer-h5-harness
```

## 清单

| Skill | 作用 | 典型触发 |
| --- | --- | --- |
| `consumer-h5-harness` | Consumer H5 总工作流 | 创建/接入项目、实现页面、验证功能、创建快照 |
| `continue-harness-create` | 创建项目专项流程 | 从零创建项目、准备输入目录、建立首个任务 |
| `continue-harness-init` | 接入已有项目专项流程 | init dry-run、冲突处理、存量 Token discovery |
| `continue-harness-inspect` | 状态读取 | 查看 project facts、输入状态、Token 状态、Agent readiness |
| `continue-harness-plan` | 计划预览 | create/init 前查看会写哪些文件 |
| `continue-harness-doctor` | 只读诊断 | 检查 Node、pnpm、脚本、页面、输入、Token、视觉基线 |
| `continue-harness-inputs` | 输入管理 | 登记和分析 PRD/RP/UI/API/assets |
| `continue-harness-task` | 任务管理 | 创建 T001、查看历史、创建 snapshot |
| `continue-harness-verify` | 分层验证 | 根据改动选择 quick/feature/runtime/visual/audit |
| `continue-harness-api` | API 生成 | 从 OpenAPI JSON 选择 operationId 并生成类型/wrapper |
| `continue-harness-design-tokens` | Token 维护 | 提炼 Token、确认来源、diff、记录覆盖 |
| `continue-harness-skills` | Skill 安装 | 项目级/全局安装、供应商适配 |
| `continue-harness-version` | 版本检查 | 验证 CLI 可用性和项目声明版本 |

## 为什么不是全部默认安装

全部默认安装会让 Agent 在每次任务里都看到过多专项规则。比如普通文案调整不需要 OpenAPI 生成规则，接口任务也不需要视觉基线细节。

默认聚合 Skill 提供正确路线，专项 Skill 在需要时进入上下文。这能降低认知负担，也能减少 Agent 把无关规则误用到当前任务。
