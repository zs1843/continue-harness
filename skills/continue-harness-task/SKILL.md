---
name: continue-harness-task
description: Manage stable continue-harness task IDs, modular PRDs, task history, and immutable snapshots. Use when starting a feature/fix/visual adjustment, inspecting T001-style history, recording actual verification and files, or completing a task with traceable PRD/RP/UI/API/asset evidence.
---

# 管理任务与历史

1. 没有编号时运行 `continue-harness task create --title "<名称>" --json`；已有稳定编号时显式传入。
2. 用 `continue-harness task inspect <id> --json` 或 `task history` 查看已有快照和模块信息。
3. 实现前登记全部输入，并将 PRD/RP 中每个页面、弹窗、关键状态和跳转目标拆成覆盖矩阵独立行。
4. 验证后更新 CURRENT_STATUS、DECISIONS、PRD_HISTORY、CHANGE_HISTORY 和 CHANGELOG。
5. 创建快照前确认没有 `待分析`、`待实现`、`实现中`、`待验证` 或空状态；否则继续执行或集中询问用户。
6. 执行 `continue-harness task snapshot <id> --title "<名称>" --request "<要求>" --json`。
7. 快照默认不可修改；发现错误创建修订快照。不得把密钥、Cookie、Token、`.env` 内容或个人敏感数据写入快照。
