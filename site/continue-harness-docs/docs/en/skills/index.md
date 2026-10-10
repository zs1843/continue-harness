# Built-in Skills

This page describes how operation Skills relate to the CLI and lists the current built-in Skills. See [Install skills](/en/skills/install) and [Execution steps](/en/skills/steps) for details.

## Responsibilities

Skills are Markdown guidance loaded by an Agent to invoke a specific capability. They are not the project-constraint source or a prerequisite for the general collaboration workflow. Project constraints remain in `AGENTS.md`.

The repository provides operation-specific Skills. Select one for the current stage, work through Agent conversation, or invoke the CLI in automation. `create` and `init` do not install Skills by default or create an aggregate project Skill.

## Built-in list

The repository root `skills/` currently contains 12 operation Skills. Use the current output of `continue-harness skills list --json` as the source of truth.

| Name | Purpose |
| --- | --- |
| `continue-harness-create` | Create a project collaboration workspace |
| `continue-harness-init` | Adopt an existing project |
| `continue-harness-inspect` | Read project facts and machine-readable state |
| `continue-harness-plan` | Preview `create` and `init` writes |
| `continue-harness-doctor` | Read-only diagnostics |
| `continue-harness-verify` | Run project-configured verification |
| `continue-harness-inputs` | Register and analyze task-relevant inputs |
| `continue-harness-task` | Task IDs, history, and snapshots |
| `continue-harness-design-tokens` | Optional: maintain design-value sources |
| `continue-harness-api` | Optional: generate code from interface contracts |
| `continue-harness-skills` | List and install Skills |
| `continue-harness-version` | Check CLI availability and version |

## Install locations

Project Skills can be installed in `.agents/skills/<name>/` or `.claude/skills/<name>/`. Codex and Cursor use `.agents/skills/`; Claude Code uses `.claude/skills/`. Global locations depend on the host.

## Project constraints

`AGENTS.md` is the single authority for project constraints. `CLAUDE.md` and `.cursor/rules/` are entry adapters only. Skills explain operations and do not override project constraints.

## Related pages

- [Install skills](/en/skills/install)
- [Execution steps](/en/skills/steps)
