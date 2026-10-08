# 工作流

本页说明从项目接入到任务交付的完整流程和各阶段产物。开始前请先完成[项目接入](/guide/ai-first)。

## 协作流程

追溯关系为：**需求 → 实现项 → 验收项 → 证据 → 交接状态**。验收标准在实现前确认；交接状态记录已验证内容、未完成项和下一步。

<ZoomableImage
  src="/diagrams/delivery-loop-zh.svg"
  alt="需求到验收流程，包含修正与输入变化分支"
  caption="验收标准在实现前确认。点击可放大查看。"
/>

每一步都对应一个可读取的项目事实或可验证的结果。Harness 不替 Agent 决定业务，而是让 Agent 在同一套约束和证据上继续工作。

## 第一次使用

接入提示词、Skill 安装方式、任务提示词和换 Agent 时的恢复提示词见[项目接入](/guide/ai-first)。

## 按需加载能力

默认流程只处理项目事实、输入、任务、日志、上下文和验收。只有任务确实需要时，Agent 才加载：

- API 任务：OpenAPI snapshot、operationId 选择和生成保护。
- 涉及视觉验收时：使用项目确认的设计依据；Design Token、UI Contract 和 UI System 仅在项目确有需要时启用。
- 架构任务：`ARCHITECTURE.md`、`DECISIONS.md` 和相关历史。

专项 Skill 在对应任务出现时才加载，普通任务不会读到 API、Design Token 或视觉基线相关规则。

本阶段集中完善需求到验收的关联、证据有效性和项目上下文恢复，暂不扩展专项适配器或技术栈模板。

<details>
<summary>CLI 参考（可选）</summary>

**Skill**：`generic-harness`（Intake）、`continue-harness-task`（任务）、`continue-harness-verify`（验证）

如果 Agent 不可用、需要 CI 或需要排查执行细节，再使用 CLI：

```bash
continue-harness intake inspect --json
continue-harness task create --title "任务名称" --json
continue-harness verify feature
```

完整命令清单见[命令](/reference/commands)。

</details>
