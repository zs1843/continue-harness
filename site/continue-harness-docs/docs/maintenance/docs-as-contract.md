# 文档维护规则

这份文档应该和 Harness 一起演进，但不需要每次内部实现改动都更新。

## 必须更新文档的情况

- CLI 命令、参数、输出或默认帮助变化。
- `create` 或 `init` 生成内容变化。
- `.continue-harness/project.yaml` schema 或配置语义变化。
- Profile、Platform、Stack 能力变化。
- Agent Skill 读取顺序或工作流变化。
- Doctor 检查、verify mode、报告格式变化。
- OpenAPI、UI System、Design Token 等专项能力变化。
- 当前状态、限制或 roadmap 明显变化。

## 可以不更新文档的情况

- 纯内部重构，没有行为变化。
- 测试实现方式调整，但用户可见结果不变。
- 修复拼写、格式化或局部代码风格。

## 推荐变更习惯

提交 Harness 行为改动时，把相关文档改动放在同一个 PR 或同一组提交里。这样文档不是额外宣传材料，而是工程验收的一部分。

## 文档站构建检查

```bash
cd site/continue-harness-docs
pnpm docs:build
```

如果本地没有安装依赖，先运行：

```bash
pnpm install
```
