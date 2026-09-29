# 架构总览

continue-harness 使用组合模型：

```text
Core
  + Product Profile
  + Platform Adapter
  + Stack Adapter
  + optional UI System Adapter
  + Project-owned configuration
```

## 依赖方向

```text
CLI -> Core
Core -> configuration only
Project configuration -> Profile + Platform + Stack selection
Profiles / Platforms / Stacks -> declarative descriptors
Examples -> public CLI behavior
Tests -> Core and CLI
```

Core 不导入 Profile、Platform、Stack、example 或目标项目。这是业务无关能力的关键。

## AI 协作架构图

<ZoomableImage
  src="/ai-architecture.svg"
  alt="continue-harness AI 协作架构"
  caption="点击图片放大；放大后可滚轮缩放、拖拽平移、双击重置，按 Esc 关闭。"
/>

这张图表达三条边界：

- 人负责确认权威事实，包括业务目标、视觉来源、接口选择、冲突和延期。
- Agent 负责遵循 `AGENTS.md` 和 Skill 工作流，按任务类型读取证据并执行实现与验证。
- Core 只执行通用协议，不直接理解业务；业务、接口和设计事实始终由项目持有。

## 当前模块地图

| 路径 | 职责 |
| --- | --- |
| `packages/core/` | 配置加载、验证执行、诊断、报告 |
| `packages/cli/` | 公共命令行入口 |
| `profiles/` | 产品形态规则 |
| `platforms/` | 运行平台规则 |
| `stacks/` | 框架和工具链规则 |
| `ui-systems/` | 可选 UI System Adapter |
| `templates/` | 接入已有项目时创建的业务中立文件 |
| `presets/` | 创建新项目时使用的业务中立项目模板 |
| `skills/` | Agent 工作流 Skills |
| `schemas/` | 公共配置协议 |
| `tests/` | Core、CLI 和编排测试 |

## 为什么这样分层

分层的目的不是追求复杂，而是防止变化互相污染：

- 业务形态变化不应该改 Core。
- 运行平台变化不应该改产品 Profile。
- 框架工具链变化不应该改业务输入协议。
- Agent 工作流变化不应该复制多份项目约束。

## 每层包含什么

| 层级 | 包含 | 不包含 |
| --- | --- | --- |
| Core | 配置、诊断、验证、报告、输入分析、安全写入、managed-file 保护 | 业务页面、品牌、接口路径、Token 值 |
| CLI | 用户命令、JSON 输出、计划预览、安装入口、帮助文本 | 业务决策、项目私有规则 |
| Profile | 产品形态检查、需求闭环、输入优先级 | 具体业务流程和页面文案 |
| Platform | 运行平台验收、移动视口、浏览器检查、视觉基线语义 | 具体框架实现 |
| Stack | 框架目录、脚本、页面注册、工具链约束 | 产品形态规则 |
| Templates | 既有项目接入所需的业务中立文件 | 项目已有内容的覆盖策略 |
| Presets | 新项目容器、基础源码、测试和文档骨架 | 真实业务页面 |
| Skills | Agent 可调用 SOP 和命令工作流 | 项目唯一约束正文 |
