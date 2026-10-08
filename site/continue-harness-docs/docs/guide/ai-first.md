# 项目接入

本页给出通过项目 Skill 接入 `continue-harness` 的完整提示词和 Skill 安装方式，也是其余指南页面的起点。项目也可以直接使用 CLI；使用 Skill 时，接入、输入登记、任务、验证和交接由 Agent 按同一套项目约束执行。

## 接入或新建项目

把下面的提示词发给 Codex、Claude Code、Cursor 或其他支持项目级 Skill 的 Agent：

```text
请使用 Continue Harness 的项目接入 Skill 接入并检查当前项目。

如果是新项目，使用 `continue-harness-create`；如果是已有项目，使用 `continue-harness-init`。

先不要修改业务代码。按以下顺序执行：
1. 读取项目约束、Harness 配置和当前状态。
2. 第一轮 Intake 只确认项目类型、目标范围、运行环境、协作对象和技术栈；未知信息标记为 pending，不要猜测。
3. 根据项目类型生成第二轮最小输入清单；逐项登记来源，非适用项标记为 not_applicable。
4. 执行只读检查，报告项目事实、输入状态、风险和下一步。

最后输出：已确认事实、待确认问题、已登记输入、检查结果和可以开始的第一个任务。
```

Agent 会根据项目是前端、后端、客户端、数据、基础设施或混合项目，决定是否需要 UI、API、部署或其他证据。

## 创建任务

当 Intake 和输入登记完成后，可以直接告诉 Agent：

```text
请使用 Continue Harness 的任务和验证 Skill 恢复当前项目上下文并开始这个任务：

<描述目标、范围、非目标和验收标准>

先读取当前任务、有效输入、最近快照、决策和日志；如果依据不足，先提出问题，不要猜测。
请创建或继续稳定任务 ID，完成实现后运行与项目配置匹配的验证，记录日志、风险、验收结论和下一步。
```

每轮结束时，Agent 应返回完成项、依据、变更、验证结果、失败或重试、剩余风险和下一步。换 Agent 或换会话时，用同一段提示词恢复当前项目上下文，即可从任务快照和日志继续。

## 安装 Skill

项目级 Skill 从仓库的 `skills/<名称>/` 复制到宿主目录。默认 preset `generic` 只需要聚合 Skill `generic-harness`：

```bash
git clone --depth 1 https://github.com/zs1843/continue-harness.git /tmp/continue-harness

# Codex / Cursor
mkdir -p .agents/skills
cp -R /tmp/continue-harness/skills/generic-harness .agents/skills/

# Claude Code
mkdir -p .claude/skills
cp -R /tmp/continue-harness/skills/generic-harness .claude/skills/
```

`consumer-h5-harness` 只在 `--preset consumer-h5` 时使用；其余 12 个命令级 Skill 按需复制。全局安装、安装位置和更新方式见[安装 Skills](../skills/install.md)。

## Skill 缺失时

如果 Agent 报告缺少当前阶段的项目 Skill，让它只安装当前需要的那一个：

```text
请检查当前项目是否已有 Continue Harness 的接入、任务和验证 Skill。缺少时只安装当前阶段需要的 Skill；安装完成后重新执行项目 Intake，不要安装 Consumer H5 或其他专项 Skill，除非项目事实明确需要。
```

Agent 根据项目配置选择 `inspect`、`doctor`、`inputs`、`task`、`resume` 和 `verify` 等命令，用户不需要手工拼接后续 CLI 命令。

接入和协作中需要人确认的事项见[人工确认边界](./agent-workflow.md)。
