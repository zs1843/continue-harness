# Agent collaboration

This page describes the Agent read order, entry files, handoff, and human approval boundaries after project adoption. See [Get started](./getting-started.md) for the user entry point.

## Single source of constraints

`AGENTS.md` is the only constraint body; it holds the project constraints, read order, and collaboration boundaries. `CLAUDE.md` and `.cursor/rules/` only adapt how each Agent loads it and point to `AGENTS.md`; they do not keep a second set of long-lived rules. Skills are invokable workflow descriptions: they neither override project constraints nor copy the constraint body.

Update `AGENTS.md` when constraints change. Update `.continue-harness/project.yaml` as well only when project facts or verification-command mappings change. Then check that each Agent entry still points to the authoritative constraints.

## Execution order

1. Read `AGENTS.md`, `.continue-harness/project.yaml`, and project fact documents.
2. Run `inspect` and `doctor` (Skills: `continue-harness-inspect`, `continue-harness-doctor`) to check readiness.
3. Read the PRD/RP/UI/API inputs attached to the current task instead of all inputs.
4. Implement within the project's existing directory and dependency boundaries.
5. Select a `verify` mode by change type (Skill: `continue-harness-verify`); investigate failures, rerun relevant checks after a fix, and pause for confirmation when the safe resolution is unclear.
6. Update status, decisions, history, and the task snapshot.
7. End the conversation with verification results, remaining risks, and numbered next actions.

## Agent entry files

Each entry file references the same constraint body in the way its Agent loads files:

| File or directory | Purpose |
| --- | --- |
| `AGENTS.md` | Project constraints, read order, and collaboration boundaries |
| `.continue-harness/project.yaml` | Project facts, command mappings, and verification configuration |
| `.agents/skills/` | Project Skills for Codex, Cursor, and compatible Agents |
| `CLAUDE.md` | Thin Claude Code entry that points to `AGENTS.md` |
| `.claude/skills/` | Project Skills for Claude Code |
| `.cursor/rules/` | Cursor rule adapter |

## Cross-Agent handoff

Before a task, read `AGENTS.md`, the project configuration, the project map, current status, and task-relevant inputs. When changing Agents or sessions, use the `continue-harness-task` Skill (which invokes `resume`) to restore the current task; review the latest snapshot, verification reports, logs, open risks, and next actions before continuing.

Tasks, inputs, verification, and snapshots share one task ID, which locates the implementation files and verification results.

## Inputs by task type

| Task | Read first |
| --- | --- |
| General implementation | Current task, input manifest, applicable requirements and constraints |
| Work involving visual acceptance | Confirmed visual references and related acceptance records, when applicable |
| Work involving interface or data contracts | Relevant contracts and task-selection records, when applicable |
| Architecture change | Existing architecture notes, decisions, and relevant history, when available |

## Human approval boundaries

The Agent reads facts, runs read-only checks, previews plans, implements, and runs authorized verification. People confirm:

- Project goals, business facts, and input conflict resolutions.
- Deferrals, external blockers, and acceptance waivers.
- Protected component or Token boundaries.
- Production dependencies, public interfaces, publishing, and remote repository operations.
- Whether the final delivery meets business, product, or operations requirements.
