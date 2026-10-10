---
name: continue-harness-create
description: Create a project constraint workspace with Continue Harness and confirm project facts and task-specific inputs before implementation.
---

# 创建项目

需要组织多轮对话时参见[创建问答](references/create-intake.md)。

1. 确认项目名、目标目录、目标、项目类型、技术栈和交付范围。未知项保留 pending。
2. 检查 CLI 可用性。当前包未发布，不执行占位 scope 的 npm 安装；使用用户提供的本地仓库或已验证安装来源，按宿主权限执行安装。
3. 运行 `continue-harness plan create <name> --output <dir> --json`，检查目标目录，再执行创建。只使用通用约束容器，不选择技术栈模板；业务工程的建立是确认技术栈后的独立实现任务。
4. 通过 Intake 确认项目事实；根据项目类型、技术栈和当前任务选择必要输入。类型对应的问题只是候选清单，UI、API、Design Token 不自动成为必需项。
5. 在 manifest 中登记已确认的原始依据及类型、来源、版本或哈希和任务编号。对话中的需求经用户确认后保存为项目文件再登记；无需要求用户准备一套固定格式文档。
6. 创建任务，先在 `docs/ACCEPTANCE.md` 写明需求编号、实现项和验收标准，再实现。执行项目配置的检查，使用 `verify feature --task <id>` 或 `verify audit --task <id>`。
7. 保存状态、决策、执行日志和任务快照。延期、阻塞与验证通过分别报告。

根目录 AGENTS.md 是唯一项目约束入口。创建过程不覆盖既有项目内容，不引入任务无关的组件、Token 或框架约束。
