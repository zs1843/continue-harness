---
name: continue-harness-skills
description: List or install continue-harness command Skills into a project or global Codex skill directory. Use when an Agent lacks a command Skill, when bootstrapping project-local automation, when installing all continue-harness workflows globally, or when checking available Skill names without modifying a project.
---

# 安装 Harness Skills

1. 运行 `continue-harness skills list --json` 查看随当前 CLI 分发的 Skills。
2. 项目安装使用 `continue-harness skills install --project --provider <codex|claude|cursor|all>`。Codex/Cursor 共用 `.agents/skills`，Claude Code 使用 `.claude/skills`。
3. 全局安装前向用户确认，随后使用 `continue-harness skills install --global --provider <codex|claude|cursor|all>`；默认分别安装到 `~/.codex/skills`、`~/.claude/skills` 和 `~/.cursor/skills`。
4. 仅安装单个 Skill 时使用 `--name <名称>`。
5. 已存在内容默认跳过；只有用户明确要求更新时使用 `--force`。覆盖前先检查是否包含用户维护内容。
6. 自定义全局目录使用 `--target <完整目录>`。
7. 安装后读取目标 `SKILL.md` 并报告实际安装、跳过和失败项。
8. Skills 是可调用工作流，不是项目约束本体；项目约束始终只维护在根目录 `AGENTS.md`。
