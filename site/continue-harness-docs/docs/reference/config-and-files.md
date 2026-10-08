# 配置与文件

本页说明 `.continue-harness/project.yaml` 的键位，以及 CLI 生成的报告和产物路径。目录树见[项目结构](../sop/project-structure.md)。

## 项目配置

每个目标项目在根目录拥有一个配置文件：

```text
.continue-harness/project.yaml
```

## 通用键

以下键在所有 preset 中可用：

| 键 | 含义 |
| --- | --- |
| `harness.package`、`harness.version` | 项目声明的 Harness 包和版本 |
| `project.name` | 项目名称 |
| `project.product_type` | `generic`、`consumer_h5` 或 `developer_tooling` |
| `commands` | 命名命令映射，值是实际 shell 命令 |
| `verify` | 验证模式到 `commands` 名称的映射；未配置的模式写 `status: not_configured` |
| `sources.api`（可选） | API 输入来源：`provider: openapi` 和 `snapshot` 路径 |
| `ui.system`（可选） | UI System 选择：`status`、`adapter`、`policy`、`version` |

Generic preset 另有 `harness.mode: generic` 和 `intake` 块。`intake` 记录 `phase`、`status` 和 `state`，其中 `state` 指向状态文件：

```text
.continue-harness/intake.yaml
```

Consumer H5 preset 在上述通用键之外追加：

| 键 | 含义 |
| --- | --- |
| `project.platforms` | 运行平台，例如 `web_mobile` |
| `stack.adapter`、`stack.framework`、`stack.language`、`stack.bundler`、`stack.package_manager` | 框架和工具链选择 |
| `facts.agent_entry` 等 | Agent 入口、模块地图、设计事实、Token、历史和覆盖矩阵的路径 |

Generic preset 的配置文件没有 `project.platforms`、`stack` 和 `facts` 三组键。API 配置键是 `sources.api`，UI 配置键是 `ui.system`。

## 关键事实文件

| 文件 | generic preset | Consumer H5 preset | 作用 |
| --- | --- | --- | --- |
| `AGENTS.md` | 生成 | 生成 | 项目唯一约束本体 |
| `docs/PROJECT.md` | 生成 | 不生成 | 项目目标、范围、非目标和交付物 |
| `docs/PROJECT_MAP.md` | 不生成 | 生成 | 模块地图 |
| `docs/PRODUCT.md` | 不生成 | 生成 | 产品事实 |
| `docs/DESIGN.md` | 不生成 | 生成 | 设计事实 |
| `docs/CURRENT_STATUS.md` | 生成 | 生成 | 当前状态和限制 |
| `docs/DECISIONS.md` | 生成 | 生成 | 长期决策 |
| `docs/IMPLEMENTATION_COVERAGE.md` | 不生成 | 生成 | 需求覆盖矩阵 |
| `docs/ACCEPTANCE.md` | 生成 | 不生成 | `verify feature` 和 `verify audit` 的验收门禁来源；绑定任务时，文件缺失、无表格、缺状态列或存在未收口项都会判为失败 |
| `.continue-harness/inputs/manifest.yaml` | 生成 | 生成 | 输入登记清单 |

`.continue-harness/intake.yaml` 由 generic preset 预置；Consumer H5 preset 不生成它，运行 `intake answer` 或 `intake evidence` 时才写入。

## 产物路径

| 路径 | 内容 |
| --- | --- |
| `tmp/continue-harness/report.json` | 最近一次验证的机器可读报告 |
| `tmp/continue-harness/report.md` | 最近一次验证的 Markdown 报告 |
| `tmp/continue-harness/logs/` | 每个验证命令的日志 |
| `.continue-harness/logs/commands.ndjson` | 命令和 Intake 操作的追加日志 |
| `src/types/api.generated.ts` | 生成的 API 类型 |
| `src/services/api.generated.ts` | 生成的 API wrapper |
| `.continue-harness/api/generated.json` | 生成产物的 managed metadata |

`tmp/continue-harness/` 被 Git 忽略，可作为本地调试和 CI artifact。生成接口文件受 managed metadata 保护，手工修改后再次生成会被拒绝覆盖。

## 边界

密钥、Cookie、Access Token 和 `.env` 内容属于项目自有，不进入模板、快照或报告。`verify` 只读取配置中列出的命令，不推断项目使用的包管理器或测试运行器。
