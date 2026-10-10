# 输入登记

本页列出常见输入的登记方式。先根据对话确认的项目事实与任务范围选择依据，再登记到 manifest.yaml；可使用项目自定义类型与原有文件路径。下列类别仅为可选示例，任务级选择方式见[输入与证据](../guide/evidence.md)。

## 输入类型

| 类型 | 目录 | 说明 |
| --- | --- | --- |
| PRD | `.continue-harness/inputs/prd/` | 产品需求和业务规则 |
| RP | `.continue-harness/inputs/rp/` | 原型、页面流、交互说明 |
| UI | `.continue-harness/inputs/ui/` | 视觉参考、设计稿、截图说明 |
| API | `.continue-harness/inputs/api/` | OpenAPI / Apifox 导出 |
| assets | `.continue-harness/inputs/assets/` | 图片、图标、字体、素材 |

Intake 会根据项目类型给出候选问题，并用 `intake evidence --id <输入项> --status confirmed|not_applicable|pending` 记录确认结果。当前内置若干常见类型的问题集；其他类型回退到通用候选问题。除需求依据外，其余候选项均可按项目情况确认不适用，不构成所有项目的固定输入清单。

## 检查

用 `inputs` Skill 比对输入目录和登记清单。

**Skill**：`continue-harness-inputs`

**CLI（可选）**：

```bash
continue-harness inputs inspect --json
```

`inspect` 比对输入目录和 `manifest.yaml`，报告：

- 哪些文件已经登记。
- 哪些文件还未登记。
- 哪些登记项对应的文件缺失。
- manifest 是否存在和可解析。

## 分析

用 `inputs` Skill 抽取并分类输入中的事实。

**Skill**：`continue-harness-inputs`

**CLI（可选）**：

```bash
continue-harness inputs analyze --json
```

`analyze` 对可读取的文本输入抽取线索并报告同 key 冲突。已知类别使用有限的识别规则；自定义类型保持中性，不会一概归入业务、交互或视觉维度。结果是供协作者审阅的线索，不是需求理解或验收结论。

## 变更

用 `inputs` Skill 查看已登记文件和结论的变化。

**Skill**：`continue-harness-inputs`

**CLI（可选）**：

```bash
continue-harness inputs diff --json
```

`diff` 报告已登记文件和分析结论的变化，用于判断旧结论是否仍可继续使用。

## 可选的视觉取值整理

当任务需要将已确认的视觉依据整理为可复用取值时，可以结合相关输入形成候选记录。该能力不是所有项目的必需输入；冲突处理规则见[术语表](../reference/glossary.md)。

## 边界

原始输入只读：实现过程生成分析结论、覆盖矩阵和任务快照，但不改写 `.continue-harness/inputs/` 下的证据文件。二进制设计稿和原型文件可能需要工具辅助解读。
