# Templates / Presets

Templates 和 Presets 都是业务中立文件来源，但用于不同场景。

## Templates

`templates/` 用于接入已有项目。它提供：

- `AGENTS.md`
- `.continue-harness/project.yaml`
- 输入目录 README
- PRODUCT / DESIGN / CURRENT_STATUS / DECISIONS
- history 和 coverage 文件
- API selection
- Design Token 初始文件

`init` 使用 templates 时会先预检，不覆盖项目已维护文件。

## Presets

`presets/generic/` 是默认 preset，用于创建只包含通用约束、输入、任务、日志、上下文和验收容器的项目。

`presets/consumer-h5/` 是显式选择的专项 preset，用于创建一个可运行的 minimal uni-app H5 项目：

- `package.json`
- `src/App.vue`
- `src/pages.json`
- `src/pages/index/index.vue`
- `src/services/http.ts`
- Playwright 配置和测试
- Harness 项目文档和输入目录

## 为什么不放业务示例页

业务示例页会带来错误暗示。真实项目应该从 PRD/RP/UI/API 输入中生成业务页面，而不是从模板里继承一个虚假的默认业务。

所以 preset 只创建容器、目录和工程能力。输入为空时，项目保持“等待输入”。
