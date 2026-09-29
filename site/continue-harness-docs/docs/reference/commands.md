# 命令参考

## 命令总览

| 命令 | 作用 | 什么时候用 | 是否写文件 |
| --- | --- | --- | --- |
| `version` | 输出 CLI 版本 | 检查工具是否可用 | 否 |
| `create` | 创建 Consumer H5 项目 | 新项目从零开始 | 是 |
| `init` | 接入已有项目 | 给现有项目补 Harness 文件 | 是，冲突时不写 |
| `migrate` | 迁移旧 `.fe-harness` 目录 | 升级已有项目状态目录 | 是，冲突时不写 |
| `plan` | 输出 create/init 结构化计划 | 写文件前预览 | 否 |
| `inspect` | 查看项目事实和能力 | Agent 开始任务前 | 否 |
| `doctor` | 只读诊断 | 排查配置、脚本、输入、Token、Agent readiness | 否 |
| `inputs` | 检查、比对、分析输入 | PRD/RP/UI/API/assets 进入后 | 主要只读 |
| `task` | 管理任务编号、历史、快照 | 功能开始和完成时 | 是 |
| `resume` | 恢复 AI 协作现场 | 换 Agent、换会话或继续中断任务 | 否 |
| `verify` | 执行验证模式 | 实现后或交付前 | 写报告 |
| `api` | OpenAPI 检查和生成 | API 任务 | inspect 只读，generate 写 generated |
| `design` | Design Token 检查、发现、diff | UI/视觉任务或既有项目接入 | discover/inspect 只读 |
| `ui` | UI System Adapter 管理 | 选择组件系统时 | install 写 Adapter evidence |
| `skills` | 安装 Agent Skills | 补齐 Codex/Claude/Cursor 工作流 | install 写 Skill 文件 |

## 默认流程命令

```bash
continue-harness create <项目名> --output <目录>
continue-harness init --dry-run
continue-harness inputs inspect --json
continue-harness task create --title "任务名称"
continue-harness verify feature
```

默认流程只保留最短闭环。更深能力通过任务类型进入，不要求新用户一开始理解所有命令。

## 创建和接入

```bash
continue-harness plan create my-h5 --json
continue-harness create my-h5
continue-harness create my-h5 --skip-install
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
```

`plan` 和 `--dry-run` 都是为了在写文件前暴露影响面。已有项目里，任何冲突都应该先交给人确认。

## 输入

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
continue-harness resume --json
```

`inspect` 关注文件和 manifest 是否一致，`analyze` 关注证据结论和冲突，`diff` 关注输入变化后旧结论是否还能继续使用。

## 任务

```bash
continue-harness task create --title "首次需求" --json
continue-harness task history T001 --json
continue-harness task snapshot T001 --title "首次需求" --request "完成页面" --json
```

任务命令的核心是稳定编号。编号把 PRD/RP、operationId、实现文件、验证报告和快照串起来。

## 验证

```bash
continue-harness verify quick
continue-harness verify feature
continue-harness verify runtime
continue-harness verify interaction
continue-harness verify visual
continue-harness verify audit
```

验证模式由 `.continue-harness/project.yaml` 映射到底层命令。Agent 不应该写死 `pnpm test`，而应读取项目配置。

## 诊断和检查

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

`resume` 只读汇总当前任务、输入状态、最近快照、覆盖矩阵、持久决策、Git 改动和下一步动作，用于把协作现场交给新的 Agent 或新的对话。

## OpenAPI

```bash
continue-harness api inspect --task T001 --json
continue-harness api generate --task T001 --dry-run
continue-harness api generate --task T001
```

API 生成必须先 inspect 和 dry-run。PRD 选择 operationId，OpenAPI JSON 提供字段契约，业务映射放在 generated 层之外。

## Design Token

```bash
continue-harness design tokens inspect --json
continue-harness design tokens discover --json
continue-harness design tokens diff --json
```

`inspect` 确认唯一真值文件和状态；`discover` 只读扫描既有样式；`diff` 用于把 Token 变化写入任务快照和历史。

## UI System

```bash
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
continue-harness ui systems install tdesign-uniapp
```

Adapter 安装只是证据安装，不会自动添加生产 UI 依赖，也不会替项目决定 Token 值。

UI Contract 检查和组件盘点：

```bash
continue-harness ui contract inspect --json
continue-harness ui contract inventory --write --json
```

## Skills

```bash
continue-harness skills list --json
continue-harness skills install --project --name consumer-h5-harness
continue-harness skills install --project --provider all --name consumer-h5-harness
continue-harness skills install --global --provider claude
```

项目级 Codex/Cursor 共用 `.agents/skills`，Claude Code 使用 `.claude/skills`。全局安装和覆盖已有 Skill 都需要人确认。
