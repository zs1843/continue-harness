---
name: continue-harness-verify
description: Select and execute continue-harness verification modes for Consumer H5 changes. Use when validating logic, types, lint, build, browser runtime, user interactions, visual regression, cross-module changes, or producing an audit report without overstating product completion.
---

# 执行分层验证

- 小型逻辑变更：`continue-harness verify quick`。
- 完成功能或生产构建：`continue-harness verify feature`。
- 页面启动和浏览器错误：`continue-harness verify runtime`。
- 关键流程：`continue-harness verify interaction`。
- UI、布局、Token：`continue-harness verify visual`。
- 配置、跨模块或交付前：`continue-harness verify audit`。

先读取 `.continue-harness/project.yaml` 的实际映射，不写死底层命令。失败后只修复当前范围并最多重试两轮。视觉基线缺失必须报告“未配置”。构建、冒烟、交互或截图单独通过均不能宣称产品验收完成。
