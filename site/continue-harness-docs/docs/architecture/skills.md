# Agent Skills

Skills 是 Agent 可调用的工作流说明。

## Skill 列表

| Skill | 默认安装 | 什么时候用 |
| --- | --- | --- |
| `generic-harness` | 是 | 创建、接入、实现和验证技术栈无关项目的总工作流 |
| `consumer-h5-harness` | 否 | 创建、接入、实现和验证 Consumer H5 项目的专项工作流 |
| `continue-harness-create` | 否 | 从零创建通用或指定 preset 的项目，处理输入收集和首个任务 |
| `continue-harness-init` | 否 | 安全接入已有项目，处理冲突和存量 Token discovery |
| `continue-harness-inspect` | 否 | 读取项目事实、输入、Token、验证模式和 Agent 工作流状态 |
| `continue-harness-plan` | 否 | 在写文件前查看 create/init 计划 |
| `continue-harness-doctor` | 否 | 只读诊断 Node、pnpm、脚本、页面、输入、Token、Agent 等 |
| `continue-harness-inputs` | 否 | 登记、检查、分析 PRD/RP/UI/API/assets 输入 |
| `continue-harness-task` | 否 | 创建任务编号、查看历史、创建不可变快照 |
| `continue-harness-verify` | 否 | 按改动风险选择 quick/feature/visual/audit 等验证 |
| `continue-harness-api` | 否 | 检查 OpenAPI JSON，按任务 operationId 生成类型和请求 wrapper |
| `continue-harness-design-tokens` | 否 | 提炼、检查、比较唯一 Design Token 真值 |
| `continue-harness-skills` | 否 | 列出和安装项目级或全局 Skills |
| `continue-harness-version` | 否 | 检查 CLI 是否可用、版本是否匹配 |

## 默认安装策略

通用项目默认只安装：

```text
generic-harness
```

安装位置：

```text
.agents/skills/generic-harness/
.claude/skills/generic-harness/
```

Codex 和 Cursor 共用 `.agents/skills`，Claude Code 使用 `.claude/skills`。

如果需要给所有供应商安装默认聚合 Skill：

```bash
continue-harness skills install --project --provider all --name generic-harness
```

如果某个任务需要专项能力，再安装对应 Skill：

```bash
continue-harness skills install --project --name continue-harness-api
continue-harness skills install --project --name continue-harness-design-tokens
```

## 为什么只默认安装一个

命令级 Skills 很有用，但不应该成为默认上下文。默认安装全部命令级 Skills 会让 Agent 在普通项目任务里也读到 API、Design Token、UI System、visual baseline 等不相关规则。

聚合 Skill 负责稳定工作流；命令级 Skills 通过显式命令按需安装：

```bash
continue-harness skills install --project --name continue-harness-api
continue-harness skills install --project --name continue-harness-design-tokens
```

## 单一约束本体

`AGENTS.md` 是唯一项目约束正文。`CLAUDE.md` 和 Cursor rule 只是指向它。

Skills 描述工作程序，不替代项目约束，也不复制完整约束正文。这样能减少多供应商规则漂移。

## 人还需要做什么

Skills 能让 Agent 更稳定，但不能替人做权威判断。人仍然需要：

- 提供或确认 PRD、RP、UI、API 和 assets 的有效版本。
- 在输入冲突时决定哪个来源有效。
- 确认 Design Token 权威来源和用户临时覆盖。
- 选择多个候选 operationId 中真正需要的接口。
- 决定需求延期、外部阻塞或验收豁免。
- 批准全局安装、依赖安装、发布和其他越界操作。
