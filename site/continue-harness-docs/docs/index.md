---
layout: home

hero:
  name: Continue Harness
  text: 可恢复的项目协作与质量 Harness
  tagline: 把需求、实现、验收与证据关联到同一任务编号，让项目上下文可恢复。
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/ai-first
    - theme: alt
      text: 查看工作流
      link: /guide/overview

features:
  - title: 需求到验收
    details: 在实现前确认验收标准，将需求、实现项、验收项和证据关联到同一任务。
  - title: 输入登记与证据绑定
    details: 根据项目类型、技术栈和当前任务选择输入，记录来源和版本，检查变更对验收的影响。
  - title: 任务恢复
    details: resume 是只读汇总，输出当前任务、输入状态、最近快照、覆盖矩阵、决策、Git 改动和最多三个下一步动作。
---

Continue Harness 将需求、实现、验收和证据关联起来，并保存可恢复的项目上下文，支持持续协作与交接。

```text
需求 → 实现项 → 验收项 → 证据 → 交接状态
```

验收标准在实现前确认。项目类型、技术栈和当前任务决定所需输入与检查；UI、API、Design Token 均按需使用。参见[输入与证据](/guide/evidence)和[验证与验收](/guide/verification)。

当前范围集中在交付闭环、证据追溯和上下文恢复。专项适配器保留为可选能力，暂不扩展框架模板和专项约束。

## 什么是 Continue Harness

本页说明 `continue-harness` 的定位、Core 能力边界、验证范围和 CLI 入口。它是一个业务无关的项目协作与质量 Harness，当前版本 0.1.0，尚未发布到 npm，`@company` 是占位 scope。

## 接入方式

项目可以通过支持 Skill 的 Agent 接入，也可以直接使用 CLI。首次接入时，把项目交给 Agent，由 Agent 按项目事实完成 Intake、输入登记和状态检查。发送以下请求即可开始：

```text
请使用 Continue Harness 的项目接入 Skill 接入当前项目。
如果是新项目，使用 `continue-harness-create`；如果是已有项目，使用 `continue-harness-init`。
先不要修改业务代码，先完成 Intake：确认项目类型、目标范围、运行环境、协作对象和技术栈。
未知信息标记为 pending，不要猜测；再按项目类型生成最小输入清单，登记来源并检查当前项目状态。
最后输出已确认事实、待确认问题、风险和第一个可执行任务。
```

Agent 把 Intake、输入登记、任务、日志、上下文恢复、验证和交接串成同一条流程，每个环节绑定到同一任务编号。详细提示词见[项目接入](/guide/ai-first)，恢复信息的读取方式见[任务、恢复与快照](/guide/tasks-and-resume)。

<details>
<summary>可选能力与配置边界</summary>

| 层级 | 当前实现 | 作用 |
| --- | --- | --- |
| Core | 配置、诊断、输入分析、任务、恢复、验证、报告 | 机制层，业务事实由目标项目持有 |
| 项目接入协议 | 项目事实、约束、命令映射、日志、上下文和验收记录 | 由目标项目声明事实和验证方式 |
| 证据与扩展能力 | 输入登记、契约分析、设计事实、UI Contract、UI System | UI Contract 已实现；UI System 协议目前只在 `list-detail`、`form-result` 两个内置 fixture 上验证，`tdesign-uniapp` 适配器为 experimental，不是任何 preset 的依赖 |

适配器取值由 Core 的配置枚举与 `schemas/project.schema.json` 校验：`project.product_type` 覆盖 `generic`、`consumer_h5`、`developer_tooling`，`project.platforms` 覆盖 `node`、`web_mobile`，`stack.adapter` 覆盖 `node-esm`、`uni-app`。默认 preset 是 `generic`，只生成约束容器，不含 `src/` 和 `tests/`；`consumer-h5` 需要显式 `--preset consumer-h5`。

Core 与业务事实的划分依据和取舍见[设计原则](/background/principles)。


</details>

<details>
<summary>CLI 执行参考（可选）</summary>

**Skill**：`continue-harness-create`、`continue-harness-init`、`continue-harness-inspect`、`continue-harness-inputs`、`continue-harness-task`、`continue-harness-verify`（默认流程；`intake`、`resume` 由 `generic-harness` 覆盖，完整命令与 Skill 映射见[命令](/reference/commands)）

**CLI（可选）**：

```bash
continue-harness create my-project
cd my-project
continue-harness intake inspect --json
continue-harness inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "根据首批输入实现项目" --json
continue-harness resume --json
continue-harness verify feature
```

CLI 是 Agent 执行这套协议的底层入口。需要自动化、CI 或故障排查时，阅读[命令](/reference/commands)。

</details>

## 验证范围

当前测试套件包含 79 个自动化回归测试，覆盖 Core、CLI、Doctor、初始化和 UI System 协议。真实项目验证覆盖 HeTun-Site（React/Vite）和 Workbench-Admin（Vue 2/Vue CLI），两个项目各自只完成 T001 Pilot 任务，`verify audit` 通过，产品本身尚未完成，也没有量化效率收益数据。`upgrade` 命令、GitLab CI 模板、Codex Plugin、npm registry 发布和在线 Apifox 同步尚未实现。

## 下一步

- 新项目：阅读[创建或接入项目](/guide/getting-started)。
- 已有项目：阅读[输入与证据](/guide/evidence)，再运行 `continue-harness init --dry-run`。
- Agent 协作：阅读[任务、恢复与快照](/guide/tasks-and-resume)和[Agent 协作](/guide/agent-workflow)。
- 命令查询：进入[命令](/reference/commands)。
