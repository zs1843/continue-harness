---
name: generic-harness
description: 通用项目约束、Intake、上下文恢复、日志和验收闭环
---

# 通用 Harness 工作流

所有项目先确认基本信息，再按项目类型生成最小输入清单。不得因为熟悉某个技术栈就擅自生成模板或补写事实。

核心关系为需求 → 实现项 → 验收项 → 证据 → 交接状态。项目类型只提供候选输入，结合技术栈、任务范围和对话结论确认适用项；UI、API 和 Token 均非通用必需项。非适用项记录原因，自定义类型在 manifest 中登记。

验收标准在实现前定义，复用 docs/ACCEPTANCE.md 记录关联。通过 verify feature/audit --task <id> 绑定报告与任务版本；输入或实现变化后重新验证。恢复时读取项目事实、全部有效决策、当前任务、验收及来源文件，不能仅依赖上次对话。

Intake 第二轮必须逐项确认输入：必需项要有来源，非适用项明确标记 `not_applicable`，不能用 Harness
占位文档冒充真实证据。任务交接前必须完成验收状态收口并保留最近一次验证报告。

## 读取顺序

1. `.continue-harness/project.yaml`
2. `.continue-harness/intake.yaml`
3. `AGENTS.md`
4. `docs/PROJECT.md`、`docs/CURRENT_STATUS.md`、`docs/ACCEPTANCE.md`
5. `docs/DECISIONS.md`、当前任务、有效输入、快照和日志

职责边界：`inputs/` 保存原始证据，`logs/` 保存追加式执行轨迹，`docs/history/` 保存不可变交接快照，`docs/DECISIONS.md` 保存长期决策；不要在这些目录之间复制同一份内容。

## 交接要求

每轮结束记录目标、依据、变更、验证、失败重试、风险和下一步。只有确认后的事实才能进入 canonical 上下文。
