---
name: generic-harness
description: 通用项目约束、Intake、上下文恢复、日志和验收闭环
---

# 通用 Harness 工作流

所有项目先确认基本信息，再按项目类型生成最小输入清单。不得因为熟悉某个技术栈就擅自生成模板或补写事实。

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
