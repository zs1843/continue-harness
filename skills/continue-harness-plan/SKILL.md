---
name: continue-harness-plan
description: Produce and interpret continue-harness create or init plans before filesystem changes. Use when previewing generated files, assessing adoption conflicts, checking target paths, or requiring a non-mutating plan before create/init.
---

# 规划 Harness 变更

- 新项目：`continue-harness plan create <name> --output <完整目标目录> --json`。
- 现有项目：`continue-harness plan init --json`。
- 解释 `create`、`managed_unchanged`、`project_owned_modified`、`template_update_available` 和 `true_conflict` 的中文含义。
- `--output` 是完整项目目录，不是父目录。
- 计划阶段不得安装依赖或写入文件。
- 有真实冲突时列出精确文件和决策点，不擅自覆盖。
