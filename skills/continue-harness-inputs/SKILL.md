---
name: continue-harness-inputs
description: Inspect and analyze continue-harness PRD, RP, UI, API, and asset evidence. Use when registering project inputs, checking hashes or versions, identifying unregistered files, resolving cross-input conflicts, or determining business, interaction, and visual authority for a task.
---

# 管理项目输入

1. 运行 `continue-harness inputs inspect --json` 检查清单、路径、哈希、版本和未登记文件。
2. 运行 `continue-harness inputs diff --json` 查找输入变化；原始输入变化后不得沿用旧结论。
3. 运行 `continue-harness inputs analyze --json` 获取文本证据和冲突线索；图片/PDF 等仍需对应工具分析。
4. 原始输入默认只读，不格式化、覆盖或删除。
5. 业务、交互、视觉分别采用项目 `AGENTS.md` 定义的优先级；禁止单一全局优先级。
6. 核心流程、金额、权限、认证、支付、数据结构或版本有效性冲突必须询问用户并记入历史。
7. HTML RP 不仅提取文案；检查 `href`、路由、按钮、表单、弹窗、条件分支和脚本跳转，递归形成可达页面/状态图。
8. 将每个可验收节点登记到覆盖矩阵。无法判断目标或验收行为时集中追问，不得把未解析节点当作无需求。
