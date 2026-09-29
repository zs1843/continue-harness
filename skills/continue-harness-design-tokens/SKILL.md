---
name: continue-harness-design-tokens
description: Inspect and maintain the single machine-readable Design Token source for a continue-harness Consumer H5 project. Use when extracting tokens from UI/RP, confirming visual authority, detecting multiple token sources, reviewing token readiness, or recording token changes and affected pages/components.
---

# 管理 Design Token

1. 运行 `continue-harness design tokens inspect --json`，确认唯一真值文件和提炼状态。
   接入已有项目时先运行 `continue-harness design tokens discover --json`，主动扫描存量 CSS/SCSS/Less/Vue 样式与 CSS Variables，再结合 UI 框架主题和公共组件归纳候选；没有新 UI/RP 不等于没有视觉依据。
2. Token 优先级严格为：高保真 UI → RP → 用户临时视觉要求 → 项目既有 Token → DESIGN 原则 → Harness 默认值 → Agent 推断。
3. 有 UI/RP 但 Token 待提炼时，先确认输入版本和视觉权威，再修改 `docs/design/tokens.json`。
4. `TOKENS.md` 只解释，不复制第二套数值。
5. 用户显式覆盖 UI 时记录前后值、来源、Token 版本、影响页面/组件和原因。
6. 运行 `continue-harness design tokens diff --json`；完成后把差异写入任务快照并更新变更历史。
7. 未建立视觉基线时不得宣称视觉还原已验证。
8. 存量提取只建立现状事实，不自动重写原样式。高频重复值标记为推断候选，多套变量或相同语义不同值标记冲突，用户确认后再写唯一 Token 真值。
