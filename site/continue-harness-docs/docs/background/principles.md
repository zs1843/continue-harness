# 设计原则

本页说明 continue-harness 的边界划分、项目事实归属、初始化方式、能力启用策略和验证定位。这些原则决定哪些内容放进 Core，哪些内容留给目标项目。

## Core 不理解业务

Core 不包含产品页面、领域状态、接口路径、品牌和 Token 值；它只负责可复用机制：配置、命令解析、诊断、验证、报告和安全写入。适配器取值属于配置协议：`project.product_type`、`project.platforms` 和 `stack.adapter` 由 Core 的配置枚举与 `schemas/project.schema.json` 校验，其中不包含业务事实。

代价是需要更多显式配置，收益是 Harness 不被某个业务项目绑死。

## 项目事实归项目所有

`.continue-harness/project.yaml` 由目标项目拥有。项目选择 profile、platform、stack，并把符号化验证步骤映射到真实命令。

Harness 提供模板和默认值，真实业务事实保存在项目自己的文件和配置里。

## 初始化必须安全

接入已有项目时，Harness 先预检所有目标文件，出现真实冲突时停止写入。内容相同的文件保留，内容不同的文件报告为项目已维护或冲突。

`continue-harness init --dry-run` 输出写入计划而不改动文件。

## 能力默认轻量

新项目由 CLI 和项目类型选择聚合工作流 Skill，默认 preset 是 `generic`。Consumer H5 专项 Skill、命令级 Skills、OpenAPI、UI System、Design Token discovery 和视觉基线按任务需要启用。

这些能力按需展开，默认认知成本保持较低。

## 验证是完成证据

验证报告记录命令、结果和阻塞原因，业务失败、环境阻塞和未配置能力分开记录。未配置的检查返回未配置或阻塞状态，不计为通过。

通用任务验收检查需求、实现与证据的关联。延期和阻塞保留为风险，输入或实现版本变化后重新验证。

## 约束与审批

`AGENTS.md` 是唯一约束本体，`CLAUDE.md` 和 Cursor rule 是薄适配，Skills 是可调用工作流。

发布、依赖升级和公共协议变更需要显式确认。
