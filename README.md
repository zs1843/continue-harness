# Continue Harness

[中文](README.md) ｜ [English](README.en.md)

Continue Harness 是一个可恢复的项目协作与质量 Harness。它维护从需求到交接的可追溯关系：

**需求 → 实现项 → 验收项 → 证据 → 交接状态**

工作流先通过对话确认项目基本信息，再根据任务登记必要依据、定义验收标准、执行项目自己的验证，并保存可恢复的交接状态。创建和接入只建立约束与协作记录，不生成业务工程模板。

## 开始使用

推荐通过 Agent 对话开始；当前阶段需要时，再调用对应的操作 Skill：

> 使用 Continue Harness 接入当前项目。先恢复已有上下文；没有项目记录时，通过对话确认项目目标、范围、交付物和运行条件，再创建或接入约束空间。按本次任务选择输入依据，定义验收标准，映射项目已有验证命令。完成后保存验证证据和可恢复的交接状态。保留项目自己的文件与约定。

新项目和已有项目使用同一套通用协作闭环。按当前阶段调用已有操作 Skill；不需要安装聚合项目 Skill。CLI 可用于自动化和故障排查。

当前 `0.1.0` 尚未发布到 npm。CLI 安装来源和运行要求以仓库的包配置为准。

### CLI 快速入口

```bash
continue-harness plan create my-project --json
continue-harness create my-project
cd my-project
continue-harness intake inspect --json
continue-harness inspect --json
continue-harness doctor
```

接入已有项目时，先运行 `continue-harness plan init --json` 检查写入计划，再运行 `continue-harness init`。

登记输入、执行任务、验证和交接的命令见[CLI 参考](site/continue-harness-docs/docs/reference/commands.md)。能力与当前 Pilot 证据见[项目案例](site/continue-harness-docs/docs/showcase/case-study.md)和[真实项目 Pilot](site/continue-harness-docs/docs/showcase/real-project-pilot.md)。

在线文档：[https://ai.zs1843.cn](https://ai.zs1843.cn)

## 项目记录

- `.continue-harness/project.yaml`：项目事实与命令映射。
- `.continue-harness/intake.yaml`：基本信息和输入适用性。
- `.continue-harness/inputs/manifest.yaml`：依据来源、版本和任务关联。
- `docs/ACCEPTANCE.md`：需求、实现、验收与证据的关联。
- `tmp/continue-harness/`：最近一次验证报告和命令日志。
- `docs/history/tasks/`：任务快照和交接状态。

项目掌握业务决定和验收标准。Harness 检查登记关系、文件状态和验证结果；它不能替代业务审查，也不会自动证明需求正文已完整拆分。

Site 本地构建说明见 [Site package](site/continue-harness-docs/package.json)。
