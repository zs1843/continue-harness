---
name: generic-harness
description: 通用项目约束、Intake、上下文恢复、日志和验收闭环
---

# 通用 Harness 工作流

所有项目先确认基本信息，再按项目类型生成最小输入清单。不得因为熟悉某个技术栈就擅自生成模板或补写事实。

## 读取顺序

1. `.continue-harness/project.yaml`
2. `.continue-harness/intake.yaml`
3. `AGENTS.md`
4. `docs/PROJECT.md`、`docs/CONSTRAINTS.md`、`docs/CURRENT_STATUS.md`
5. 当前任务、有效输入、决策、快照和日志

## 交接要求

每轮结束记录目标、依据、变更、验证、失败重试、风险和下一步。只有确认后的事实才能进入 canonical 上下文。
