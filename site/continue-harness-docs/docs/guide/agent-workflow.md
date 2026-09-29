# Agent 协作规则

## 唯一约束来源

`AGENTS.md` 是项目约束本体。`CLAUDE.md` 和 Cursor rule 只是供应商适配，不应复制另一份完整规则。Skills 是可调用的工作流，不拥有覆盖项目约束的权限。

## 推荐执行顺序

1. 读取 `AGENTS.md`、`.continue-harness/project.yaml` 和项目事实文档。
2. 运行 `inspect` 和 `doctor`，确认项目是否准备好。
3. 读取当前任务关联的 PRD/RP/UI/API 证据，不一次加载全部输入。
4. 实现变更，并保持项目原有目录和依赖边界。
5. 按改动类型选择 `verify` 模式，失败最多针对同一原因重试两次。
6. 更新状态、决策、历史和任务快照。
7. 结束对话时输出验证结果、剩余风险和可执行的编号动作。

## 按任务类型读取证据

| 任务 | 首先读取 |
| --- | --- |
| 业务实现 | PRODUCT、PRD、RP、输入 manifest |
| UI 调整 | DESIGN、Token、UI Contract、UI 输入和视觉报告 |
| API 接入 | API 输入、selection.yaml、OpenAPI snapshot |
| 架构调整 | ARCHITECTURE、DECISIONS、相关历史 |

## 人的确认边界

人需要确认业务权威事实、输入冲突、延期和外部阻塞、组件或 Token 的保护边界，以及会修改生产依赖、公开 CLI 或发布行为的变更。Agent 可以自动执行只读检查、计划预览、实现和已授权的验证。
