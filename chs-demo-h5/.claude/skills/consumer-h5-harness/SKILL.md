---
name: consumer-h5-harness
description: Create, inspect, implement, and verify uni-app Consumer H5 projects governed by continue-harness. Use when an agent creates a new consumer-h5 project, connects an existing project, ingests PRD/RP/UI/API/assets inputs, implements UI or behavior, updates project knowledge, creates task snapshots, or must select and run the correct Harness verification mode.
---

# Consumer H5 Harness

For an API task, read the task PRD and registered API input, select only the required operationIds
in `.continue-harness/api/selection.yaml`, then run `continue-harness api inspect --task <ID>` and
`continue-harness api generate --task <ID> --dry-run` before generation. Keep generated transport types
and wrappers unchanged; put business mapping in a separate service or repository.

所有用户可见输出使用中文。JSON/YAML 可以保留稳定英文编码，但必须提供中文显示名称或中文说明。

根目录 `AGENTS.md` 是唯一项目约束本体。本 Skill 只定义可调用工作流，不得复制维护或覆盖另一套项目约束；`CLAUDE.md` 和 `.cursor/rules/continue-harness.mdc` 也只能导入或指向 `AGENTS.md`。

## 必读顺序

1. 读取 `AGENTS.md`。
2. 读取 `.continue-harness/project.yaml`。
3. 读取 `docs/PROJECT_MAP.md` 和 `docs/CURRENT_STATUS.md`。
4. 识别任务类型，只加载相关证据：业务任务读取输入清单和 PRD/RP；UI 任务再读取设计文档、Token、UI；API 任务再读取 API 输入和 operationId 选择。
   UI Contract 任务还要读取 `docs/UI-CONTRACT-ADOPTION.md`、`docs/UI-COMPONENT-INVENTORY.md`
   和 `docs/UI-COMPONENT-BOUNDARIES.md`。
5. 已有有效业务输入但没有编号时运行 `continue-harness task create --title "<任务名称>"`。输入为空时保持“等待输入”，不创建虚假业务任务、不实现示例页。

不要为了遵循 Harness 而无条件读取或维护与本次变更无关的设计、API、视觉、历史文件。

## 输入优先级

- 业务规则：用户当前明确业务要求 → 最新有效 PRD → 最新有效 RP → 最新有效 UI → 项目事实文档 → Harness 默认模板 → Agent 推断。
- 页面结构和交互：用户当前明确交互要求 → 最新有效高保真 UI → 最新有效 RP → 最新有效 PRD → 项目已有实现 → Harness 默认模板 → Agent 推断。
- Design Token：高保真 UI → 低保真 RP → 用户当前临时视觉要求 → 项目已有 Design Token → `docs/DESIGN.md` 全局原则 → Harness 默认 Token → Agent 推断。

不得使用单一全局优先级覆盖所有结论。

## 冲突处理

PRD、RP、UI、API、用户临时要求和已有实现冲突时，必须记录为“冲突”。涉及核心流程、金额、权限、认证、支付或数据结构时，先询问用户。可以安全兼容时允许实现兼容方案，但必须记录决定和原因。

## UI 与 Token

- 提供高保真 UI 时，不得重新设计相似页面。
- 不得用 Emoji、字符图标、随机渐变或通用占位图替代已提供资产。
- UI 中已有 HTML/CSS/交互结构时，先分析并迁移，不得直接重写。
- Token 数值写入唯一机器可读文件 `docs/design/tokens.json`；`docs/design/TOKENS.md` 只写中文解释。
- UI 微调必须生成或更新任务快照中的 `design-token-diff.json`。
- `docs/design/tokens.json` 初始可以是 `pending_extraction`，但实现 UI 前必须根据已登记输入提炼。
- 有 UI 输入时优先从 UI 提炼 Token；没有 UI 但有 RP 时，从 RP 提炼并标记为推断或待确认。
- 如果先用 RP 提炼过 Token，后续补充 UI 输入，必须重新更新 `docs/design/tokens.json`，用 UI 来源覆盖 RP 推断，并记录 Token diff。
- 每个确认或推断的 Token 值应记录来源类型、输入编号、来源路径、置信度和说明；不得把空 Token 当作已完成设计规范。
- Token 状态使用 `stable`、`candidate`、`pending`、`legacy` 和 `page-specific`；新组件只能直接使用 `stable`。
- 截图和设计稿只作为 `docs/ui-contract-evidence/` 下的视觉证据，不得成为第二套 Token 真值。
- 已有组件默认受保护。修改受保护组件前必须读取 `docs/UI-COMPONENT-BOUNDARIES.md` 并取得二次确认。

## 页面与模块生成规则

在根据 PRD/RP/UI 生成或接入页面前，必须先做页面拆分，不得默认生成单页大文件。

- 从输入中抽取页面清单、流程节点、入口、返回路径、弹窗、浮层、空/错/加载状态和跨页面共享区域。
- 独立页面标准：可直接访问、需要返回、可刷新、可分享、有独立页面标题、承载独立业务步骤，满足任一条件都应拆成 uni-app page。
- `src/pages/<module>/<page>.vue` 只做页面编排；接口封装放 `src/services/`，数据适配放 `src/repositories/`，状态和副作用放 `src/composables/`，共享 UI 放 `src/components/`。
- 列表页、详情页、编辑页、结果页、异常页和设置页默认拆分为独立页面；不要用一个页面里的字符串状态或 tab 状态模拟路由。
- 新增或移动页面必须同步 `src/pages.json`，并更新 `docs/PROJECT_MAP.md`、`docs/IMPLEMENTATION_COVERAGE.md`。
- 实现前先说明页面拆分方案；如果用户确认“单页试点”或 PRD/UI 明确只有一个页面，才允许单页实现，并记录原因。

## 需求闭包与完成门禁

- 对 HTML RP 必须实际检查可点击元素、链接、表单、弹窗触发器、条件区块和脚本中的跳转目标；不能只看首屏截图或入口 HTML。
- 实现前建立完整的“页面与流程清单”，为每个页面、弹窗和状态节点记录层级、入口、触发动作、目标、返回路径、PRD/RP 依据、验收点和实现状态。
- 从一级入口递归追踪所有可达二级、三级及更深节点，直到结果态、关闭态或明确的外部系统边界。页面层级不是裁剪范围。
- 覆盖矩阵必须一行对应一个可验收节点或关键状态，不能用“首页”“主要流程”等汇总行代替多个下游页面。
- 每个节点只能以 `已验证`、`明确延期`、`外部阻塞` 收口。延期必须有用户确认和原因；阻塞必须说明缺失信息，并立即集中询问用户。
- 发现未实现目标、无效跳转、占位交互、未接线按钮或未覆盖状态时，继续实现；无法安全推断时一次性汇总问题追问。禁止静默跳过。
- 不得因首屏可运行、一级页面完成、构建通过、时间消耗或已生成较多文件而自行缩小任务范围。
- 最终答复前逐行复核覆盖矩阵。存在 `待分析`、`待实现`、`实现中`、`待验证` 或无状态条目时，不得声称任务完成，也不得创建“完成”快照。

## 公共方法生成规则

- 公共纯函数和轻量工具统一放 `src/utils/`，包括格式化、校验、日期金额处理、URL 参数、安全区/平台能力适配和无副作用数据转换。
- 同一工具逻辑在页面、组件、composable 或 service 中出现第二次时，必须提取到 `src/utils/`。
- 依赖 Vue 响应式状态、生命周期或副作用编排的逻辑放 `src/composables/`；依赖接口字段、数据源或缓存策略的逻辑放 `src/services/` 或 `src/repositories/`。
- 不得通过复制粘贴公共方法来赶进度；实现前的分层方案需要说明哪些逻辑进入 `utils`。

## 自动工作流

1. 接手已有任务时先运行 `continue-harness resume --json`；没有可恢复任务时再运行 `continue-harness inspect --json`。
2. 项目有效性不确定时运行 `continue-harness doctor`。
3. 读取输入清单：`continue-harness inputs inspect --json`。
   若这是刚创建的项目且输入为空，向用户展示五类输入目录并暂停业务实现；收到文件后重新检查，不把对话截图当作唯一、未登记的长期证据。
4. 按业务、交互和 Token 三套优先级分析。
5. 从 PRD/RP 建立页面与流程清单，递归追踪全部可达节点，并输出页面拆分、路由注册、组件/组合式逻辑/服务/utils 分层方案。
   同步维护 `.continue-harness/models/page-flow.yaml` 和 `.continue-harness/models/layout-specs.yaml`；RP 是流程与交互证据，UI Reference 是视觉校准证据。
6. 检查 `docs/design/tokens.json`；如存在 UI/RP 输入且 Token 仍为空或 `pending_extraction`，先提炼或更新 Token。
   已选择 UI System Adapter 时，优先使用其语义组件映射，并将项目语义 Token 映射到组件库变量；不得让组件库变量取代项目语义 Token 真值。
   Adapter 不等于 UI runtime。源码实际采用组件后，将 runtime 作为锁定的生产依赖保留；仅试用且源码未引用时才移除。更换 UI 框架必须先迁移组件与 Token，完成 feature/runtime/interaction/visual 验证，再卸载旧包；不得长期并存多个完整 UI 框架。
7. 在编码前更新中文覆盖矩阵 `docs/IMPLEMENTATION_COVERAGE.md`；未决节点不得遗漏。
8. 执行 `continue-harness plan init --json` 或 `continue-harness plan create <name> --json`。
9. 实现项目代码，不覆盖项目自有内容。
10. 按变更类型运行验证：

- 逻辑：`pnpm harness:quick`
- 完成功能：`pnpm harness:feature`
- 运行时：`pnpm harness:runtime`
- 交互：`pnpm harness:interaction`
- UI/样式/布局：`pnpm harness:visual`
- 配置或跨模块：`pnpm harness:audit`

11. 修复范围内失败并最多重试两轮。
12. 更新 `docs/CURRENT_STATUS.md`、`docs/DECISIONS.md`、`docs/history/PRD_HISTORY.md`、`docs/history/CHANGE_HISTORY.md` 和 `docs/CHANGELOG.md`。
13. 对照 PRD/RP 重新遍历入口和全部跳转；有阻塞则集中追问，有遗漏则继续实现。
    将视觉微调按 token/component/layout/responsive/page_exception 写入 `.continue-harness/ui/adjustments.yaml`。
14. 闭包后创建不可变任务快照：`continue-harness task snapshot <任务编号> --json`。
15. 最终报告实际实现、实际验证、明确延期和剩余风险，并按项目 `AGENTS.md` 在末尾给出可执行的编号后续操作。用户下一轮只回复编号时，直接执行最近一次列表中的对应操作；不重复选择问答。

视觉验证未配置基线时必须报告“未配置”，不得显示“通过”。构建通过、页面可打开、E2E 通过或截图通过都不能替代产品验收。
