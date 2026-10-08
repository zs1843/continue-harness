---
name: continue-harness-verify
description: Run configured project checks and validate requirement-to-evidence links without overstating task completion.
---

# 验证与验收

读取项目配置与当前任务的验收标准，按任务范围选择检查。quick 用于快速反馈；feature 和 audit 用于任务验收。运行 `continue-harness verify feature --task <id>` 或 `continue-harness verify audit --task <id>` 明确报告所属任务。

docs/ACCEPTANCE.md 中每项验收须关联有效需求、实现项及可读取的本地证据。延期或阻塞记录原因、确认人和后续条件，不能声明通过。旧验收表缺少关联时补齐原有记录，不重复创建台账。

runtime、interaction、visual 等模式按实际项目配置使用，不为所有项目添加浏览器、UI 或截图要求。输入、实现或验收标准发生变化后重新验证；只有检查和验收均满足当前范围时才能报告完成。
