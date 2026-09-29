# Core

Core 位于 `packages/core/`，是 Harness 的业务无关运行时。

## Core 负责什么

| 能力 | 说明 | 为什么放在 Core |
| --- | --- | --- |
| 配置加载 | 读取 `.continue-harness/project.yaml`，解析项目、平台、技术栈、facts 和命令映射 | 所有工作流都依赖同一个配置入口 |
| 运行时校验 | 检查产品类型、平台、stack、命令和 verify mode 是否受支持 | 早失败，避免 Agent 在错误配置上继续实现 |
| 命令解析 | 把 `unit_test`、`coverage_closure` 等符号命令映射到真实 shell 命令 | 项目拥有命令，Core 只执行映射 |
| 验证执行 | 支持 fail-fast 和 audit 式继续执行 | 不同场景需要不同反馈成本 |
| Doctor | 检查 Node、pnpm、脚本、页面注册、输入、Token、Agent 工作流等 | 诊断应只读且可重复 |
| 初始化计划 | 为 `init` / `create` 生成 create、unchanged、conflict 等状态 | 写文件前必须能预览和保护已有项目 |
| 报告 | 写 Markdown、JSON 和 command log | 人、CI、Agent 都能读取同一份结果 |
| 输入分析 | 读取 manifest，发现未登记输入，抽取文本事实和冲突 | 输入证据是任务开始前的共同事实 |
| OpenAPI 生成保护 | 记录 generated hash，拒绝覆盖手改 generated 文件 | 自动生成层和业务层必须分开 |
| UI/Token 检查协议 | 检查唯一 Token 真值和 UI System Adapter 描述 | Core 只理解通用描述，不导入具体组件库 |

## Core 不负责什么

Core 不包含：

- 业务页面。
- 业务状态。
- API endpoint。
- 品牌名。
- Design Token 值。
- 具体 UI 组件库实现。

也就是说，Core 可以知道“项目声明了一个 API snapshot”，但不知道“这是酒店搜索接口”；可以知道“某个页面注册缺失”，但不知道“酒店列表页应该有哪些卡片”；可以知道“Token 未提炼”，但不知道“品牌主色应该是什么”。

## 为什么 Core 要克制

Core 一旦理解业务，扩展 profile 和 platform 时就会出现隐性耦合。保持 Core 只理解通用协议，才能让 Consumer H5 之外的产品形态在未来进入同一套 Harness。

## 与配置的关系

Core 通过项目配置工作：

```yaml
project:
  product_type: consumer_h5
platforms:
  - web_mobile
stack:
  adapter: uni_app
verify:
  feature:
    commands:
      - unit_test
      - coverage_closure
```

项目选择能力，Core 执行协议。

## Core 内部文件视角

| 文件 | 大致职责 |
| --- | --- |
| `config.mjs` | 项目配置加载和校验 |
| `runner.mjs` | 命令执行、fail-fast、状态归一 |
| `doctor.mjs` | 只读诊断 |
| `init.mjs` | 初始化和创建计划、安全写入 |
| `inputs.mjs` | 输入清单、发现和分析 |
| `openapi.mjs` | OpenAPI operation 检查、类型和 wrapper 生成 |
| `design.mjs` | Design Token inspect/discover/diff |
| `ui-system.mjs` | UI System Adapter 检查 |
| `history.mjs` | 任务历史和快照 |
| `report.mjs` | 报告和日志输出 |
