---
name: continue-harness-plan
description: 在修改文件系统前，生成并解读 continue-harness 的 create 或 init 计划。适用于预览生成文件、评估接入冲突、检查目标路径，或在创建和接入前获取不写入文件的变更计划。
---

# 规划 Harness 变更

- 新项目：`continue-harness plan create <name> --output <完整目标目录> --json`。
- 现有项目：`continue-harness plan init --json`。
- 解释 `create`、`managed_unchanged`、`project_owned_modified`、`template_update_available` 和 `true_conflict` 的中文含义。
- `--output` 是完整项目目录，不是父目录。
- 计划阶段不得安装依赖或写入文件。
- 有真实冲突时列出精确文件和决策点，不擅自覆盖。
