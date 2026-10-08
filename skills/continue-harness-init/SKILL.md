---
name: continue-harness-init
description: Connect Continue Harness to an existing project while preserving its files, toolchain and conventions.
---

# 接入已有项目

1. 读取项目约束、说明、代码结构和现有验证方式，确认项目目标、类型、技术栈及本次任务。
2. 运行 `continue-harness plan init --json`。保留项目自有内容，处理真实冲突后执行 `continue-harness init`。
3. 执行 Intake。根据已确认事实选择必要依据，记录来源、适用原因和版本；不适用项记录原因，不创建占位输入。
4. 运行 `inspect`、`doctor` 和 `inputs inspect`；将项目现有命令映射到验证配置。
5. 恢复当前任务、有效需求、决策、验收状态和下一步。新增任务先确认验收标准，再实施。
6. 维护需求 → 实现项 → 验收项 → 证据 → 交接状态，使用项目现有日志和历史记录保留过程。

UI、设计系统、API 生成等只在当前任务明确需要时启用。接入本身不要求提炼 Token、重写样式或替换工具链。供应商入口引用 AGENTS.md，Skill 按阶段使用。
