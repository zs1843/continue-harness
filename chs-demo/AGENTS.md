# 项目约束

本文是项目唯一的 Agent 约束本体。供应商适配文件只能导入或指向本文，不得复制约束。

## 工作原则

- 先读取 `.continue-harness/project.yaml`、`.continue-harness/intake.yaml` 和 `docs/PROJECT.md`。
- 先恢复上下文，再执行动作：读取当前任务、最近快照、有效输入、决策、未决项和最近日志。
- 技术栈未知时不得猜测或生成框架模板；先记录为 pending 并询问必要事实。
- 原始输入只读，所有输入必须登记、记录版本或哈希并关联任务。
- 每项需求必须有可审计的验收标准和测试证据。
- 失败、重试、延期和外部阻塞必须写入日志或任务记录。
- 未闭环的项目不得宣称完成。

## 默认流程

```text
intake → inputs → task → implement → verify → acceptance → snapshot → resume
```

每轮工作结束时记录：完成项、未完成项、依据、风险、日志位置和下一步动作。

进入项目时执行 `continue-harness inspect` 和 `continue-harness doctor`；验证时执行 `continue-harness verify`；任务完成时创建任务快照。
