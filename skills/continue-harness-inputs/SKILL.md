---
name: continue-harness-inputs
description: Register and inspect task-specific project evidence, source versions and input changes in Continue Harness.
---

# 管理项目输入

1. 读取 Intake 的项目目标、类型、技术栈和当前任务，确定实现与验收需要哪些依据。
2. 项目类型提供候选问题；按对话结论选择输入并说明适用原因。非适用项标记 not_applicable 并记录原因。自定义输入使用小写类型名，例如 data_contract 或 deployment。
3. 在 inputs/manifest.yaml 登记 id、type、path、status、task_id、source 和版本或 sha256。保留原始依据。
4. 运行 `inputs inspect --json`、`inputs diff --json`；变化后的输入须重新确认，关联验收须重新验证。
5. `inputs analyze --json` 提供文本线索，不证明需求已完整理解；图片、PDF 等使用对应工具解读。
6. 在 docs/ACCEPTANCE.md 将需求输入编号关联到实现项、验收标准和证据。无法确认的目标或冲突向用户核实。

不预设 UI、原型、API 或设计 Token；只有实际涉及这些内容时才读取专项规则。
