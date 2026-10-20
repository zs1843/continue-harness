---
name: continue-harness-inspect
description: 检查 continue-harness 项目事实与机器可读状态。适用于了解项目技术栈、验证模式、已登记输入、设计令牌来源、事实文档和智能体工作流就绪情况，或确定下一步可安全执行的操作。
---

# 检查项目状态

1. 在项目根目录运行 `continue-harness inspect --json`。
2. 将 JSON 稳定编码翻译为中文结论，不修改项目。
3. 分别报告项目与技术栈、事实文档、输入、唯一 Token 真值、验证模式和 Agent 工作流。
4. 对“未配置”只提出补齐建议；不要描述为失败或已完成。
5. 需要具体诊断时转用 `$continue-harness-doctor`。
