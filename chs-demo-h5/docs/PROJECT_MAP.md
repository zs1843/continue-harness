# 项目结构图

根目录 `AGENTS.md` 是唯一 Agent 约束本体；`CLAUDE.md` 和 `.cursor/rules/continue-harness.mdc` 仅为供应商适配文件。

本文记录项目结构、模块职责、页面路由和当前迁移边界。不要在本文复制 Design Token、API Schema 或命令定义。

## 目录职责

- `src/pages/`：uni-app 页面。每个可访问、可返回、可刷新、可分享或承载独立流程节点的视图都应拆成独立 page。
- `src/components/`：跨页面共享展示和交互组件。至少两个真实消费者复用时抽公共组件。
- `src/composables/`：可复用组合式逻辑，包含状态编排、副作用和页面逻辑复用。
- `src/utils/`：跨页面、跨组件复用的纯函数和轻量工具，例如格式化、校验、日期金额处理、URL 参数、安全区/平台能力适配和无副作用数据转换。
- `src/services/`：API 服务封装。页面不得散落直接请求。
- `src/repositories/`：数据仓储和接口数据适配，隔离页面与接口字段差异。
- `src/stores/`：项目确认需要的跨页面状态。不要为示例自动创建业务状态机。
- `.continue-harness/inputs/`：原始 PRD、RP、UI、API 和资产证据，只读。
- `.continue-harness/snapshots/`：OpenAPI、任务快照或视觉基线等外部快照。
- `.continue-harness/api/selection.yaml`：任务 PRD、API 输入与 operationId 的关联。
- `src/types/api.generated.ts`、`src/services/api.generated.ts`：由 Harness 管理的接口代码。
- `docs/`：当前产品、设计、状态、决策和实现覆盖事实。

## 页面拆分规则

- PRD/RP/UI 提供多个页面、流程节点、入口或返回路径时，先登记页面清单，再实现代码。
- 列表页、详情页、表单页、结果页、异常页和设置页默认拆成独立页面，不用一个 `.vue` 内部字符串状态模拟路由。
- 新增、移动或删除页面必须同步 `src/pages.json`，并在本文补充页面职责和依赖关系。

## 公共方法收敛规则

- 页面和组件不得长期保留重复的格式化、校验、日期金额处理、URL 参数解析、平台判断或数据转换方法。
- 同一工具逻辑出现第二次时，应提取到 `src/utils/`，并使用 `@/utils/...` 引用。
- 依赖 Vue 响应式状态或生命周期的逻辑放 `src/composables/`；依赖接口字段和数据源的逻辑放 `src/services/` 或 `src/repositories/`。

## 当前页面

| 页面 | 路由                | 职责                                 | 主要依赖                            |
| ---- | ------------------- | ------------------------------------ | ----------------------------------- |
| 首页 | `pages/index/index` | 脚手架默认入口，等待项目 PRD/UI 替换 | `docs/PRODUCT.md`、`docs/DESIGN.md` |
