# 命令

本页是 CLI 命令、子命令、常用参数和写文件行为的权威清单，供 Agent、CI 和故障排查使用。CLI 是可选入口：各节示例均为可选写法，默认由「命令列表」中的对应 Skill 执行。日常接入流程见[项目接入](/guide/ai-first)。

## 命令列表

| 命令 | 作用 | 什么时候用 | 是否写文件 | Skill |
| --- | --- | --- | --- | --- |
| `version` | 输出 CLI 版本 | 检查工具是否可用 | 否 | `continue-harness-version` |
| `create` | 创建通用项目或指定 preset 的项目 | 新项目从零开始 | 是 | `continue-harness-create` |
| `init` | 接入已有项目 | 给现有项目补 Harness 文件 | 是，冲突时不写 | `continue-harness-init` |
| `migrate` | 迁移旧 `.fe-harness` 目录 | 升级已有项目状态目录 | 是，冲突时不写 | 仅 CLI |
| `intake` | 按轮次确认项目事实和最小输入清单 | 项目类型或输入范围尚未确定 | `inspect` 只读；`answer`、`evidence` 写 `.continue-harness/intake.yaml` | `generic-harness`（consumer-h5 项目为 `consumer-h5-harness`） |
| `plan` | 输出 create/init 结构化计划 | 写文件前预览 | 否 | `continue-harness-plan` |
| `inspect` | 查看项目事实和能力 | Agent 开始任务前 | 否 | `continue-harness-inspect` |
| `doctor` | 只读诊断 | 排查配置、脚本、输入、Token、Agent readiness | 否 | `continue-harness-doctor` |
| `inputs` | 检查、比对、分析输入 | PRD/RP/UI/API/assets 进入后 | 主要只读 | `continue-harness-inputs` |
| `task` | 管理任务编号、历史、快照 | 功能开始和完成时 | 是 | `continue-harness-task` |
| `resume` | 恢复 AI 协作现场 | 换 Agent、换会话或继续中断任务 | 否 | `generic-harness`（consumer-h5 项目为 `consumer-h5-harness`） |
| `verify` | 执行验证模式 | 实现后或交付前 | 写报告 | `continue-harness-verify` |
| `api` | OpenAPI 检查和生成 | API 任务 | `inspect` 只读，`generate` 写 generated | `continue-harness-api` |
| `design` | Design Token 检查、发现、diff | UI/视觉任务或既有项目接入 | 只读 | `continue-harness-design-tokens` |
| `ui` | UI System 与 UI Contract 证据管理 | 选择组件系统或盘点组件 | `install`、`inventory --write` 写 Adapter 或清单文件 | 仅 CLI |
| `skills` | 安装 Agent Skills | 补齐 Codex/Claude/Cursor 工作流 | `install` 写 Skill 文件 | `continue-harness-skills` |

## 默认流程

CLI 为可选入口；默认由对应 Skill 执行。

```bash
continue-harness create <项目名> --output <目录>
continue-harness init --dry-run
continue-harness inputs inspect --json
continue-harness task create --title "任务名称"
continue-harness verify feature
```

## 创建和接入

```bash
continue-harness plan create my-project --json
continue-harness create my-project
continue-harness create my-project --preset consumer-h5
continue-harness create my-project --skip-install
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
```

`plan` 和 `--dry-run` 在写文件前列出影响面。已有项目中检测到真实冲突时，`init` 不写入任何文件。

## 输入登记

`intake` 分两轮记录项目事实：第一轮是项目类型、目标、运行环境和工具链，第二轮按项目类型生成最小输入清单。

```bash
continue-harness intake inspect --json
continue-harness intake answer --type frontend --goal "会员中心" --runtime "移动端 WebView" --toolchain "uni-app + Vue 3"
continue-harness intake evidence --id api --status confirmed --source docs/api.md --version 1.0
```

`inputs` 检查登记结果和文件漂移：

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
```

`inspect` 比对输入目录与 `manifest.yaml`，`analyze` 抽取证据结论和同 key 冲突，`diff` 报告输入变化后旧结论是否仍可使用。

## 任务

```bash
continue-harness task create --title "首次需求" --json
continue-harness task inspect T001 --json
continue-harness task history T001 --json
continue-harness task snapshot T001 --title "首次需求" --request "完成页面" --json
```

任务编号是稳定标识：PRD/RP 片段、operationId、实现文件、验证报告和快照都记录同一个任务编号。

## 验证

```bash
continue-harness verify feature
```

`verify` 接受 6 个模式名，模式定义和门禁行为见[验证模式](./verification-modes.md)。模式在 `.continue-harness/project.yaml` 的 `verify` 中映射到 `commands`，CLI 不内置具体测试命令。

## 诊断

```bash
continue-harness inspect --json
continue-harness doctor
continue-harness doctor --json
```

## Resume

```bash
continue-harness resume
continue-harness resume --task T001 --json
```

`resume` 只读汇总当前任务、输入状态、最近快照、覆盖矩阵、持久决策、Git 改动和下一步动作。

## OpenAPI

```bash
continue-harness api inspect --task T001 --json
continue-harness api generate --task T001 --dry-run
continue-harness api generate --task T001
```

生成前必须先 `inspect` 和 `--dry-run`。PRD 选择 operationId，OpenAPI JSON 提供字段契约，业务映射写在 generated 层之外。

## Design Token

```bash
continue-harness design tokens inspect --json
continue-harness design tokens discover --json
continue-harness design tokens diff --json
```

`inspect` 检查唯一真值文件和 Token 状态；`discover` 只读扫描 `src/` 下的样式文件并输出候选值；`diff` 只读，仅当项目提供前后版本时给出差异。

## UI System

```bash
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
continue-harness ui systems install tdesign-uniapp
```

```bash
continue-harness ui contract inspect --json
continue-harness ui contract inventory --write --json
```

Adapter 安装只写入证据文件，不添加生产 UI 依赖，也不决定 Token 取值。

## Skills

```bash
continue-harness skills list --json
continue-harness skills install --project --name consumer-h5-harness
continue-harness skills install --project --provider all --name consumer-h5-harness
continue-harness skills install --global --provider claude --name continue-harness-init --target ~/.claude/skills
continue-harness skills install --project --name continue-harness-api --force
```

`--provider` 默认 `codex`，`all` 同步 Codex、Claude Code 和 Cursor。项目级 Codex/Cursor 共用 `.agents/skills`，Claude Code 使用 `.claude/skills`。`--target` 指定安装目录，不能与 `--provider all` 同用；目标已存在且未指定 `--force` 时跳过。

## 边界

`ui systems install tdesign-uniapp` 安装的 adapter 在 `ui-systems/tdesign-uniapp/adapter.yaml` 中标记为 `status: experimental`。`skills install --global` 和 `--force` 覆盖已有 Skill 需要人工确认。
