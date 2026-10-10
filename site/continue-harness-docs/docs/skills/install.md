# 安装 Skills

Skills 是按需使用的操作说明。新建或接入项目不会默认安装聚合 Skill；只在当前协作阶段需要时安装对应操作 Skill。

## 从仓库复制

```bash
git clone --depth 1 https://github.com/zs1843/continue-harness.git /tmp/continue-harness
mkdir -p .agents/skills
cp -R /tmp/continue-harness/skills/continue-harness-inputs .agents/skills/
```

将 `continue-harness-inputs` 替换为当前需要的 Skill 目录名。Codex 与 Cursor 使用 `.agents/skills/`；Claude Code 使用 `.claude/skills/`。

## CLI 安装（可选）

CLI 可用时，可以列出和安装单个 Skill：

```bash
continue-harness skills list --json
continue-harness skills install --project --name continue-harness-inputs
```

项目级与全局安装都需要显式指定目标。CLI 的完整选项如下：

```text
continue-harness skills install --project|--global [--provider codex|claude|cursor|all] [--name <名称>] [--target <目录>] [--force] [--json]
```

`--name` 指定单个 Skill；省略时会选择当前可安装的全部 Skills。已存在的目标默认跳过；`--force` 会覆盖同名内容，执行前应检查项目本地修改。

## 检查结果

安装后确认目标目录下存在对应的 `SKILL.md`，并让 Agent 重新加载 Skill。也可通过 `continue-harness skills list --json` 检查仓库当前提供的名称。

## 相关页面

- [内置 Skills](/skills/)
- [执行步骤](/skills/steps)
