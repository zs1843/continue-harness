# Consumer H5 Agent 指南

> 本文件是项目唯一的 Agent 约束本体。Claude、Cursor、Codex 等供应商适配文件只能导入或指向本文件，不得复制维护另一套约束。

本项目由 continue-harness consumer-h5 脚手架生成。所有用户可见约束、诊断、历史、报告和风险说明默认使用中文。

## 读取顺序

1. `.continue-harness/project.yaml`
2. `docs/PROJECT_MAP.md`
3. `docs/CURRENT_STATUS.md`
4. 有业务任务时再读取输入清单、`docs/PRODUCT.md` 和对应 PRD/RP
5. 有 UI 任务时再读取 `docs/DESIGN.md`、Design Token、UI 输入和视觉调整记录
6. 有 API 任务时再读取 API 输入和任务 operationId 选择
7. 只有发生长期约束冲突或架构决策时才读取 `docs/DECISIONS.md`

接口任务先根据 PRD 确认需要的 operationId，再以登记的 OpenAPI JSON 作为字段契约执行
`continue-harness api inspect/generate --task <任务号>`。不得根据 PRD 擅自改写接口字段，也不得
手工修改 `api.generated.ts`；业务映射放在非 generated 的 service/repository 中。

## 自动工作流

- 陌生项目先运行 `pnpm harness:inspect`。
- 刚创建的项目输入为空时，展示 `.continue-harness/inputs/prd|rp|ui|api|assets/` 路径并等待用户放入文件；不得创建虚假业务任务或直接实现示例页。
- 有效性不确定时运行 `pnpm harness:doctor`。
- 逻辑改动后运行 `pnpm harness:quick`。
- 完成功能后运行 `pnpm harness:feature`。
- 页面运行时检查运行 `pnpm harness:runtime`。
- 关键交互检查运行 `pnpm harness:interaction`。
- UI、样式、布局或交互改动运行 `pnpm harness:visual`；无截图基线时必须报告“未配置”。
- 配置或跨模块改动运行 `pnpm harness:audit`。
- 完成任务后更新覆盖矩阵、变更历史和任务快照。

## 对话交接

- 每轮答复末尾列出当前确实可以开始的后续操作，使用 `1. ...`、`2. ...` 连续编号，通常列 2–3 项；不要为凑数列出无关操作。
- 用户只回复单个编号时，按最近一次答复中的对应操作立即执行，不再发起一轮选择问答。用户给出新要求或无效编号时按普通消息处理，不猜测其意图。
- 选项应写清执行动作和范围，不能把缺少必要输入、审批或外部条件的工作写成可直接执行。确实需要用户提供事实或批准时，一次性说明具体缺口，收到答复后继续。

## 输入与冲突

- 原始 PRD、RP、UI、API 和资产输入默认只读，不得直接修改。
- 业务、交互和 Token 使用不同优先级，不得用单一全局优先级覆盖全部结论。
- 冲突必须记录为“冲突”，涉及核心流程、金额、权限、认证、支付或数据结构时询问用户。
- 提供高保真 UI 时，不得擅自重新设计或用默认示例覆盖。
- `docs/design/tokens.json` 初始可为 `pending_extraction`；实现 UI 前必须优先从 UI 提炼 Token，没有 UI 时从 RP 提炼并标记推断或待确认。
- RP 负责页面流程与交互，`.continue-harness/models/page-flow.yaml` 和 `layout-specs.yaml` 负责结构化中间表示；UI 图用于视觉校准，不单独承担业务权威。
- 已选择 UI System Adapter 时优先使用语义组件映射，项目语义 Token 仍是唯一视觉真值；微调按类型记录到 `.continue-harness/ui/adjustments.yaml`。
- 先用 RP 提炼过 Token，后续补充 UI 稿时，必须更新 `docs/design/tokens.json`，用 UI 来源覆盖 RP 推断并记录 diff。

## 页面与模块拆分

- 根据 PRD/RP/UI 先识别页面、弹窗、浮层、独立流程和跳转关系，形成页面拆分方案；不得把多个独立页面堆进一个 `.vue` 文件。
- 每个可被直接访问、刷新、分享或作为流程节点返回的视图，都应作为独立 uni-app page 放在 `src/pages/<module>/<page>.vue`，并同步 `src/pages.json`。
- 页面只负责编排布局、状态展示和用户操作；数据请求放到 `src/services/` 或 `src/repositories/`，复用逻辑放到 `src/composables/`，跨页面展示或交互放到 `src/components/`。
- 只有一个页面内部专用且不复用的小块可以留在页面内；两个及以上页面或弹窗复用时必须抽组件。
- 同一业务模块的列表、详情、表单、结果页、状态页、错误页应按页面职责拆分，不用字符串状态机模拟路由。
- 新增、移动或删除页面时必须更新 `docs/PROJECT_MAP.md` 和 `docs/IMPLEMENTATION_COVERAGE.md`，并运行页面注册结构测试。

## 需求闭包与完成定义

- HTML RP 必须检查链接、按钮、表单、弹窗触发、条件区块和脚本跳转，不得只实现首屏或一级页面。
- 从入口递归列出全部可达页面、二级/三级流程、弹窗、结果态、空态、错误态、加载态和返回路径；页面层级不是范围边界。
- 编码前将每个可验收节点写入覆盖矩阵独立行，记录来源、入口、操作、目标、验收点和状态。
- 发现无效跳转、占位按钮、未接线交互或遗漏节点时必须继续实现；信息不足时一次性汇总问题询问用户并明确阻塞项。
- 节点只有 `已验证`、`明确延期`、`外部阻塞` 才算收口。延期需要用户确认，阻塞需要说明缺失信息。
- 覆盖矩阵存在 `待分析`、`待实现`、`实现中`、`待验证` 或空状态时，不得宣称功能完成或创建完成快照。
- 首屏可运行、一级页面完成、构建或截图通过，都不等于 PRD/RP 完整实现。

## 公共方法

- 页面、组件、composable、service 中出现第二次相同格式化、校验、日期金额处理、URL 参数解析、平台判断或无副作用数据转换时，必须收敛到 `src/utils/`。
- 依赖 Vue 响应式状态或生命周期的逻辑放 `src/composables/`；依赖接口字段、数据源或缓存策略的逻辑放 `src/services/` 或 `src/repositories/`。
- 不得在多个页面复制粘贴公共方法后宣称完成。
