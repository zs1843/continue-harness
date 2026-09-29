# 验证模式

## quick

快速反馈，适合小范围变更。通常运行单元测试和版本检查。

## feature

完整功能验收。Consumer H5 中 feature 包含需求闭环，不能只用构建成功替代。

## runtime

浏览器或运行时检查。当前 minimal fixture 使用 Playwright 验证 H5 页面响应、核心内容、console error 和 page error。

## interaction

关键交互检查。默认可以未配置，但必须明确报告，不应假装通过。

## visual

视觉回归。缺少 baseline 时报告 `not_configured`，有 baseline 后执行截图对比。

## audit

审计模式会尽量收集完整结果，通常不 fail-fast。适合发布前、交接前或诊断复杂问题。

## 环境阻塞

本地端口监听失败等工具链限制会被分类为环境阻塞，而不是业务失败。这能避免把 sandbox 或机器限制误判成项目问题。
