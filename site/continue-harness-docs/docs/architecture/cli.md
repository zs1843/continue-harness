# CLI

CLI 位于 `packages/cli/`，是开发者、CI 和 Agent 的共同入口。

## 基础命令

| 命令 | 作用 |
| --- | --- |
| `create` | 创建通用项目或指定 preset 的项目 |
| `init` | 接入已有项目 |
| `inputs` | 检查和分析输入 |
| `task` | 创建任务、历史和快照 |
| `verify` | 执行验证模式 |
| `doctor` | 只读诊断 |
| `inspect` | 查看项目事实 |
| `plan` | 输出结构化计划 |
| `skills` | 安装 Agent Skills |
| `api` | OpenAPI 检查和生成 |
| `ui` | UI System Adapter 管理 |

## 为什么 CLI 默认帮助要轻

主帮助只展示 `create/init -> inputs -> task -> verify`。这是默认路径，也是最常用路径。

其他命令不是隐藏，而是按需启用：

- UI 任务再看 `design` 和 `ui`。
- API 任务再看 `api`。
- 诊断或接入时再看 `inspect`、`doctor`、`plan`。
- Agent 工作流扩展时再看 `skills`。

默认帮助如果展示太多，会让新用户以为必须一次性理解所有能力。

## JSON 输出

多个命令支持 `--json`，用于 Agent 和 CI：

```bash
continue-harness inspect --json
continue-harness plan init --json
continue-harness inputs analyze --json
continue-harness verify audit --json
```

稳定 JSON 输出让自动化可以读取状态，而不是解析人类文本。
