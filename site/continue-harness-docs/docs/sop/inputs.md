# 输入登记

本页列出常见输入的登记方式。先按项目类型、技术栈和任务范围选择所需依据，再登记到 manifest.yaml；可使用项目自定义类型与原有文件路径。下列五类是可选示例，动态选择方式见[输入与证据](../guide/evidence.md)。

## 输入类型

| 类型 | 目录 | 说明 |
| --- | --- | --- |
| PRD | `.continue-harness/inputs/prd/` | 产品需求和业务规则 |
| RP | `.continue-harness/inputs/rp/` | 原型、页面流、交互说明 |
| UI | `.continue-harness/inputs/ui/` | 视觉参考、设计稿、截图说明 |
| API | `.continue-harness/inputs/api/` | OpenAPI / Apifox 导出 |
| assets | `.continue-harness/inputs/assets/` | 图片、图标、字体、素材 |

`intake` 在第二轮按项目类型生成最小输入清单，并用 `intake evidence --id <输入项> --status confirmed|not_applicable|pending` 记录登记结果。

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

`analyze` 从文本输入中抽取简单事实，按业务、交互、视觉维度分类，并报告同 key 冲突。

## 变更

用 `inputs` Skill 查看已登记文件和结论的变化。

**Skill**：`continue-harness-inputs`

**CLI（可选）**：

```bash
continue-harness inputs diff --json
```

`diff` 报告已登记文件和分析结论的变化，用于判断旧结论是否仍可继续使用。

## Token 来源

UI 和 RP 是 Token 提炼的来源。视觉冲突时的取值优先级见[术语表](../reference/glossary.md)。

## 边界

原始输入只读：实现过程生成分析结论、覆盖矩阵和任务快照，但不改写 `.continue-harness/inputs/` 下的证据文件。二进制设计稿和原型文件可能需要工具辅助解读。
