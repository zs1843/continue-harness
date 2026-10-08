# 适配器

适配器把产品形态、运行平台、框架工具链和 UI 组件语义拆成独立扩展点。本页说明四类适配器的职责、配置归属和验证边界。

## Product Profile

Product Profile 描述产品形态引起的检查，当前公开实现是 `consumer-h5`：

- 页面结构。
- 需求闭环。
- 输入证据优先级。
- H5 常见验收路径。

它不写入具体业务页面和品牌。

## Platform Adapter

Platform Adapter 描述运行平台，当前公开实现是 `web-mobile`：

- 移动 Web 视口。
- 浏览器 runtime 检查。
- H5 截图验收。
- 环境阻塞分类。

平台规则独立后，mini-program、React Native 或 desktop web 可以有自己的验收模型。

## Stack Adapter

Stack Adapter 描述框架和工具链，当前公开实现是 `uni-app`：

- Vue 3。
- Vite。
- `src/pages.json` 页面注册。
- Playwright。
- 项目脚本。

## UI System Adapter

UI System Adapter 描述组件语义和 Design Token 映射，见 [UI System](./ui-system.md)。

## 分层理由

`consumer-h5` 是产品形态，`web-mobile` 是运行平台，`uni-app` 是实现技术栈。三者经常一起出现，但不等价，变化来源也不同，因此拆成三个独立扩展点。

## 配置归属

每个目标项目拥有 `.continue-harness/project.yaml`，用它选择适配器并把符号验证步骤映射到项目命令。本仓库自用的 `developer_tooling + node + node-esm` 组合描述仓库维护，不是目标项目 preset。通用配置规则见仓库根 `docs/ARCHITECTURE.md`。

## 边界

仓库包含 `consumer-h5 + web-mobile + uni-app` 组合的 fixture 项目；真实项目验证目前止于 T001 pilot，无量化收益数据。这些示例不构成 Core 的支持边界：其他组合需要相应的配置或适配器，以及各自的验证证据，才能宣称具备对应能力。
