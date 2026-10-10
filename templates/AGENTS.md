# 项目 Agent 指南

> 本文件是项目唯一的 Agent 约束本体。Claude、Cursor、Codex 等供应商适配文件只能导入或指向本文件，不得复制维护另一套约束。

本文是 consumer H5 项目的统一 Agent 入口。所有用户可见结论、报告摘要、待办、风险和历史记录默认使用中文。

## 读取顺序

1. 读取 `.continue-harness/project.yaml`。
2. 读取 `docs/PROJECT_MAP.md` 和 `docs/CURRENT_STATUS.md`。
3. 有业务任务时再读取 `.continue-harness/inputs/manifest.yaml`、`docs/PRODUCT.md` 和对应输入依据。
4. 仅在项目明确启用相关能力时读取设计规范、接口契约等专项依据。
   首次采用 UI Contract 时还要读取 `docs/UI-CONTRACT-ADOPTION.md`、`docs/UI-COMPONENT-INVENTORY.md`
   和 `docs/UI-COMPONENT-BOUNDARIES.md`。
5. 有 API 任务时再读取 API 输入和任务 operationId 选择。
6. 只有发生长期约束冲突或架构决策时才读取 `docs/DECISIONS.md`。

接口任务按 PRD 选择 operationId，并以登记的 OpenAPI JSON 为字段契约。先运行
`continue-harness api inspect --task <任务号>` 和 `continue-harness api generate --task <任务号> --dry-run`。
不得手工修改 `api.generated.ts`；业务转换放在独立 service/repository 中。

## 输入优先级

- 业务规则：用户当前明确业务要求 → 最新有效 PRD → 最新有效 RP → 最新有效 UI → 项目事实文档 → Harness 默认模板 → Agent 推断。
- 页面结构与交互：用户当前明确交互要求 → 最新有效高保真 UI → 最新有效 RP → 最新有效 PRD → 项目已有实现 → Harness 默认模板 → Agent 推断。
- Design Token：高保真 UI → 低保真 RP → 用户当前临时视觉要求 → 项目已有 Token → `docs/DESIGN.md` 全局原则 → Harness 默认 Token → Agent 推断。

PRD、RP、UI 冲突不得静默处理；涉及核心流程、金额、权限、认证、支付或数据结构时必须询问用户。

## Design Token

- `docs/design/tokens.json` 初始可为 `pending_extraction`；实现 UI 前必须优先从 UI 提炼 Token，没有 UI 时从 RP 提炼并标记推断或待确认。
- RP 负责页面流程与交互，`.continue-harness/models/page-flow.yaml` 和 `layout-specs.yaml` 负责结构化中间表示；UI 图用于视觉校准，不单独承担业务权威。
- 已选择 UI System Adapter 时优先使用语义组件映射，项目语义 Token 仍是唯一视觉真值；微调按类型记录到 `.continue-harness/ui/adjustments.yaml`。
- 先用 RP 提炼过 Token，后续补充 UI 稿时，必须更新 `docs/design/tokens.json`，用 UI 来源覆盖 RP 推断并记录 diff。
- 每个确认或推断 Token 值应记录来源类型、输入编号、来源路径、置信度和说明；不得把空 Token 当作已完成设计规范。
- Token 状态统一使用 `stable`、`candidate`、`pending`、`legacy` 或 `page-specific`；`candidate`、`pending`
  和 `legacy` 不得直接用于新组件。
- 设计稿和截图只作为视觉证据，统一登记在 `docs/ui-contract-evidence/`，不得成为第二套 Token 真值。

## UI Component Contract

- `docs/UI-COMPONENT-INVENTORY.md` 是已有 UI 的保护基线，清单内组件默认属于 `protected`。
- 受保护组件不得自动迁移、统一或重构；新需求优先使用组合、包装组件或新增组件。
- 修改受保护组件前必须按 `docs/UI-COMPONENT-BOUNDARIES.md` 列出原因、影响、替代方案和回滚方式，并取得用户确认。

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
- 发现无效跳转、占位按钮、未接线交互或遗漏节点时必须继续实现；信息不足时集中询问并明确阻塞项。
- 节点只有 `已验证`、`明确延期`、`外部阻塞` 才算收口；存在未决状态时不得宣称完成或创建完成快照。
- 首屏可运行、一级页面完成、构建或截图通过，都不等于 PRD/RP 完整实现。

## 公共方法

- 页面、组件、composable、service 中出现第二次相同格式化、校验、日期金额处理、URL 参数解析、平台判断或无副作用数据转换时，必须收敛到 `src/utils/`。
- 依赖 Vue 响应式状态或生命周期的逻辑放 `src/composables/`；依赖接口字段、数据源或缓存策略的逻辑放 `src/services/` 或 `src/repositories/`。
- 不得在多个页面复制粘贴公共方法后宣称完成。

## 自动工作流

- 进入陌生项目时执行 `continue-harness inspect --json`。
- 接手已有任务时先执行 `continue-harness resume --json`，读取当前任务、快照、覆盖矩阵、决策、阻塞项和下一步动作。
- 刚创建的项目输入为空时，展示 `.continue-harness/inputs/prd|rp|ui|api|assets/` 路径并等待用户放入文件；不得创建虚假业务任务或直接实现示例页。
- 项目有效性不确定时执行 `continue-harness doctor`。
- 逻辑或工具改动后执行 `continue-harness verify quick`。
- 完成功能后执行 `continue-harness verify feature`。
- 页面启动与运行时错误执行 `continue-harness verify runtime`。
- 关键流程交互执行 `continue-harness verify interaction`。
- UI、样式、布局或交互改动执行 `continue-harness verify visual`；未配置视觉基线时必须报告“未配置”。
- 配置或跨模块改动执行 `continue-harness verify audit`。
- 完成任务后更新 `docs/IMPLEMENTATION_COVERAGE.md`、`docs/history/CHANGE_HISTORY.md`，并创建任务快照。

## 对话交接

- 每轮答复末尾列出当前确实可以开始的后续操作，使用 `1. ...`、`2. ...` 连续编号，通常列 2–3 项；不要为凑数列出无关操作。
- 用户只回复单个编号时，按最近一次答复中的对应操作立即执行，不再发起一轮选择问答。用户给出新要求或无效编号时按普通消息处理，不猜测其意图。
- 选项应写清执行动作和范围，不能把缺少必要输入、审批或外部条件的工作写成可直接执行。确实需要用户提供事实或批准时，一次性说明具体缺口，收到答复后继续。

## 禁止事项

- 不得修改、格式化或覆盖 `.continue-harness/inputs/` 下的原始证据文件。
- 提供 UI 时，不得擅自重新设计一套相似页面。
- 不得用 Emoji、字符图标、随机渐变或通用占位图替代已提供资产。
- 不得省略页面、弹窗、浮层或关键状态后宣称完整实现。
- 不得把多个独立页面压缩成单文件字符串状态机。
- 不得把构建通过、页面可打开、E2E 通过或截图通过等同于产品验收通过。
- 不得保存密钥、Cookie、Access Token、`.env` 内容或个人敏感数据到项目文件。
