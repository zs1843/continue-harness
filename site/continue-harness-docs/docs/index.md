---
layout: home

hero:
  name: continue-harness
  text: 可恢复的项目协作与质量 Harness
  tagline: 把项目事实、Agent 工作流、验证报告和任务留痕放进同一套可执行协议里。
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/overview
    - theme: alt
      text: 查看架构
      link: /architecture/overview

features:
  - title: 项目无关
    details: Core 不包含业务页面、品牌、接口路径、状态枚举或设计值，项目事实由目标项目自己持有。
  - title: 证据优先
    details: PRD、RP、UI、API 和 assets 先登记，再分析，再绑定到任务，避免实现阶段凭记忆和猜测推进。
  - title: 可恢复协作
    details: 任务编号、快照、报告、Git 状态和下一步动作可以被 resume 重新加载，换 Agent 也不丢上下文。
---

## 一句话说明

`continue-harness` 是一个业务无关的项目协作与质量 Harness。它不替项目决定业务、页面、接口或设计，而是提供一套稳定机制：项目事实如何登记，约束如何读取，任务如何编号，协作如何恢复，验证如何执行，完成如何留下证据。

## 通用 Core 能力与边界

| 层级 | 当前实现 | 作用 |
| --- | --- | --- |
| Core | 配置、诊断、输入分析、任务、恢复、验证、报告 | 不依赖产品类型、运行平台、编程语言或框架 |
| 项目接入协议 | 项目事实、约束、命令映射、日志、上下文和验收记录 | 由目标项目声明事实和验证方式 |
| 证据与扩展能力 | 输入登记、契约分析、设计事实、UI Contract、UI System | 按项目事实和任务证据显式启用，不绑定产品、平台或框架 |

仓库中的 `consumer-h5`、`web-mobile` 和 `uni-app` 仅是专项适配器的实现与回归测试样例，不是通用 Harness 的必选组成，也不定义 Core 的支持范围。适配器是否可用，应以目标项目的配置和对应验证证据为准。

## 默认工作流

```bash
continue-harness create my-project
cd my-project
continue-harness inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "根据首批输入实现项目" --json
continue-harness resume --json
continue-harness verify feature
```

新项目默认使用 `generic` preset，并安装 `generic-harness` 聚合 Skill。它只提供与技术栈无关的项目事实、输入、任务、日志、上下文和验收约束；OpenAPI、UI System、Design Token、视觉基线和命令级 Skills 按任务需要启用。`consumer-h5` 是可显式选择的专项 preset，不代表 Core 的技术栈边界。其他产品、平台和技术栈应通过项目配置声明事实与验证命令；若需要平台或框架专属检查，再增加对应适配器。

## 先读哪一页

- 新项目：阅读[创建或接入项目](/guide/getting-started)。
- 已有项目：阅读[输入与证据](/guide/evidence)，再运行 `init --dry-run`。
- Agent 协作：阅读[任务、恢复与留痕](/guide/tasks-and-resume)和[Agent 协作规则](/guide/agent-workflow)。
- 需要查命令：进入[命令参考](/reference/commands)。
