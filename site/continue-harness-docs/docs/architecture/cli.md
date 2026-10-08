# CLI

CLI 位于 `packages/cli/`，是开发者、CI 和 Agent 的共同入口。本页列出默认路径、按需命令、JSON 输出和命令边界。

## 与 Skill 的关系

CLI 是 Skill 的底层执行入口；日常由 Skill 调用，CLI 用于自动化、CI 和排查。命令与 Skill 的完整映射见[命令](../reference/commands.md)。

## 默认路径

主帮助只展示 `create/init → intake → inputs → task → verify`；其余命令按需启用，避免新用户以为必须一次性理解所有能力。

| 命令 | 作用 |
| --- | --- |
| `create` | 创建通用项目或指定 preset 的项目 |
| `init` | 接入已有项目，只创建缺失文件 |
| `migrate` | 把旧 `.fe-harness` 状态目录迁移为 `.continue-harness` |
| `intake` | 通过多轮问答确认项目事实和最小输入清单 |
| `inputs` | 检查、比对和分析 PRD/RP/UI/API/assets 输入 |
| `task` | 创建任务、查看历史、创建不可变任务快照 |
| `verify` | 执行 quick/feature/runtime/interaction/visual/audit 验证模式 |

## 按需命令

| 命令 | 作用 |
| --- | --- |
| `doctor` | 只读诊断 |
| `inspect` | 查看项目事实 |
| `plan` | 输出结构化计划 |
| `resume` | 恢复上一次协作现场 |
| `design` | Design Token inspect、discover、diff |
| `ui` | UI System Adapter 管理和 UI 组件清单 |
| `api` | OpenAPI 检查和生成 |
| `skills` | 列出或安装 Agent Skills |
| `version` | 输出 CLI 版本 |

## JSON 输出

多个命令支持 `--json`；这些命令也可由对应 Skill 触发，映射见[命令](../reference/commands.md)。

**Skill**：`continue-harness-inspect`、`continue-harness-plan`、`continue-harness-inputs`、`continue-harness-verify`

**CLI（可选）**：

```bash
continue-harness inspect --json
continue-harness plan init --json
continue-harness inputs analyze --json
continue-harness verify audit --json
```

JSON 输出供 Agent 和 CI 读取状态，不需要解析人类文本。

## 边界

CLI 不编码业务页面、API 路径、品牌值或项目私有决策；公共接口变更需要兼容性评审。项目在 `.continue-harness/project.yaml` 中拥有事实、命令映射和验证策略，CLI 只负责命令路由和结果报告，Core 执行协议。通用安全模型见仓库根 `docs/ARCHITECTURE.md`。
