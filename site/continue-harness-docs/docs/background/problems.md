# 要解决的问题

## 1. 需求证据散落

PRD、RP、UI、API 和 assets 往往来自不同工具。它们可能在聊天记录、网盘、截图、导出文件和临时目录里。没有统一登记时，开发者和 Agent 很难回答“当前任务到底依据哪份输入”。

continue-harness 把原始输入放进 `.continue-harness/inputs/`，并通过 manifest 记录来源、类型和状态。原始输入默认只读，分析结果另行生成。

## 2. Agent 上下文过载

Agent 如果每次都读取全部设计、API、历史和任务文件，很容易把无关约束混入当前任务。如果读得太少，又会开始猜测。

continue-harness 的默认策略是先读取稳定工作流，再按任务类型加载证据：

- 业务任务读取 PRD/RP。
- UI 任务再读取 DESIGN、Token、UI 输入和视觉调整记录。
- API 任务再读取 OpenAPI 输入和 operationId 选择。
- 长期冲突或架构决策时才读取 DECISIONS。

## 3. 完成标准不可证明

页面能打开、构建能过，不代表需求已经完整实现。尤其是多层流程里，容易漏掉弹窗、异常状态、返回路径和二级页面。

continue-harness 在 Consumer H5 feature/audit 中引入 requirement closure：可达页面、状态、动作和返回路径必须被验证、明确延期或记录为外部阻塞。

## 4. 自动生成和手工代码混在一起

接口类型和请求 wrapper 如果生成后被手动改写，下次生成就可能覆盖业务修复。

continue-harness 的 OpenAPI 生成是任务级的，并带 managed-file 冲突保护。生成层保持纯契约，业务映射应该放在单独 service 或 repository。

## 5. 多 Agent 规则漂移

Codex、Claude Code、Cursor 都可能有自己的入口文件。如果每个入口都复制一份完整规则，迟早会出现“同一个项目有多套规范”。

continue-harness 让 `AGENTS.md` 成为唯一约束本体。`CLAUDE.md` 和 Cursor rule 只是薄适配，Skills 是可调用工作流，不覆盖项目约束。
