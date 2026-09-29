# 输入与证据

Harness 把实现依据分为输入、项目事实和任务证据。原始文件由项目拥有，Harness 只登记、分析和追踪它们的变化。

## 输入类型

| 类型 | 默认目录 | 用途 |
| --- | --- | --- |
| PRD | `.continue-harness/inputs/prd/` | 业务目标、规则和验收 |
| RP | `.continue-harness/inputs/rp/` | 页面流、状态、动作和返回路径 |
| UI | `.continue-harness/inputs/ui/` | 视觉参考、截图和设计说明 |
| API | `.continue-harness/inputs/api/` | OpenAPI 或 Apifox 导出 |
| assets | `.continue-harness/inputs/assets/` | 图片、图标、字体和其他素材 |

## 登记、分析、差异

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
```

- `inspect` 检查 manifest、文件存在性、哈希变化、未登记输入和 active 冲突。
- `analyze` 从文本 PRD/RP/UI 中提取业务、交互和视觉证据，并报告同名字段冲突。
- `diff` 汇总输入变化，帮助判断既有结论和任务是否需要重新确认。

输入分析是启发式的。PDF、图片和复杂二进制 RP 仍需要 Agent 或外部工具解读，不能把“分析完成”理解成需求已经被完整实现。

## 任务与输入的关系

任务可以在 metadata 中关联 PRD、RP 和 API 输入。API 任务还要在 `.continue-harness/api/selection.yaml` 选择 operationId。这样任务快照能回答：本次实现依据了什么、生成了什么、验证了什么。
