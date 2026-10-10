# 解决的问题

本页列出 continue-harness 针对的协作问题，以及每个问题对应的机制。问题的动机见[为什么需要 Harness](./why-harness.md)。

## 输入证据分散

PRD、RP、UI、API 和 assets 往往来自不同工具，可能散落在聊天记录、网盘、截图、导出文件和临时目录里。没有统一登记时，开发者和 Agent 难以确定当前任务依据哪份输入。

continue-harness 在 `.continue-harness/inputs/manifest.yaml` 中登记原始输入的路径、来源、类型和状态，不会强制移动或复制项目材料。原始输入默认只读，分析结果另行生成。

## 上下文加载范围

Agent 读取全部设计、API、历史和任务文件时，容易把无关约束混入当前任务；读取范围过小时，又会转向猜测。

continue-harness 的默认策略是先读取稳定工作流，再根据已确认的任务范围加载关联证据。设计、接口或其他专项材料只在任务需要且项目已确认适用时读取；长期决策和架构变更再读取相关决策记录。

## 完成判定

页面能打开、构建能通过，不构成需求已实现。多层流程中的弹窗、异常状态、返回路径和二级页面容易被遗漏。

Continue Harness 使用 `docs/ACCEPTANCE.md` 记录验收闭环。验收项必须有可解释的状态及关联证据；未收口项会阻止 feature 和 audit 验证通过。需求分解和覆盖质量仍需项目负责人或 Agent 审阅。

## 生成代码与手工改动

接口类型和请求 wrapper 在生成后被手动改写时，下一次生成可能覆盖业务修复。

continue-harness 的 OpenAPI 生成以任务为单位，并对生成文件设置 managed-file 冲突保护。生成层保持纯契约，业务映射放在单独的 service 或 repository。当前生成路径读取本地 JSON 导出。

## Agent 规则漂移

Codex、Claude Code 和 Cursor 各有入口文件，逐份复制完整规则会让同一项目出现多套规范。

continue-harness 让 `AGENTS.md` 成为唯一约束本体，`CLAUDE.md` 和 Cursor rule 作为薄适配，Skills 是可调用工作流，不覆盖项目约束。
