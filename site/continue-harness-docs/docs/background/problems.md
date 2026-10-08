# 解决的问题

本页列出 continue-harness 针对的协作问题，以及每个问题对应的机制。问题的动机见[为什么需要 Harness](./why-harness.md)。

## 输入证据分散

PRD、RP、UI、API 和 assets 往往来自不同工具，可能散落在聊天记录、网盘、截图、导出文件和临时目录里。没有统一登记时，开发者和 Agent 难以确定当前任务依据哪份输入。

continue-harness 把原始输入放进 `.continue-harness/inputs/`，并通过 manifest 记录来源、类型和状态。原始输入默认只读，分析结果另行生成。

## 上下文加载范围

Agent 读取全部设计、API、历史和任务文件时，容易把无关约束混入当前任务；读取范围过小时，又会转向猜测。

continue-harness 的默认策略是先读取稳定工作流，再按任务类型加载证据：业务任务读取 PRD/RP；UI 任务追加 DESIGN、Token、UI 输入和视觉调整记录；API 任务追加 OpenAPI 输入和 operationId 选择；长期冲突或架构决策追加 DECISIONS。

## 完成判定

页面能打开、构建能通过，不构成需求已实现。多层流程中的弹窗、异常状态、返回路径和二级页面容易被遗漏。

continue-harness 用 `docs/ACCEPTANCE.md` 验收表记录需求闭环：条目需要标记为已验证、明确延期或外部阻塞，其余状态算未收口，feature 和 audit 验证会因此失败。consumer-h5 preset 另有覆盖矩阵测试，检查 active PRD 任务的可达页面、状态、动作和返回路径。

## 生成代码与手工改动

接口类型和请求 wrapper 在生成后被手动改写时，下一次生成可能覆盖业务修复。

continue-harness 的 OpenAPI 生成以任务为单位，并对生成文件设置 managed-file 冲突保护。生成层保持纯契约，业务映射放在单独的 service 或 repository。当前生成路径读取本地 JSON 导出。

## Agent 规则漂移

Codex、Claude Code 和 Cursor 各有入口文件，逐份复制完整规则会让同一项目出现多套规范。

continue-harness 让 `AGENTS.md` 成为唯一约束本体，`CLAUDE.md` 和 Cursor rule 作为薄适配，Skills 是可调用工作流，不覆盖项目约束。
