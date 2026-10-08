# 工作流总览

continue-harness 的最短闭环是：

```text
create / init → inspect → intake（适用时）→ inputs → task → implement → resume → verify → snapshot
```

每一步都对应一个可读取的项目事实或可验证的结果。Harness 不替 Agent 决定业务，而是保证 Agent 在同一套约束和证据上继续工作。

## 两种入口

| 场景 | 入口 | 结果 |
| --- | --- | --- |
| 从零开始 | `continue-harness create <name>` | 生成当前支持的业务中立项目容器和验证基础设施 |
| 已有项目 | `continue-harness init --dry-run` | 预览将补充的约束、输入、历史和报告文件 |

## 推荐主线

```bash
continue-harness inspect --json
continue-harness intake inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "任务名称" --json
continue-harness resume --json
continue-harness verify feature
continue-harness task snapshot T001 --title "任务名称" --request "本次用户要求" --json
```

`inspect` 用来确认项目事实，`inputs` 用来确认实现依据，`task` 用来建立稳定编号，`resume` 用来恢复协作现场，`verify` 和 `snapshot` 用来留下可追溯结果。

## 能力按证据启用

默认工作流只有项目检查、输入、任务和验证。只有任务确实需要时，才加载：

- API 任务：OpenAPI snapshot、operationId 选择和生成保护。
- UI 任务：Design Token、UI Contract、UI System 和视觉验证。
- 架构任务：`ARCHITECTURE.md`、`DECISIONS.md` 和相关历史。

这样可以减少 Agent 上下文污染，也避免为尚未发生的需求预先安装大量 Skill。
