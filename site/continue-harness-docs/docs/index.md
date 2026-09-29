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

## 当前已实现边界

| 层级 | 当前实现 | 作用 |
| --- | --- | --- |
| Core | 配置、诊断、输入分析、任务、恢复、验证、报告 | 与产品类型和框架无关 |
| Product Profile | `consumer-h5` | 当前仓库已内置的产品形态规则 |
| Platform Adapter | `web-mobile` | 当前仓库已内置的移动 Web 验收规则 |
| Stack Adapter | `uni-app` | 当前仓库已内置的 uni-app、Vue 3、Vite 工具链规则 |
| 可选能力 | OpenAPI、Design Token、UI Contract、UI System | 按任务证据显式启用 |

## 默认工作流

```bash
continue-harness create my-h5
cd my-h5
continue-harness inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "根据首批输入实现项目" --json
continue-harness resume --json
continue-harness verify feature
```

新项目默认只安装 `consumer-h5-harness` 聚合 Skill。OpenAPI、UI System、Design Token、视觉基线和命令级 Skills 都在任务需要时再启用。现阶段非 Consumer H5 项目可以通过 `init` 接入通用 Core；其他产品、平台和技术栈组合可通过项目配置或后续 Adapter 扩展。

## 先读哪一页

- 新项目：阅读[创建或接入项目](/guide/getting-started)。
- 已有项目：阅读[输入与证据](/guide/evidence)，再运行 `init --dry-run`。
- Agent 协作：阅读[任务、恢复与留痕](/guide/tasks-and-resume)和[Agent 协作规则](/guide/agent-workflow)。
- 需要查命令：进入[命令参考](/reference/commands)。
