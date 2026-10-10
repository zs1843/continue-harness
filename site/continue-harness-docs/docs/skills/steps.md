# 执行步骤

本页按操作 Skill 列出执行步骤。项目约束仍以 `AGENTS.md` 为准；不要求安装聚合项目 Skill。

## 操作 Skill

### continue-harness-create

需要组织多轮对话时参见项目 Intake 问答。

1. 确认项目名、目标目录、目标、交付范围及会影响协作或验证的项目事实。需要确认运行环境或工具链时如实记录；未知项保持 pending，不据此启用专项能力。
2. 检查 CLI 可用性。当前包未发布，不执行占位 scope 的 npm 安装；使用用户提供的本地仓库或已验证安装来源，按宿主权限执行安装。
3. 运行 `continue-harness plan create <name> --output <dir> --json`，检查目标目录，再执行创建。默认只生成项目约束；专项 preset 仅在用户明确选择时使用。
4. 通过 Intake 确认项目事实；根据已确认事实和当前任务选择必要输入。内置类型问题只是候选清单，UI、API、Design Token 不自动成为必需项。
5. 在 manifest 中登记已确认的原始依据及类型、来源、版本或哈希和任务编号。对话中的需求经用户确认后保存为项目文件再登记；无需要求用户准备一套固定格式文档。
6. 创建任务，先在 `docs/ACCEPTANCE.md` 写明需求编号、实现项和验收标准，再实现。执行项目配置的检查，使用 `verify feature --task <id>` 或 `verify audit --task <id>`。
7. 保存状态、决策、执行日志和任务快照。延期、阻塞与验证通过分别报告。

根目录 AGENTS.md 是唯一项目约束入口。创建过程不覆盖既有项目内容，不引入任务无关的组件、Token 或框架约束。

### continue-harness-init

1. 读取项目约束、说明、代码结构和现有验证方式，确认项目目标、项目形态及本次任务；只记录会影响协作或验证的运行环境和工具链事实。
2. 运行 `continue-harness plan init --json`。确认逐文件计划后执行 `continue-harness init`；已有文件会保留，缺失文件会逐个创建。
3. 执行 Intake。根据已确认事实选择必要依据，记录来源、适用原因和版本；不适用项记录原因，不创建占位输入。
4. 运行 `inspect`、`doctor` 和 `inputs inspect`；将项目现有命令映射到验证配置。
5. 恢复当前任务、有效需求、决策、验收状态和下一步。新增任务先确认验收标准，再实施。
6. 维护需求 → 实现项 → 验收项 → 证据 → 交接状态，使用项目现有日志和历史记录保留过程。

UI、设计系统、API 生成等只在当前任务明确需要时启用。接入本身不要求提炼 Token、重写样式或替换工具链。供应商入口引用 AGENTS.md，Skill 按阶段使用。

### continue-harness-inspect

1. 在项目根目录运行 `continue-harness inspect --json`。
2. 将 JSON 稳定编码翻译为结论，不修改项目。
3. 分别报告项目事实、相关文档、适用输入、已配置验证方式和 Agent 工作流；只有项目实际启用相关视觉能力时才报告视觉依据。
4. 对未配置项只提出补齐建议，不描述为失败或已完成。
5. 需要具体诊断时转 `continue-harness-doctor`。

### continue-harness-plan

- 新项目：`continue-harness plan create <name> --output <完整目标目录> --json`。
- 已有项目：`continue-harness plan init --json`。
- 解释计划中的 `create`、`managed_unchanged` 和 `project_owned_modified`；后者表示保留现有文件，不阻止创建其他缺失文件。
- `--output` 是完整项目目录，不是父目录。
- 计划阶段不安装依赖、不写文件；列出待创建、未修改和已被项目修改的文件。

### continue-harness-doctor

1. 运行 `continue-harness doctor --json`；需要人读输出时运行 `continue-harness doctor`。
2. 按失败、待确认、未配置、通过、不适用分组；启发式建议不升级为确定性错误。
3. 优先修复确定性失败，修复前读取建议与项目事实。
4. 工具链、端口权限、registry 或 Corepack 问题与业务失败分开报告。
5. Doctor 只读；用户只要求诊断时不修改项目。
6. 修复后重跑一次，并报告仍未配置的能力。

### continue-harness-verify

读取项目配置与当前任务的验收标准，按任务范围选择检查。quick 用于快速反馈；feature 和 audit 用于任务验收。运行 `continue-harness verify feature --task <id>` 或 `continue-harness verify audit --task <id>` 明确报告所属任务。

docs/ACCEPTANCE.md 中每项验收须关联有效需求、实现项及可读取的本地证据。延期或阻塞记录原因、确认人和后续条件，不能声明通过。旧验收表缺少关联时补齐原有记录，不重复创建台账。

runtime、interaction、visual 等模式按实际项目配置使用，不为所有项目添加浏览器、UI 或截图要求。输入、实现或验收标准发生变化后重新验证；只有检查和验收均满足当前范围时才能报告完成。

### continue-harness-inputs

1. 读取 Intake 的项目目标、项目形态和当前任务，确定实现与验收需要哪些依据。
2. 项目类型提供候选问题；按对话结论选择输入并说明适用原因。非适用项标记 not_applicable 并记录原因。自定义输入使用小写类型名，例如 data_contract 或 deployment。
3. 在 inputs/manifest.yaml 登记 id、type、path、status、task_id、source 和版本或 sha256。保留原始依据。
4. 运行 `inputs inspect --json`、`inputs diff --json`；变化后的输入须重新确认，关联验收须重新验证。
5. `inputs analyze --json` 提供文本线索，不证明需求已完整理解；图片、PDF 等使用对应工具解读。
6. 在 docs/ACCEPTANCE.md 将需求输入编号关联到实现项、验收标准和证据。无法确认的目标或冲突向用户核实。

不预设 UI、原型、API 或设计 Token；只有实际涉及这些内容时才读取专项规则。

### continue-harness-task

1. 使用 `resume --task <id> --json` 恢复已有任务；新任务使用 `task create --title "<名称>" --json` 创建编号。
2. 登记有效需求，在 docs/ACCEPTANCE.md 关联需求编号、实现项、验收标准。实现前确认范围和非目标。
3. 实施后执行 `verify feature --task <id>` 或 `verify audit --task <id>`。报告必须对应任务及当前输入和实现版本。
4. 更新当前状态、决策及必要日志。延期或阻塞记录原因、确认人和后续条件，不能标记为通过。
5. 用 `task snapshot <id> --title "<名称>" --request "<要求>" --json` 创建交接快照。快照保存验收关系、上下文和验证报告副本；旧报告不匹配时先重新验证。
6. 交接说明目标、已完成项、未完成项、依据位置、风险和下一步。快照修订通过新建快照记录。

不增加平行台账，也不要求任务无关的 UI 或 Token 文件。

### continue-harness-design-tokens

1. 运行 `continue-harness design tokens inspect --json`；接入已有项目时先运行 `continue-harness design tokens discover --json`。
2. Token 优先级为：高保真 UI → RP → 用户临时视觉要求 → 项目既有 Token → DESIGN 原则 → Harness 默认值 → Agent 推断。
3. 有 UI/RP 但 Token 待提炼时，先确认输入版本和视觉权威，再修改 `docs/design/tokens.json`。
4. `TOKENS.md` 只解释，不复制第二套数值。
5. 用户显式覆盖 UI 时记录前后值、来源、Token 版本、影响页面与组件和原因。
6. 运行 `continue-harness design tokens diff --json`；该命令只读，仅在项目提供前后版本时给出差异，不会写文件。需要记录变更时，由 Agent 比较前后值并更新变更历史。
7. 未建立视觉基线时不宣称视觉还原已验证。
8. 存量提取只建立现状事实，不自动重写原样式；高频重复值标记为推断候选，多套变量或相同语义不同值标记冲突，用户确认后才写唯一真值。

### continue-harness-api

1. 读取 `AGENTS.md`、`.continue-harness/project.yaml`、输入清单、任务 PRD 和 `.continue-harness/api/selection.yaml`。
2. 缺少 Apifox OpenAPI JSON 时索取导出文件；本地导出足够时不索取 token，不持久化凭据。
3. 在 `.continue-harness/inputs/manifest.yaml` 登记为 active `api` 输入，原文件保留为只读证据。
4. 从 PRD 推导所需 operationId；多个候选都满足核心流程时让用户选择，不臆造 operationId。
5. 在 `.continue-harness/api/selection.yaml` 配置任务：

```yaml
tasks:
  T001:
    prd_inputs: [PRD-T001]
    api_input: API-001
    operations: [getUser]
```

6. 运行 `continue-harness api inspect --task T001 --json`。
7. 运行 `continue-harness api generate --task T001 --dry-run --json`；遇到 `conflict` 停止，把业务映射移到非生成文件。
8. 计划无冲突后运行 `continue-harness api generate --task T001`。
9. 错误归一、DTO 到视图模型映射、缓存和编排放在单独的非生成文件；不直接改 `api.generated.ts`。
10. 运行 `continue-harness verify quick`，接口接入功能后改用 `continue-harness verify feature`。
11. 在任务历史记录变更文件、输入编号、选定 operationId 和实际验证。

边界：PRD 决定产品范围，OpenAPI 决定 method、path、参数、请求体和响应结构。影响核心流程、认证、支付、权限或数据结构的差异属于确认边界。生成代码是传输基础设施，不承载业务语义。当前支持本地 OpenAPI 3.x 与 Swagger 2.0 JSON 导出；在线 Apifox 同步是后续适配器。

### continue-harness-skills

1. 确定要安装的 Skill；清单见[内置 Skills](./index.md)。
2. 项目安装：从仓库的 `skills/<名称>/` 复制到 `.agents/skills`（Codex、Cursor）或 `.claude/skills`（Claude Code）；CLI 可用时等价命令为 `continue-harness skills install --project --provider <codex|claude|cursor|all>`。
3. 全局安装前向用户确认，再复制到 `~/.codex/skills`、`~/.claude/skills` 或 `~/.cursor/skills`；CLI 可用时等价命令为 `continue-harness skills install --global --provider <codex|claude|cursor|all>`。
4. 单个 Skill 用 `--name <名称>`。
5. 已存在内容默认跳过；用户明确要求更新时用 `--force`，覆盖前检查用户维护内容。
6. 自定义全局目录用 `--target <完整目录>`。
7. 安装后读取目标 `SKILL.md`，报告实际安装、跳过和失败项。
8. Skills 是可调用工作流，不是约束正文；约束只维护在根目录 `AGENTS.md`。

### continue-harness-version

1. 运行 `command -v continue-harness` 和 `continue-harness version`；简短检查可用 `continue-harness -v` 或 `continue-harness --version`。
2. 与 `.continue-harness/project.yaml` 的 `harness.version` 对比并报告。
3. CLI 缺失时不使用同名未知包；需要全局安装时说明命令并请求授权。
4. registry 未发布或版本不满足时停止相关写操作，给出本地 tarball、正式 registry 包或升级项目配置的可选方案。
