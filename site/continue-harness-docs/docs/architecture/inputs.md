# 输入

Inputs 模块把原始证据登记到 `.continue-harness/inputs/`，由 `manifest.yaml` 描述。本页说明目录职责、inspect 与 analyze 的行为和解析范围。日常由 `continue-harness-inputs` Skill 执行 `inspect` 和 `analyze`，CLI 为可选入口。

## 目录职责

| 文件或目录 | 职责 |
| --- | --- |
| `.continue-harness/inputs/manifest.yaml` | 登记输入清单，记录类型、来源、状态和 hash |
| `.continue-harness/inputs/prd/` | 产品需求 |
| `.continue-harness/inputs/rp/` | 原型和交互 |
| `.continue-harness/inputs/ui/` | 视觉参考 |
| `.continue-harness/inputs/api/` | API 输入 |
| `.continue-harness/inputs/assets/` | 素材 |

## inspect

inspect 比对 manifest 和实际文件：

- 找到未登记文件。
- 找到登记但缺失的文件。
- 报告 manifest 状态。
- 输出稳定 JSON。

## analyze

analyze 对 prd、rp、ui 三类输入做轻量文本分析：

- 按 UTF-8 读取文件并抽取带标签的结论。
- 区分 business、interaction、visual。
- 报告同 key 冲突。
- 不修改原始输入。

## 边界

当前只解析 UTF-8 文本输入；PDF、图片、二进制与在线同步不在 0.1.0 范围。不可直接读取的输入会被标记为需要 Agent 人工解析。
