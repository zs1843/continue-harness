# 工作流

本页概述从项目事实确认到任务交接的流程。具体操作从[开始使用](/guide/getting-started)进入。

## 协作流程

追溯关系为：**需求 → 实现项 → 验收项 → 证据 → 交接状态**。验收标准在实现前确认；交接状态记录已验证内容、未完成项和下一步。

<ZoomableImage
  src="/diagrams/delivery-loop-zh.svg"
  alt="需求到验收流程，包含修正与输入变化分支"
  caption="验收标准在实现前确认。点击可放大查看。"
/>

每一步都对应一个可读取的项目事实或可验证的结果。Harness 不替 Agent 决定业务，而是让 Agent 在同一套约束和证据上继续工作。

## 第一次使用

面向使用者的入口和 Agent 提示词见[开始使用](/guide/getting-started)。

## 按需加载能力

默认流程只处理项目事实、输入、任务、日志、上下文和验收。只有任务确实需要时，Agent 才加载：

- API 任务：OpenAPI snapshot、operationId 选择和生成保护。
- 涉及视觉验收时：使用项目确认的设计依据；Design Token、UI Contract 和 UI System 仅在项目确有需要时启用。
- 架构任务：`ARCHITECTURE.md`、`DECISIONS.md` 和相关历史。

专项 Skill 在对应任务出现时才加载，普通任务不会读到 API、Design Token 或视觉基线相关规则。

当前重点是完善需求到验收的关联、证据有效性和项目上下文恢复。输入与检查由项目事实和任务范围决定。

<details>
<summary>CLI 参考（可选）</summary>

按阶段调用已有操作 Skill：新建项目使用 `continue-harness-create`，接入已有项目使用 `continue-harness-init`，登记输入使用 `continue-harness-inputs`，任务与交接使用 `continue-harness-task`，验证使用 `continue-harness-verify`。Intake 是新建、接入和输入确认流程的一部分，没有独立的 Intake Skill。

如果 Agent 不可用、需要 CI 或需要排查执行细节，再使用 CLI：

```bash
continue-harness intake inspect --json
continue-harness task create --title "任务名称" --json
continue-harness verify feature
```

完整命令清单见[命令](/reference/commands)。

示例命令仅展示入口，不保证项目已有完整任务、输入或验证配置；未配置的验证模式会返回 `not_configured`，不能解释为通过。

</details>
