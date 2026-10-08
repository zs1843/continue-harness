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

## 维护方式

每次 Harness 行为发生变化时，同步更新：

1. CLI/Core 自动化测试。
2. 本页 Pilot 命令和结果表。
3. [验证与报告](../guide/verification.md) 与 [验证和快照详解](../sop/verification-and-snapshot.md)。
4. 中英文页面和 Site 导航。

不要直接编辑 `.vitepress/.temp` 或 `.vitepress/dist`；它们是构建产物。
