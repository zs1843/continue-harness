---
name: continue-harness-task
description: Manage Continue Harness tasks, requirement-to-acceptance links and durable handoff snapshots.
---

# 任务与交接

1. 使用 `resume --task <id> --json` 恢复已有任务；新任务使用 `task create --title "<名称>" --json` 创建编号。
2. 登记有效需求，在 docs/ACCEPTANCE.md 关联需求编号、实现项、验收标准。实现前确认范围和非目标。
3. 实施后执行 `verify feature --task <id>` 或 `verify audit --task <id>`。报告必须对应任务及当前输入和实现版本。
4. 更新当前状态、决策及必要日志。延期或阻塞记录原因、确认人和后续条件，不能标记为通过。
5. 用 `task snapshot <id> --title "<名称>" --request "<要求>" --json` 创建交接快照。快照保存验收关系、上下文和验证报告副本；旧报告不匹配时先重新验证。
6. 交接说明目标、已完成项、未完成项、依据位置、风险和下一步。快照修订通过新建快照记录。

不增加平行台账，也不要求任务无关的 UI 或 Token 文件。
