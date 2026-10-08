# 项目案例

> 资料口径：基于仓库的 `0.1.0` 实现和 2026-10-08 的本地验证。真实项目的完整 Pilot 记录见[真实项目 Pilot](./real-project-pilot.md)。

本页记录 `continue-harness` 仓库如何用自身协议维护自身，包括交付范围、架构取舍、验证结果和未决风险。仓库中的 `consumer-h5`、`web-mobile` 和 `uni-app` 仅用于专项适配器和回归测试，通用 Core 不依赖它们。

## 问题假设

软件项目在使用 AI 辅助开发时，常见问题不只是“代码能否生成”，还包括需求和工程证据散落、不同 Agent 读取不同规则、只验证局部流程而遗漏关键路径、生成代码覆盖手工修改，以及验收结论无法复现。这些是本项目的问题假设；已接入项目的前后对照数据尚未整理进仓库。

目标是让开发者、CI 和 Agent 使用同一套项目事实与验证入口，同时由目标项目持有业务、接口和设计决定。Harness 负责约束和执行机制，业务判断留在目标项目。

## 交付范围

| 能力 | 已实现的证据 | 边界 |
| --- | --- | --- |
| 创建与接入 | `create` 默认生成 generic 项目，显式 preset 生成专项项目；`init` 先做完整 preflight，冲突时不写入 | 尚无 upgrade 和三方合并 |
| 项目诊断 | `inspect` 输出项目事实；`doctor` 只读检查环境、脚本、页面注册、输入和 Agent 工作流 | CI 入口及敏感内容检查仍不完整 |
| 验证 | `quick`、`feature`、`runtime`、`interaction`、`visual`、`audit` 六种模式，输出 Markdown、JSON 和命令日志 | 视觉验收需要项目提供基线和真实流程 |
| 需求闭环 | 活跃 PRD 的页面、状态、动作与返回路径需要逐项记录验证、延期或外部阻塞 | 两个真实项目各完成 1 个 T001 Pilot，覆盖任务、输入、日志、恢复和验收协议；真实业务页面的深层流程覆盖未纳入本案例 |
| 输入登记与留痕 | 登记 PRD/RP/UI/API/assets；任务编号、命令日志、resume 状态、快照和验收记录 | 业务证据仍需各目标项目提供 |
| API 生成 | 从本地 OpenAPI JSON 按任务生成类型与请求封装，并保护手改文件 | 不支持在线 Apifox 同步和完整 OpenAPI 特性 |
| UI System | 内置 fixture 验证了 UI System 协议 | 真实项目的视觉收敛尚未验证 |
| Agent 协作 | `AGENTS.md` 作为唯一约束本体；Skills 按任务加载 | 跨 Agent 的实际提效尚无量化数据 |

实现入口见仓库的 `docs/PROJECT_MAP.md` 和 [Core 说明](../architecture/core.md)；当前状态以仓库的 `docs/CURRENT_STATUS.md` 为准。

## 架构判断

```text
开发者 / CI / Agent
        │
        ▼
      CLI ──────► Core：配置、诊断、执行、报告
                    │
                    ├─ 项目配置：选择能力、映射项目命令
                    ├─ Profile：产品形态检查
                    ├─ Platform：运行环境验收
                    ├─ Stack：框架工具链规则
                    └─ 可选 UI System：组件语义和 Token 映射
```

Core 只理解通用协议，不导入具体 Profile、Platform、Stack 或业务项目。消费型 H5 的需求闭环、移动 Web 的运行环境、uni-app 的页面注册因此可以分别演进；代价是协议和配置层更多，早期项目需要维护清晰的边界和文档。[架构](../architecture/overview.md) 说明了依赖方向。

### 设计取舍

1. **项目事实留在项目内。** `.continue-harness/project.yaml` 选择验证命令和适配器；PRD、UI、API 与 Token 由目标项目保存。Harness 因此可以复用，同时需要处理输入缺失、冲突和版本追溯。
2. **写入前可预览。** `create/init` 提供 plan 或 dry-run；已有项目的初始化先检查全部目标文件，发现冲突就停止写入。它保护已有项目，目前不生成合并补丁。
3. **“完成”有可检查的定义。** `feature/audit` 不把构建成功等同于需求完成；活跃 PRD 的覆盖行必须有验证结果或明确原因。它能阻止明显遗漏，覆盖质量仍取决于输入分析和人工确认。

## 工作流

默认路径为 `create/init → inputs → task → verify`，完整流程图见[工作流](/guide/overview)。UI System、Design Token 和 OpenAPI 能力按任务启用。

## 验证结果

- 2026-10-08 在仓库根目录执行 `node packages/cli/bin/continue-harness.mjs version`，输出 `0.1.0`；`pnpm test` 的结果见[真实项目 Pilot](./real-project-pilot.md)。
- 自动化测试覆盖配置、CLI、Doctor、初始化冲突保护、OpenAPI 生成保护、需求闭环，以及两种不同流程形态的 fixture。
- 仓库包含一个最小 uni-app H5 集成样例和 Playwright 运行检查；文档站可静态构建。
- 两个真实项目各完成 1 个 T001 Pilot，覆盖 Intake、输入登记、任务、日志、上下文恢复、验收和交接。

本轮结果限于 T001 工程门禁和输入协议，交付速度、视觉还原率和 Agent 成本尚无数据。能力边界见[真实项目 Pilot](./real-project-pilot.md)。

## 未决风险

| 风险或缺口 | 下一步验证方式 |
| --- | --- |
| 输入分析偏启发式，PDF、图片和复杂 RP 需额外解释 | 从真实 Pilot 整理误判与人工修正记录 |
| UI System 与视觉流程的实际效果尚未收录 | 补入首次与最终截图差异、迭代次数、人工调整数 |
| 本地 OpenAPI 导出尚未覆盖复杂规范 | 整理无法生成的 operation 和手工补充点 |
| 真实项目的业务权限、API、视觉和部署验收仍需按任务补证 | 在后续任务中登记对应输入，沿用同一套任务与验证流程 |

后续计划为真实项目补充 PRD/UI 依据、运行与验证记录，并根据新增证据反推通用检查。是否扩展 Merchant H5、Admin Web 等 Profile，由无关项目的需求和验证结果决定。详情见仓库的 `docs/ROADMAP.md`。
