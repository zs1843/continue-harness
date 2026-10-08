# 创建或接入项目

本页说明首次接入项目时默认使用的 Skill 路径，CLI 仅作可选回退。Agent 会根据项目事实选择创建、接入、Intake、输入登记和验证流程。

## 通过 Agent 接入

完整接入提示词见[项目接入](/guide/ai-first)。

对于新项目，Agent 会创建通用约束容器；对于已有项目，Agent 会先预览接入影响，只补充缺失文件，不覆盖项目已经维护的内容。项目约束由目标项目自己声明，Agent 只根据已确认事实启用必要能力，不预设产品形态或技术栈。

## Skill 不可用时

缺少项目 Skill 时，让 Agent 只安装当前阶段需要的项目 Skill，再重新执行 Intake；除非项目事实明确需要，否则不安装 Consumer H5 或其他专项 Skill。安装提示词和命令见[项目接入](/guide/ai-first)。

如果 Agent 需要人工提供安装方式，使用[安装 CLI](#安装-cli)中的命令。

## 与 Agent 协作

输入和项目事实确认后，把目标、范围、非目标和验收标准交给 Agent，由 Agent 恢复上下文并开始任务。可直接发送的任务提示词见[项目接入](/guide/ai-first)。

换 Agent 或换会话时使用同一段提示词，先恢复当前项目上下文，再继续任务。

需要人确认的事项见[人工确认边界](./agent-workflow.md)。

<details>
<summary>CLI 参考（可选）</summary>

### 安装 CLI

安装 CLI 只能使用命令行；版本自检对应 Skill `continue-harness-version`。

当前 `0.1.0` 尚未发布到 npm，`@company` 仍是占位 scope。需要手工执行时，从源码安装：

```bash
git clone https://github.com/zs1843/continue-harness.git
cd continue-harness
pnpm install
node packages/cli/bin/continue-harness.mjs version
```

环境要求：Node.js 20 或更高版本、pnpm 10.12.1 或兼容版本。

### 创建项目

**Skill**：`continue-harness-create`（创建）、`continue-harness-plan`（预览）

```bash
continue-harness plan create my-project --json
continue-harness create my-project
cd my-project
```

默认创建只生成约束和协作记录，不生成业务代码或依赖；只有显式选择专项 preset 时，才会生成对应的项目模板。

### 接入已有项目

**Skill**：`continue-harness-init`（接入）、`continue-harness-plan`（预览）

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
```

只要预检发现真实冲突，初始化就不会写入任何文件。

### 迁移旧目录

`migrate` 没有对应的 Skill，仅 CLI 可用。

```bash
continue-harness migrate --dry-run --json
continue-harness migrate
```

迁移只在 `.continue-harness/` 不存在时移动旧的 `.fe-harness/` 目录。

完整命令清单见[命令](/reference/commands)。

</details>
