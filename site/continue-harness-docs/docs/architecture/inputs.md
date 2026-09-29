# Inputs

Inputs 模块负责把原始证据纳入项目。

## 文件职责

| 文件或目录 | 职责 |
| --- | --- |
| `.continue-harness/inputs/manifest.yaml` | 登记输入清单 |
| `.continue-harness/inputs/prd/` | 产品需求 |
| `.continue-harness/inputs/rp/` | 原型和交互 |
| `.continue-harness/inputs/ui/` | 视觉参考 |
| `.continue-harness/inputs/api/` | API 输入 |
| `.continue-harness/inputs/assets/` | 素材 |

## Inspect 做什么

Inspect 比对 manifest 和实际文件：

- 找到未登记文件。
- 找到登记但缺失的文件。
- 报告 manifest 状态。
- 输出稳定 JSON。

## Analyze 做什么

Analyze 是轻量文本分析：

- 抽取 labelled conclusions。
- 区分 business、interaction、visual。
- 报告 same-key conflicts。
- 不修改原始输入。

## 为什么不是复杂知识库

当前阶段优先验证本地文件流和任务闭环。复杂 PDF、图片和在线同步可以后续接入，但不应该阻塞首个稳定 Harness 协议。
