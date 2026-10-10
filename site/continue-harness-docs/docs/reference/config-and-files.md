# 配置与文件

本页说明 Harness 项目配置、协作记录和验证产物。目录用途见[项目结构](../sop/project-structure.md)。

## 项目配置

每个接入项目在根目录维护 `.continue-harness/project.yaml`。配置记录项目已确认的基本事实、命令映射、验证模式，以及本项目确实需要的可选能力。输入类型按项目和任务选择；未适用的输入无需创建。

以下最小示例对应通用模式。空的 `commands` 和 `verify` 表示尚未登记项目检查；它们不构成验证通过，运行未配置模式会得到未配置结果。

```yaml
harness:
  mode: generic
  version: "0.1.0"
project:
  name: "项目名称"
commands: {}
verify: {}
```

通用接入必需字段为 `harness.version` 和 `project.name`。`commands` 与 `verify` 可暂缺或为空；未配置的验证模式不会被视为通过。项目检查确认后，再登记实际命令并关联验证模式。项目类型、运行环境、工具链和包管理方式是可选的项目事实，不受内置专项名称的枚举限制。字段用途如下；`harness.mode`、`harness.package`、`sources`、`ui` 和 `facts` 均按项目需要选配：

| 字段 | 用途 |
| --- | --- |
| `harness.mode`、`harness.package`、`harness.version` | 声明协作模式、Harness 包及版本；`version` 必需，其余按需配置 |
| `project.name` | 项目名称 |
| `project.product_type`、`project.platforms`、`stack.adapter`、`stack.package_manager` | 可选项目事实，使用非空字符串记录；Core 不通过固定名称清单限制项目接入 |
| `commands` | 项目验证命令的名称与实际命令映射；按项目检查配置 |
| `verify` | 验证模式及其命令映射；按需配置，未配置模式不代表通过 |
| `sources`、`ui`、`facts` | 仅在项目确认需要相应能力时配置 |

项目 Intake 状态记录在 `.continue-harness/intake.yaml`，输入清单记录在 `.continue-harness/inputs/manifest.yaml`。这些记录以项目当前确认的事实为准，不要求所有项目拥有相同字段或输入目录。

## 协作记录

| 路径 | 用途 |
| --- | --- |
| `AGENTS.md` | 项目约束的唯一权威来源 |
| `docs/PROJECT.md` | 项目目标、范围、非目标和交付物 |
| `docs/CURRENT_STATUS.md` | 当前状态、风险和待办 |
| `docs/DECISIONS.md` | 已确认且持续有效的决策 |
| `docs/ACCEPTANCE.md` | 验收项、状态及证据关联 |
| `.continue-harness/inputs/manifest.yaml` | 输入来源、适用性、版本及关联记录 |
| `.continue-harness/logs/commands.ndjson` | 命令和 Intake 操作的追加日志 |
| `docs/history/` | 任务快照与可恢复的交接上下文 |

具体文件由接入流程结合项目现状生成或复用；上表说明记录职责，不是每个初始化结果都必须完整具备的文件清单。默认生成项会随模板版本调整，完整范围以当前创建/接入计划为准。

## 验证产物

| 路径 | 内容 |
| --- | --- |
| `tmp/continue-harness/report.json` | 最近一次验证的机器可读报告 |
| `tmp/continue-harness/report.md` | 最近一次验证的可读报告 |
| `tmp/continue-harness/logs/` | 验证命令日志 |

验证仅执行项目配置中声明的命令。Harness 记录执行结果和关联证据，不替代项目自身对行为正确性的判断。

## 安全边界

密钥、Cookie、访问令牌和环境变量文件内容属于项目私有信息，不应写入模板、快照或报告。自动化操作应识别并保留项目已有修改；具体写入或拒绝覆盖的行为以相应命令说明为准。
