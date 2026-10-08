# 文档站审计与修正清单

Updated: 2026-10-08

本文件是 `site/continue-harness-docs` 的四路审计结果与修正施工图。审计方法：逐字读完文档，再对照
`packages/core/src/**`、`packages/cli/bin/fe-harness.mjs`、`packages/cli/presets/**`、`templates/**`、
`skills/**` 与 `tests/**` 逐条核对；关键结论用实际命令复现（见文末）。

审计范围：站点 78 个 Markdown 页面（中英）+ CLI/Core/preset/template/Skill 实现。

## 结论摘要

- 结构完整：78 页全部被导航引用（0 孤立页）、0 断链、0 失效锚点、中英结构同构。
- 总体不夸大：两个真实项目的口径限定为「各 1 个 T001 Pilot、audit passed、不代表产品完成、无量化
  收益」；未实现能力（upgrade / GitLab CI / Codex Plugin / npm 发布 / 在线 Apifox 同步）均正确标注。
- 但存在**会误导用户的功能性事实错误**，其中验收门禁与快照前置条件两条最严重，已在本轮修正。

## A. 事实错误与夸大

严重度：高 = 会直接导致用户操作失败或得到相反结论；中 = 事实错误但不阻塞；低 = 措辞或细节偏差。

### A1 验收门禁被描述得比实现宽松（高）

| 项 | 内容 |
| --- | --- |
| 文档 | `reference/verification-modes.md`、`sop/verification-and-snapshot.md`、`reference/config-and-files.md`（中英各 3 处） |
| 原表述 | 「文件不存在、没有表格或表头缺少状态列时，验收项返回 `not_configured`，不参与该次验证的失败判定」 |
| 实现 | `packages/cli/bin/fe-harness.mjs:777-789`：`if (acceptance.status === 'needs_confirmation' \|\| (taskId && acceptance.status === 'not_configured'))` 追加 `failed` 结果并把整体置为 `failed`；`taskId` 缺省取最近任务（`:771-773`）。`acceptance.mjs:54-83` 的 `verified` 行校验、未登记 active 需求补 `uncovered_requirement` 都会推到 `needs_confirmation` |
| 证据 | `tests/generic-closure.test.mjs:139-157` 断言「blocks missing acceptance」且 exit 1 |
| 影响 | consumer-h5 preset 不生成 `docs/ACCEPTANCE.md`，绑定任务后 `verify feature` 必然失败；按原文理解会以为「未配置所以不阻塞」 |
| 修正 | 改为「绑定任务时（显式 `--task` 或默认最近任务），缺失 / 无表格 / 缺状态列 / 有未收口项一律失败；仅无任务绑定时 `not_configured` 不参与失败判定」 |
| 状态 | 已修 |

### A2 `task snapshot` 的前置条件写反（高）

| 项 | 内容 |
| --- | --- |
| 文档 | `sop/task-and-implementation.md:53`（中英） |
| 原表述 | 「文件不存在时快照正常创建。」 |
| 实现 | `packages/core/src/history.mjs:117-119`：`not_configured` 与 `needs_confirmation` 都 `throw` |
| 证据 | `tests/generic-closure.test.mjs:122` 断言 reject |
| 修正 | 改为「文件不存在、缺状态列或存在未收口项时都在写入前报错；快照要求验收已收口」 |
| 状态 | 已修 |

### A3 `design tokens diff` 被写成会写文件（高）

| 项 | 内容 |
| --- | --- |
| 文档 | `skills/steps.md`（中英） |
| 原表述 | 「运行 `design tokens diff --json`，把差异写入任务快照并更新变更历史」 |
| 实现 | `fe-harness.mjs:901-921`：`diff` 分支只调用 `inspectDesignTokens` 并打印「需要项目提供前后版本时计算」，不接受任何 before/after 输入；`core/design.mjs:132` 的 `diffDesignTokens` 全仓**无调用方** |
| 相关项目问题 | CLI `--help`（`fe-harness.mjs:284`）与 `templates/TOKENS.md:5` 也声称快照含 `design-token-diff.json`，而 `history.mjs:186-197` 实际只写 `SNAPSHOT.md`/`files.json`/`verification.json`/`context.json`；`skills/continue-harness-design-tokens/SKILL.md:14` 同源错误 |
| 修正 | 文档与 Skill 改为「只读；仅在项目提供前后版本时给出差异；变更由 Agent 比较后写入变更历史」；CLI 帮助与 `TOKENS.md` 改为真实产物清单 |
| 状态 | 已修（文档 + Skill + CLI 帮助 + 模板） |

### A4 `plan init` 状态词错误（高）

| 项 | 内容 |
| --- | --- |
| 文档 | `showcase/workflow-example.md:57`（中英） |
| 原表述 | 「`plan init --json`，每个条目给出 `create`、`unchanged` 或 `conflict` 状态」 |
| 实现 | `core/init.mjs:13-34`：只产出 `create` / `managed_unchanged` / `project_owned_modified`，`plan.status` 恒为 `ready`；`unchanged`/`conflict` 属 `project.mjs:24/32` 的 **create** 计划 |
| 修正 | 改为 `create` / `managed_unchanged` / `project_owned_modified`，并说明项目自有文件不会被覆盖 |
| 状态 | 已修 |

### A5 测试数量过期（中）

| 项 | 内容 |
| --- | --- |
| 文档 | `showcase/real-project-pilot.md:77`（中英）写 `71/71`；`index.md:94` 的数字被抹掉只剩空格（`包含 自动化回归测试`） |
| 实际 | `pnpm test` = **79/79**（16 个测试文件）；`docs/CURRENT_STATUS.md` 亦记 79 |
| 修正 | 两处改为 79 |
| 状态 | 已修 |

### A6 Core 边界表述自相矛盾（中）

| 项 | 内容 |
| --- | --- |
| 文档 | `architecture/overview.md:52`「Core 只处理通用协议，因此产品形态变化不改 Core」vs `architecture/core.md:18`「新增适配器需要同步 Core 枚举」 |
| 实现 | `core/config.mjs:41/46/49` 硬编码 `['consumer_h5','developer_tooling']`、`['web_mobile','node']`、`['uni-app','node-esm']`；`doctor.mjs:147-184` 校验 uni-app 的 `src/pages.json`，`:531-543` 要求 `@dcloudio/uni-app`+`vue`；`ui-contract.mjs:45` 对非 consumer_h5 直接 `enabled:false` |
| 修正 | 统一为「Core 不 import 适配器模块，但硬编码受支持枚举并内置 uni-app 检查；新增适配器需同步 Core 枚举与 `schemas/project.schema.json`」 |
| 状态 | 待修 |

### A7 其余中低严重度

| # | 位置 | 问题 | 状态 |
| --- | --- | --- | --- |
| A7.1 | `architecture/adapters.md:3`、`overview.md:38-42` | 称 Profile/Platform/Stack 为「独立扩展点」，但运行时只有 `ui-systems/` 被读取，其余仅声明式描述文件 | 待修 |
| A7.2 | `architecture/ui-system.md:36` | 称扫描 `src/` 下 `.vue`，实际只扫 `components`/`component`/`widgets`/`pages` 四个目录（`ui-contract.mjs:25`） | 待修 |
| A7.3 | `architecture/ui-system.md:36` | 三列固定「待确认」，实际「使用页面」渲染为「待扫描」（`ui-contract.mjs:39`） | 待修 |
| A7.4 | `architecture/templates-presets.md:7` | 称 `init` 按 `templates/` 映射，实际默认 `init` 复制 `presets/generic/**`（`fe-harness.mjs:376-387`） | 待修 |
| A7.5 | `architecture/templates-presets.md:46-63` | presets 文件清单不完整（generic 漏 3 项、consumer-h5 漏多项与 legacy 双份 `.fe-harness/`） | 待修 |
| A7.6 | `architecture/cli.md:11` | 「主帮助只展示 create/init → inputs → task → verify」漏 `intake`（`fe-harness.mjs:110-121`） | 待修 |
| A7.7 | `architecture/core.md:18`、`overview.md:18` | 枚举列表漏 `developer_tooling` | 待修 |
| A7.8 | `architecture/core.md:40-55` | 模块表 14 行，实际 20 个文件（漏 `project.mjs`/`paths.mjs`/`status.mjs`/`verification-context.mjs`） | 待修 |
| A7.9 | `architecture/design-tokens.md:30` | 写新项目状态 `pending_extraction`，模板实为 `pending` | 待修 |
| A7.10 | `reference/commands.md:13`、`config-and-files.md:58` | 称 `intake inspect` 只读，实际首次会写 `.continue-harness/intake.yaml`（`fe-harness.mjs:474-481`） | 待修 |
| A7.11 | `reference/config-and-files.md:58` | 称 consumer-h5 不生成 `intake.yaml`，实际 `createInitialIntake` 与 preset 无关（`fe-harness.mjs:460`） | 待修 |
| A7.12 | `reference/commands.md:11/50`、`sop/init-existing-project.md:49-59` | init「冲突时不写」+ 5 行状态表；`init.mjs` 只有 3 态、`status` 恒 `ready`，conflict 分支不可达 | 待修 |
| A7.13 | `reference/commands.md:126` | 暗示 `design tokens diff` 能给出差异 | 待修 |
| A7.14 | `reference/commands.md:157` | experimental 标在源路径，实际安装目标是 `.continue-harness/ui-systems/<name>/adapter.yaml` | 待修 |
| A7.15 | `reference/commands.md:116` | 「生成前必须先 inspect 和 `--dry-run`」是流程建议，CLI 不校验 | 待修 |
| A7.16 | `reference/verification-modes.md:55` | 「blocked 不计为项目业务失败」易误读：`runner.mjs:98` 仍判整体 failed、exit 1 | 待修 |
| A7.17 | `en/background/principles.md:33` | 与中文版漂移，丢掉「延期/阻塞保留为风险、版本变化后重新验证」 | 待修 |
| A7.18 | `showcase/case-study.md:20,60` | 缺 pilot 页的强限定「尚未按新增验收关联重新验证」 | 待修 |
| A7.19 | `deploy/build.md:3` vs `:39` | 命令执行目录口径矛盾（tar 的 `-C site/...` 只在仓库根成立） | 待修 |
| A7.20 | `skills/install.md:7` | 「Skill 是纯 Markdown 目录」不准确：每个 Skill 还带 `agents/openai.yaml`，create 还带 `references/` | 待修 |
| A7.21 | `skills/steps.md:48` | `task snapshot <编号> --json` 缺 `--title/--request`，与同页 `:139` 自相矛盾 | 待修 |
| A7.22 | `skills/steps.md:55` | 示例给 `pnpm harness:interaction`，但出厂 preset 该模式为 `not_configured` | 待修 |
| A7.23 | `index.md:7`、`en/index.md:7` | 中文 tagline 含「可追溯」，英文 tagline "in one executable protocol" 超出实现，且中英语义不一致 | 已修（改为「把需求、实现、验收与证据关联到同一任务编号，让项目上下文可恢复」/ "Requirements, implementation, acceptance, and evidence bound to one task ID, so project context can be resumed."） |

## B. 完整性缺口

| # | 缺口 | 证据 | 状态 |
| --- | --- | --- | --- |
| B1 | **如何得到可执行的 `continue-harness`**：站点约 20 处写裸命令，但 0.1.0 未发布 npm，全站无 `npm link`/全局安装说明（`getting-started.md` 只演示 `node packages/cli/bin/...`） | `README.md:17`、`packages/cli/package.json` | 待修（影响面最大） |
| B2 | **全局选项与退出码**：`--json`、`-h/--help`、`-v/--version`、失败 exit 1 未定义，而 `reference/commands.md:3` 自称权威清单 | `fe-harness.mjs:100-101,137,761,804` | 待修 |
| B3 | **`migrate` 语义**：`--dry-run`、`not_needed/ready/conflict` 三态、整体 rename、`.fe-harness` 回退读取 | `fe-harness.mjs:402-424`、`core/paths.mjs:21-25` | 待修 |
| B4 | **`intake` 状态机**：`phase`/`status` 流转、`--source`（confirmed 必需）/`--note`（新增与 not_applicable 必需） | `core/intake.mjs:8-99`、`fe-harness.mjs:512-536` | 待修 |
| B5 | **验收门禁内部规则**：输入完整性、`verified` 行需真实实现/证据、禁止自引用 report、自动补 `uncovered_requirement` | `core/acceptance.mjs:54-83` | 待修 |
| B6 | **快照前置与产物**：需 inputs passed + 验收收口 + 指纹匹配的 verify 报告；产物 4 个文件；敏感内容扫描 | `core/history.mjs:103-198` | 待修 |
| B7 | 产物表不全：`.continue-harness/ui-systems/<name>/adapter.yaml`、`docs/UI-COMPONENT-INVENTORY.md`、`docs/history/tasks/<task>/<时间戳>/` | `fe-harness.mjs:632-678` | 待修 |
| B8 | 配置键不全：`ui.system.runtime.{status,package,version}`、create 与 api generate 的计划状态 | `core/ui-system.mjs:26-31`、`core/project.mjs:24`、`core/openapi.mjs:178-179` | 待修 |
| B9 | 步骤结构未完全统一：4 处完整（Skill+CLI）、4 处只有 `**Skill**`、6 处两者皆无且折叠块连「（可选）」都省 | `guide/evidence.md:58`、`guide/tasks-and-resume.md:39`、`guide/verification.md:38` 等 | 待修 |
| B10 | `maintenance/docs-as-contract.md` 缺仓库实际执行的两条规则：中英同步、Site 导航注册 | `showcase/real-project-pilot.md:96` | 待修 |

## C. 项目侧问题（非文档）

| # | 问题 | 证据 | 状态 |
| --- | --- | --- | --- |
| C1 | CLI `--help` 声称快照含 `design-token-diff.json`，实际不生成 | `fe-harness.mjs:284` vs `history.mjs:186-197` | 已修 |
| C2 | `templates/TOKENS.md:5` 同源错误 | — | 已修 |
| C3 | `skills/continue-harness-design-tokens/SKILL.md:14` 同源错误 | — | 已修 |
| C4 | `prepare-package.mjs` 用 `cp` 只覆盖不删除，导致发布包残留 12 个 `fe-harness-*` 旧别名与 `.fe-harness/**`（26 vs 14 个 Skill） | `packages/cli/skills`、`packages/cli/presets/consumer-h5/.fe-harness` | 已修（改为先 `rm` 再 `cp`，并已重新暂存：26→14、别名 0、残留 0） |
| C5 | `pnpm test` 会向仓库自身 `.continue-harness/logs/commands.ndjson` 追加日志（`runVerification` 按 `cwd` 写日志，测试传 `process.cwd()`），doctor 的 `TEST_ISOLATION` 检查发现不了 | `tests/runner.test.mjs`、`tests/governance.test.mjs` | 已修（改用 `mkdtemp` 临时目录；实测运行前后日志行数不变） |
| C6 | 待决策：consumer-h5 preset 不生成 `docs/ACCEPTANCE.md`，但绑定任务时该文件缺失会导致 `verify feature` 失败——是「补模板」还是「放宽门禁」，需要产品决策 | A1 | 待决策 |

## D. 复现检查命令

```bash
# 测试与打包
pnpm test                                  # 期望 79/79
pnpm pack:check                            # 期望 package pack check passed
pnpm docs:build                            # 期望退出码 0

# 验收门禁行为（绑定任务 + 缺 ACCEPTANCE.md → 失败）
node --test tests/generic-closure.test.mjs

# 文档站结构
grep -rn "不参与失败判定\|快照正常创建\|design-token-diff.json" site/continue-harness-docs/docs   # 期望 0 命中
```

## E. 修正顺序建议

1. A6、A7.1–A7.4（Core 边界与适配器/模板表述）——同一批文件，可一次改完。
2. A7.10–A7.12（intake 只读性、preset 生成、init 状态表）——参考页与 SOP 成对修改。
3. B1–B4（可执行 CLI、全局选项、migrate、intake 状态机）——补新小节，价值最高。
4. B5–B8（验收门禁、快照前置、产物表、配置键）——需要与 A1/A2 的新措辞保持一致。
5. B9–B10、A7.13–A7.23——措辞与结构收尾。
6. C6 需要产品决策后再回写文档。
