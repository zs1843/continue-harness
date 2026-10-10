# Agent 协作

本页说明项目接入后 Agent 的读取顺序、入口文件分工、交接方式和人工确认边界。开始入口见[开始使用](./getting-started.md)。

## 约束的唯一来源

`AGENTS.md` 是唯一约束正文，项目约束、读取顺序和协作边界都写在其中。`CLAUDE.md` 与 `.cursor/rules/` 只为各自的加载方式做适配，指向 `AGENTS.md`，不保留第二份长期规则。Skills 是可调用的工作流说明，描述怎么做事，不覆盖项目约束，也不复制约束正文。

约束变化时更新 `AGENTS.md`；如果同时改变了项目事实或验证命令映射，再同步 `.continue-harness/project.yaml`。随后检查各 Agent 入口是否仍然指向权威约束。

## 执行顺序

1. 读取 `AGENTS.md`、`.continue-harness/project.yaml` 和项目事实文档。
2. 运行 `inspect` 和 `doctor`（Skill：`continue-harness-inspect`、`continue-harness-doctor`），确认项目是否准备好。
3. 读取当前任务已确认需要的输入，不一次加载全部输入。
4. 实现变更，并保持项目原有目录和依赖边界。
5. 按改动类型选择 `verify` 模式（Skill：`continue-harness-verify`）；失败时先检查原因，修正后重跑相关检查，无法安全判断时暂停并确认。
6. 更新状态、决策、历史和任务快照。
7. 结束对话时输出验证结果、剩余风险和可执行的编号动作。

## Agent 入口文件

各入口按对应 Agent 的加载方式引用同一份约束：

| 文件或目录 | 用途 |
| --- | --- |
| `AGENTS.md` | 项目约束、读取顺序和协作边界 |
| `.continue-harness/project.yaml` | 项目事实、命令映射和验证配置 |
| `.agents/skills/` | Codex、Cursor 等 Agent 的项目 Skill |
| `CLAUDE.md` | Claude Code 的薄适配入口，指向 `AGENTS.md` |
| `.claude/skills/` | Claude Code 的项目 Skill |
| `.cursor/rules/` | Cursor 的规则适配入口 |

## 跨 Agent 交接

开始任务前，读取 `AGENTS.md`、项目配置、项目地图、当前状态和任务关联输入。切换 Agent 或会话时，使用 `continue-harness-task` Skill 恢复当前任务（底层命令为 `resume`），查看最近快照、验证报告、日志、未决风险和下一步，再继续实现。

任务、输入、验证与快照共用同一任务编号，可据此定位实现文件和验证结果。

## 按任务类型加载输入

| 任务 | 首先读取 |
| --- | --- |
| 一般实现 | 当前任务、输入 manifest、适用的需求与约束 |
| 涉及视觉的任务 | 已确认的视觉依据和相关验收记录（如适用） |
| 涉及接口或数据契约的任务 | 对应契约及任务选择记录（如适用） |
| 架构调整 | 项目已有的架构说明、决策和相关历史（如存在） |

## 人工确认边界

Agent 负责读取事实、执行只读检查、计划预览、实现和已授权的验证。以下事项需要人确认：

- 项目目标、业务事实和输入冲突的裁决。
- 延期、外部阻塞和验收豁免。
- 组件或 Token 的保护边界。
- 生产依赖、公开接口、发布和远程仓库操作。
- 最终交付是否满足业务方、产品方或运维方要求。
