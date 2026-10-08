# Core

Core 位于 `packages/core/`，是 Harness 的业务无关运行时。本页列出它的能力、边界、配置接口和内部模块。

## 能力

| 能力 | 机制 |
| --- | --- |
| 配置加载 | 读取 `.continue-harness/project.yaml`，解析项目、平台、技术栈、facts 和命令映射，并校验声明取值 |
| 验证执行 | 把 `unit_test`、`coverage_closure` 等符号命令映射到真实 shell 命令，按 fail-fast 或 audit 模式执行 |
| 诊断 | Doctor 只读检查 Node、pnpm、脚本、页面注册、输入、Token 和 Agent 工作流 |
| 报告 | 输出 Markdown、JSON 和 command log |
| 输入分析 | 读取 manifest，发现未登记输入，抽取文本事实并报告冲突 |
| resume | 汇总当前任务、输入状态、最近快照、覆盖矩阵、持久决策和 Git 改动 |

## 边界

Core 不 import 适配器模块，但通过配置枚举校验适配器取值；新增适配器需要同步 Core 枚举与 `schemas/project.schema.json`。当前枚举覆盖 generic / consumer-h5、node / web-mobile、node-esm / uni-app。

Core 不包含业务页面、业务状态、API endpoint、品牌名、Design Token 值和具体 UI 组件库实现。Core 可以知道项目声明了一个 API snapshot，但不知道这是哪个业务接口；可以知道某个页面注册缺失，但不知道页面应该有哪些卡片。

## 配置接口

Core 通过项目配置工作：

```yaml
project:
  product_type: generic
verify:
  feature:
    commands:
      - unit_test
      - acceptance
```

项目声明自身事实和验证命令；需要产品、平台或框架专属检查时，由项目配置选择对应适配器。

## 模块

| 文件 | 职责 |
| --- | --- |
| `config.mjs` | 项目配置加载和校验 |
| `runner.mjs` | 命令执行、fail-fast、状态归一 |
| `doctor.mjs` | 只读诊断 |
| `init.mjs` | 初始化和创建计划、安全写入 |
| `intake.mjs` | 多轮项目事实确认和最小输入清单 |
| `inputs.mjs` | 输入清单、发现和分析 |
| `resume.mjs` | 恢复当前协作现场 |
| `acceptance.mjs` | 验收状态检查 |
| `openapi.mjs` | OpenAPI operation 检查、类型和 wrapper 生成 |
| `design.mjs` | Design Token inspect、discover、diff |
| `ui-system.mjs` | UI System Adapter 和协议文件检查 |
| `ui-contract.mjs` | UI 组件清单扫描和 Contract 文件检查 |
| `history.mjs` | 任务历史和快照 |
| `report.mjs` | 报告和日志输出 |
