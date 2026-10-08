# 真实项目 Pilot 验证

> 验证时间：2026-10-08；Harness CLI：`0.1.0`。本页记录本地真实仓库的可复核结果，不把项目阻塞写成 Harness 通过。

## 验证对象

| 项目 | 项目类型 | 技术栈 | Pilot 任务 |
| --- | --- | --- | --- |
| HeTun-Site | 前端官网 | React、TypeScript、Vite、Tailwind，混合历史 HTML | `T001` |
| Workbench-Admin | 前端后台 | Vue 2、Vue CLI、Webpack、Element UI、Jest、Yarn | `T001` |

两个项目用于验证 Harness 是否与具体框架解耦，而不是验证官网或后台业务本身。

## 执行闭环

```text
Intake
  → 输入确认与登记
  → 创建 T001
  → 写入命令日志
  → verify audit
  → 验收状态检查
  → resume 上下文恢复
  → task snapshot 交接
```

每个项目实际执行：

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

因此两个项目的最终 Harness `Audit` 均为 `passed`。这表示 T001 Pilot 的工程门禁和验收边界已闭环，不表示官网业务验收或后台权限/API 矩阵已经完成。两个快照均记录了真实 PRD、确认输入、验收状态、验证结果和持久决策；`.env.*` 被排除，普通业务文件名不会触发敏感误报。

## 完善性判定标准

Harness 只有同时满足以下条件，才可以称为 Pilot 通过：

- Intake 事实和第二轮证据均有明确状态与来源。
- 输入检查不会接受 Harness 占位文档。
- 任务编号、输入哈希、命令日志和验证报告可以互相追溯。
- `resume` 能恢复任务、输入、验收、风险、验证和下一步动作。
- 未收口验收会阻断完成结论；延期和外部阻塞必须保留原因。
- 快照不泄露敏感内容，并且不因普通文件名误报。
- 两个不同技术栈的项目得到一致的协议行为。

本轮证明通用协作闭环和快照机制已跑通，且两个不同技术栈的 T001 Pilot 均达到 `passed`。后续业务需求仍必须创建新任务并补充对应的权限、API、视觉或部署证据，不能把 Pilot 通过等同于产品完成。

## 能力边界与证据

### 已验证能力

| 能力 | 证据 | 当前结论 |
| --- | --- | --- |
| 跨技术栈接入 | HeTun-Site（React/Vite）和 Workbench-Admin（Vue 2/Vue CLI）使用同一套 generic Harness 协议 | Core 不依赖某个业务框架；命令和工程门禁由项目配置提供 |
| 多轮 Intake | 两个项目均完成基本信息确认、输入登记和非适用项确认 | Harness 会先问项目事实，再生成按类型裁剪的输入问题 |
| 输入可追溯 | 真实 PRD、来源、版本、哈希和任务 ID 写入 manifest 与快照 | 占位输入会被拒绝，原始证据不被 Harness 改写 |
| 工程验证与验收闭环 | 两个项目 Audit 均为 `passed`；未收口验收会让 Audit 失败 | 构建、测试、Lint 或 smoke 命令可由项目配置接入；验收状态独立参与结论 |
| 上下文恢复与交接 | 两个项目均生成 T001 不可变快照，包含输入、决策、风险和最近验证结果 | 新 Agent 可以从任务历史恢复，而不是依赖上一轮对话 |
| 日志与安全边界 | 命令日志、报告和快照互相引用；`.env.*` 被排除，普通业务文件名不再误报 | 能追溯执行过程，同时降低敏感内容进入快照的风险 |
| 回归保护 | Harness 根项目 `pnpm test` 为 70/70，Site 构建通过 | Core/CLI 的闭环行为有自动化测试保护 |

### 尚未验证能力

- 尚未用足够多的语言、平台和部署环境证明普适性。
- 尚未量化交付速度、返工率、缺陷率或 Agent 成本改善。
- 尚未证明 Harness 能替代产品负责人对业务、权限、API、视觉和发布结果的确认。
- 两个 Pilot 的 `passed` 代表 T001 工程门禁和验收边界闭环，不代表两个产品全部完成。
- 历史项目仍可能存在格式债务、旧依赖、性能警告和业务范围缺口，这些必须在后续任务中继续登记和验收。

因此，当前版本可以自证“让不同项目在统一协议下可追溯地协作、验证、恢复和交接”，但不能自证“自动完成任意软件项目”或“必然提升研发效率”。

## 维护方式

每次 Harness 行为发生变化时，同步更新：

1. CLI/Core 自动化测试。
2. 本页 Pilot 命令和结果表。
3. [验证与报告](../guide/verification.md) 与 [验证和快照详解](../sop/verification-and-snapshot.md)。
4. 中英文页面和 Site 导航。

不要直接编辑 `.vitepress/.temp` 或 `.vitepress/dist`；它们是构建产物。
