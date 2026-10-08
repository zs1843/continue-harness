# 文档维护规则

本页列出需要同步更新文档的改动类型，以及文档站的构建检查命令。

## 必须更新

- CLI 命令、参数、输出或默认帮助变化。
- `create` 或 `init` 生成内容变化。
- `.continue-harness/project.yaml` schema 或配置语义变化。
- Profile、Platform、Stack 能力变化。
- Agent Skill 读取顺序或工作流变化。
- Doctor 检查、verify mode、报告格式变化。
- OpenAPI、UI System、Design Token 等专项能力变化。
- 当前状态、限制或 roadmap 变化。

## 无需更新

- 纯内部重构，没有行为变化。
- 测试实现方式调整，用户可见结果不变。
- 拼写、格式化和局部代码风格修复。

## 变更习惯

提交 Harness 行为改动时，把相关文档改动放在同一个 PR 或同一组提交里，使文档改动和代码改动一起进入验收。

## 构建检查

```bash
cd site/continue-harness-docs
pnpm docs:build
```

本地没有安装依赖时，先运行 `pnpm install`；发布前同时运行工作区测试 `pnpm test`。
