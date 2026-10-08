# 安装 Skills

本页说明如何从 GitHub 仓库安装 Skill，以及可选的 CLI 方式、安装位置和覆盖行为。

## 从 GitHub 仓库安装

Skill 是纯 Markdown 目录，直接从仓库的 `skills/<名称>/` 取用，不依赖 npm 发布：

```text
https://github.com/zs1843/continue-harness
```

### 1. 取得仓库

```bash
git clone --depth 1 https://github.com/zs1843/continue-harness.git /tmp/continue-harness
```

只需要 Skill 时，也可以单独下载仓库的 `skills/` 目录。

### 2. 复制当前阶段需要的 Skill

默认 preset `generic` 只需要聚合 Skill `generic-harness`：

```bash
# Codex / Cursor
mkdir -p .agents/skills
cp -R /tmp/continue-harness/skills/generic-harness .agents/skills/

# Claude Code
mkdir -p .claude/skills
cp -R /tmp/continue-harness/skills/generic-harness .claude/skills/
```

`consumer-h5-harness` 只在 `--preset consumer-h5` 时使用。其余 12 个命令级 Skill 按需复制：

```bash
cp -R /tmp/continue-harness/skills/continue-harness-api .agents/skills/
```

Windows PowerShell 使用 `Copy-Item -Recurse`：

```powershell
git clone --depth 1 https://github.com/zs1843/continue-harness.git $env:TEMP\continue-harness
New-Item -ItemType Directory -Force .agents\skills | Out-Null
Copy-Item -Recurse -Force $env:TEMP\continue-harness\skills\generic-harness .agents\skills\
```

### 3. 全局安装（可选）

复制到宿主的全局 skills 目录即可，例如 `~/.codex/skills`、`~/.claude/skills` 或 `~/.cursor/skills`。全局目录对所有项目可见，项目专用工作流建议使用项目级安装。

## 安装位置

| 作用域 | 宿主 | 目标目录 |
| --- | --- | --- |
| 项目 | Claude Code | `<cwd>/.claude/skills` |
| 项目 | Codex、Cursor | `<cwd>/.agents/skills` |
| 全局 | Codex | `$CODEX_HOME/skills`，未设置时为 `~/.codex/skills` |
| 全局 | Claude Code | `~/.claude/skills` |
| 全局 | Cursor | `~/.cursor/skills` |

Codex 与 Cursor 共用 `.agents/skills`；Claude Code 读 `.claude/skills`。

## 更新已有 Skill

```bash
cd /tmp/continue-harness && git pull
cp -R /tmp/continue-harness/skills/generic-harness .agents/skills/
```

复制会覆盖同名文件。覆盖前检查目标目录中是否有本地修改。

## 可选：CLI 安装

CLI 可用时，`skills install` 与手工复制等价。

**Skill**：`continue-harness-skills`

**CLI（可选）**：

```bash
continue-harness skills list [--json]
continue-harness skills install --project|--global [--provider codex|claude|cursor|all] [--name <名称>] [--target <目录>] [--force] [--json]
```

| 参数 | 取值 | 说明 |
| --- | --- | --- |
| `--project` | — | 安装到当前项目目录 |
| `--global` | — | 安装到用户目录 |
| `--provider` | `codex`（默认）、`claude`、`cursor`、`all` | 选择宿主；`all` 同步三个宿主 |
| `--name` | Skill 名称 | 缺省为全部可用 Skill；名称不存在时命令报错 |
| `--target` | 目录 | 覆盖默认落点；与 `--provider all` 互斥 |
| `--force` | — | 覆盖已存在的同名 Skill 目录 |
| `--json` | — | 输出 `installed`、`skipped`、`targets` 等字段 |

`--project` 与 `--global` 二选一必填。已存在同名目录时默认跳过，不覆盖。

## 验证安装

```bash
ls .agents/skills/generic-harness
```

1. 目标目录下存在 `SKILL.md`。
2. 读取 `SKILL.md`，确认 `name` 与预期一致。
3. 让 Agent 重新读取项目 Skill；CLI 可用时也可运行 `continue-harness skills list --json` 对照名称。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| Agent 报告缺少某个 Skill | 只复制当前阶段需要的那个，不要一次装全部。 |
| Agent 仍找不到 Skill | 确认目录与宿主匹配：Claude Code 读 `.claude/skills`，Codex 与 Cursor 读 `.agents/skills`。 |
| 需要更新已有 Skill | 先确认没有本地修改，再重新复制覆盖。 |
| 只想取一个 Skill | 浅克隆后用 `cp -R /tmp/continue-harness/skills/<名称> <目标目录>/`，或直接下载该目录。 |
| 全局安装影响其他项目 | 全局目录对所有项目可见；项目专用工作流使用项目级安装。 |

## 相关页面

- [内置 Skills](/skills/)
- [执行步骤](/skills/steps)
