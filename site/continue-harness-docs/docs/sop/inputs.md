# 输入登记与分析

输入是实现的证据来源。continue-harness 把输入分成五类：

| 类型 | 目录 | 说明 |
| --- | --- | --- |
| PRD | `.continue-harness/inputs/prd/` | 产品需求和业务规则 |
| RP | `.continue-harness/inputs/rp/` | 原型、页面流、交互说明 |
| UI | `.continue-harness/inputs/ui/` | 视觉参考、设计稿、截图说明 |
| API | `.continue-harness/inputs/api/` | OpenAPI / Apifox 导出 |
| assets | `.continue-harness/inputs/assets/` | 图片、图标、字体、素材 |

## Inspect

```bash
continue-harness inputs inspect --json
```

Inspect 负责发现输入目录和 manifest 之间的差异：

- 哪些文件已经登记。
- 哪些文件还未登记。
- 哪些登记项对应的文件缺失。
- manifest 是否存在和可解析。

## Analyze

```bash
continue-harness inputs analyze --json
```

Analyze 负责从文本输入中抽取简单事实，并按业务、交互、视觉维度分类。它也会报告同 key 冲突。

## 为什么原始输入默认只读

原始输入是证据。实现过程可以生成分析结论、覆盖矩阵和任务快照，但不应该静默改写证据本身。

这个策略能减少两类问题：

- 需求被实现过程“顺手修掉”，后续无法追溯。
- Agent 把自己的推断写回原始材料，导致证据和结论混在一起。

## 与 Design Token 的关系

UI 和 RP 输入是 Token 提炼的重要来源。发生视觉冲突时，Token 来源优先级为：高保真 UI、RP、用户临时视觉要求、项目既有 Token、DESIGN 原则、Harness 默认值、Agent 推断。

这意味着 Agent 不能因为模板里已有默认值，就忽略新进入的 UI 稿；也不能因为自己推断了一个更顺眼的值，就覆盖高保真 UI。
