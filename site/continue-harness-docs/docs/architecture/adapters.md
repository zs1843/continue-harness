# Profiles / Platforms / Stacks

Adapters 把不同变化维度拆开。

## Product Profile

Product Profile 描述产品形态。本文使用 `consumer-h5` 作为专项适配器示例。

它关注：

- 页面结构。
- 需求闭环。
- 输入证据优先级。
- H5 常见验收路径。

它不应该写入具体业务页面和品牌。

## Platform Adapter

Platform Adapter 描述运行平台。本文使用 `web-mobile` 作为专项适配器示例。

它关注：

- 移动 Web 视口。
- 浏览器 runtime 检查。
- H5 截图验收。
- 环境阻塞分类。

平台规则独立后，未来 mini-program、React Native 或 desktop web 可以有自己的验收模型。

## Stack Adapter

Stack Adapter 描述框架和工具链。本文使用 `uni-app` 作为专项适配器示例。

它关注：

- Vue 3。
- Vite。
- `src/pages.json` 页面注册。
- Playwright。
- 项目脚本。

## 为什么拆成三层

`consumer-h5` 是产品形态，`web-mobile` 是运行平台，`uni-app` 是实现技术栈。三者经常一起出现，但不等价。

这些示例用于说明适配器的职责边界，不是 Core 对技术栈的限制。通用 Core 通过项目配置读取项目事实、约束和验证命令；其他组合只有在完成相应配置或适配器并补充验证证据后，才能宣称获得对应能力。

拆开后可以支持这样的组合演进：

- Consumer H5 换成其他技术栈。
- Web Mobile 用于其他产品形态。
- uni-app 支持其他平台验收。
