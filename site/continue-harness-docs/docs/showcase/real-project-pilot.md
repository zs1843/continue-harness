# 真实项目 Pilot

> 本页结果对应此前 Pilot 执行记录，尚未按本次新增的验收关联及任务/版本绑定门禁重新验证。旧项目需补齐现有验收表并重新执行验证，不能据此宣称通过当前门禁。

> 验证时间：2026-10-08；Harness CLI：`0.1.0`。

本页记录两个真实项目各 1 个 `T001` Pilot 的执行命令与结果，用于验证 Harness 与具体框架解耦。官网和后台的业务验收不在本轮范围内；能力边界见本页末尾。

## 验证对象

| 项目 | 项目类型 | 技术栈 | Pilot 任务 |
| --- | --- | --- | --- |
| HeTun-Site | 前端官网 | React、TypeScript、Vite、Tailwind，混合历史 HTML | `T001` |
| Workbench-Admin | 前端后台 | Vue 2、Vue CLI、Webpack、Element UI、Jest、Yarn | `T001` |

## 执行命令

每个项目在自己的仓库中执行以下命令；完整工作流见[工作流](/guide/overview)。

**Skill**：`continue-harness-inspect`、`continue-harness-doctor`、`continue-harness-inputs`、`continue-harness-task`、`continue-harness-verify`（`intake`、`resume` 由 `generic-harness` 覆盖，consumer-h5 项目为 `consumer-h5-harness`）

**CLI（可选）**：

```bash
continue-harness inspect --json
continue-harness doctor --json
continue-harness intake inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness resume --task T001 --json
continue-harness verify audit --json
continue-harness task history T001 --json
```

## 结果

| 环节 | HeTun-Site | Workbench-Admin |
| --- | --- | --- |
| Intake | `confirmed` | `confirmed` |
| 输入登记 | 1 个真实 PRD，`passed` | 1 个真实 PRD，`passed` |
| 占位输入拦截 | 通过负向验证 | 通过负向验证 |
| 验收解析 | `closed_with_risks` | `closed_with_risks` |
| Audit | `passed`：构建、Pilot smoke、验收均通过 | `passed`：Pilot lint、单测、开发构建、验收均通过 |
| 上下文恢复 | 成功 | 成功 |
| 交接快照 | 成功 | 成功 |

依赖安装后的复跑结果如下：HeTun-Site 的 `pnpm install`、`npm run build` 和 `npm run verify:pilot` 均成功；Vite 仍提示 chunk 体积超过 500 kB，但不阻塞本次 Pilot。Workbench-Admin 的 `npm run lint:pilot`、单测 28/28 和 `npm run build:pilot` 均成功；`build:pilot` 显式使用旧版 Webpack 所需的 OpenSSL 兼容参数，原始全量 Lint 的历史格式债务仍单独保留。

两个项目的最终 Harness `Audit` 均为 `passed`。两个快照记录了真实 PRD、确认输入、验收状态、验证结果和持久决策；`.env.*` 被排除，普通业务文件名不会触发敏感误报。

## Pilot 通过标准

Harness 在同时满足以下条件时判定 Pilot 通过：

- Intake 事实和第二轮证据均有明确状态与来源。
- 输入检查会拒绝 Harness 占位文档。
- 任务编号、输入哈希、命令日志和验证报告可以互相追溯。
- `resume` 能恢复任务、输入、验收、风险、验证和下一步动作。
- 未收口的验收会阻断完成结论；延期和外部阻塞保留原因。
- 快照不包含敏感内容，普通文件名不触发误报。
- 两个不同技术栈的项目得到一致的协议行为。

本轮在两个不同技术栈的项目上各完成 1 个 T001 Pilot，均达到 `passed`。后续业务需求需要创建新任务，并补充权限、API、视觉或部署证据。

## 能力边界

### 已验证能力

| 能力 | 证据 | 当前结论 |
| --- | --- | --- |
| 跨技术栈接入 | HeTun-Site（React/Vite）和 Workbench-Admin（Vue 2/Vue CLI）使用同一套 generic Harness 协议 | 2 个样本：Core 不依赖某个业务框架，命令和工程门禁由项目配置提供 |
| 多轮 Intake | 两个项目均完成基本信息确认、输入登记和非适用项确认 | Harness 先问项目事实，再生成按类型裁剪的输入问题 |
| 输入与任务绑定 | 真实 PRD、来源、版本、哈希和任务 ID 写入 manifest 与快照 | 占位输入会被拒绝，原始证据不被 Harness 改写 |
| 工程验证与验收 | 两个项目 Audit 均为 `passed`；未收口验收会让 Audit 失败 | 构建、测试、Lint 或 smoke 命令可由项目配置接入；验收状态独立参与结论 |
| 上下文恢复与交接 | 两个项目均生成 T001 不可变快照，包含输入、决策、风险和最近验证结果 | 新 Agent 可以从任务历史恢复，不依赖上一轮对话 |
| 日志与安全 | 命令日志、报告和快照互相引用；`.env.*` 被排除，普通业务文件名不再误报 | 执行过程有日志可查，敏感内容进入快照的风险较低 |
| 回归保护 | Harness 根项目 `pnpm test` 为 79/79，Site 构建通过 | Core/CLI 的流程行为有自动化测试保护 |

### 尚未验证

- 尚未用足够多的语言、平台和部署环境证明普适性。
- 尚未量化交付速度、返工率、缺陷率或 Agent 成本改善。
- 尚未验证 Harness 能替代产品负责人对业务、权限、API、视觉和发布结果的确认。
- 两个 Pilot 的 `passed` 对应 T001 工程门禁和验收边界，不代表两个产品全部完成。
- 历史项目仍可能存在格式债务、旧依赖、性能警告和业务范围缺口，这些需要在后续任务中继续登记和验收。

本轮在 2 个项目、各 1 个任务上验证了协作、验证、恢复与交接流程；不支持“自动完成任意项目”或“提升研发效率”。

## 维护方式

Harness 行为变化时同步更新：

1. CLI/Core 自动化测试。
2. 本页 Pilot 命令和结果表。
3. [验证](../guide/verification.md) 与 [验证与快照](../sop/verification-and-snapshot.md)。
4. 中英文页面和 Site 导航。

不要直接编辑 `.vitepress/.temp` 或 `.vitepress/dist`；它们是构建产物。
