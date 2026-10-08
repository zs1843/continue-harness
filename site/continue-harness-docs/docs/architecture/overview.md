# 架构

本页给出 continue-harness 的组成模型、依赖方向、协作边界和仓库模块地图。

continue-harness 由 `Core + Profile + Platform + Stack + optional UI System + Project config` 组合而成，组合模型的规范定义在仓库根 `docs/ARCHITECTURE.md`。

## 依赖方向

```text
CLI -> Core
Core -> 配置
项目配置 -> Profile + Platform + Stack 选择
Profiles / Platforms / Stacks -> 声明式描述
Examples -> 公共 CLI 行为
Tests -> Core 和 CLI
```

Core 不 import 适配器模块，但通过配置枚举校验适配器取值；新增适配器需要同步 Core 枚举与 `schemas/project.schema.json`。当前枚举覆盖 generic / consumer-h5、node / web-mobile、node-esm / uni-app。

## 协作架构图

<ZoomableImage
  src="/ai-architecture.svg"
  alt="continue-harness 协作架构"
  caption="点击图片放大；放大后可滚轮缩放、拖拽平移、双击重置，按 Esc 关闭。"
/>

图中三条边界：

- 人确认权威事实，包括业务目标、视觉来源、接口选择、冲突和延期。
- Agent 遵循 `AGENTS.md` 和 Skill 工作流，按任务类型读取证据并执行实现与验证；约束权威见[项目协作与 Agent 接入](../guide/agent-workflow.md)。
- Core 执行通用协议；业务、接口和设计事实由项目持有。

## 模块地图

| 路径 | 职责 |
| --- | --- |
| `packages/core/` | 配置加载、验证执行、诊断、报告、输入分析、resume |
| `packages/cli/` | 命令行入口、JSON 输出和计划预览 |
| `profiles/` | 产品形态规则 |
| `platforms/` | 运行平台规则 |
| `stacks/` | 框架和工具链规则 |
| `ui-systems/` | 可选 UI System Adapter |
| `templates/` | 接入已有项目时创建的业务中立文件 |
| `presets/` | 创建新项目时使用的业务中立项目容器 |
| `skills/` | Agent 工作流 |
| `schemas/` | 公共配置协议 |
| `tests/` | Core、CLI 和编排测试 |

## 分层理由

业务形态、运行平台、框架工具链和 Agent 工作流各自变化。四类规则放在独立目录，Core 只处理通用协议，因此产品形态变化不改 Core，平台变化不改产品 Profile，工具链变化不改输入协议，工作流变化不复制项目约束。各层职责展开见[适配器](./adapters.md)，通用安全模型见仓库根 `docs/ARCHITECTURE.md`。
