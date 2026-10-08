# Built-in skills

This page explains what a Skill is, how Skills relate to the CLI, and the built-in list and default installation policy. Installation commands and options are in [Install skills](/en/skills/install); per-Skill steps are in [Execution steps](/en/skills/steps).

## What a Skill is

A Skill is plain Markdown instruction in `SKILL.md`. It contains no executable code. It describes the read order, decision points, and CLI commands to call, and is loaded and executed by an Agent that supports project-level Skills.

Each Skill is a directory with `SKILL.md` plus optional `agents/` (host metadata) and `references/`. Project-level locations are `.agents/skills/<name>/` or `.claude/skills/<name>/`.

The CLI performs writes, checks, and generation; the Skill chooses commands, options, and order.

## Skills and the CLI

The recommended path is to open the project in a Skill-enabled Agent and let the Agent execute through Skills. The CLI is an optional fallback for automation, CI, and troubleshooting.

| Item | Skill | CLI |
| --- | --- | --- |
| Role | Workflow and judgment | Deterministic actions |
| Caller | Agent | Agent, script, CI |
| Typical use | Open the project and hand it to the Agent | Automation, CI, troubleshooting |
| Hand-written | Not applicable | Possible, not recommended as the daily entry |

## Two Skill types

Aggregate workflow Skills cover a full task flow; command-level Skills cover a single action.

| Type | Count | Responsibility | When installed |
| --- | --- | --- | --- |
| Aggregate workflow | 2 | From reading facts to acceptance closure | Installed by default on `create` and `init` |
| Command-level | 12 | Judgment and options for one command | Installed on demand with `--name` |

## Default installation policy

`create` and `init` install a single aggregate Skill by default.

| Preset | Aggregate Skill installed |
| --- | --- |
| `generic` (default) | `generic-harness` |
| `consumer-h5` | `consumer-h5-harness` |

The default targets are `.agents/skills/<name>/` and `.claude/skills/<name>/`. No `.cursor/skills` is written, because Cursor reads `.agents/skills`.

A single Skill keeps context bounded: installing everything shows the Agent OpenAPI generation, visual baseline, and other rules unrelated to the current stage. Install command-level Skills when a stage needs them.

## Built-in list

The repository root `skills/` holds 14 discoverable Skills. The npm package also carries legacy `fe-harness-*` aliases that point at the old `.fe-harness/` directory; they are outdated. This page follows the repository root `skills/`.

| Name | Type | Purpose | Installed by default |
| --- | --- | --- | --- |
| `generic-harness` | Aggregate workflow | Generic project flow: Intake, context restore, logs, acceptance closure | Yes |
| `consumer-h5-harness` | Aggregate workflow | Full Consumer H5 flow: inputs, page split, Tokens, verification, snapshot | No, only with `--preset consumer-h5` |
| `continue-harness-create` | Command-level | Create a project from zero | No |
| `continue-harness-init` | Command-level | Adopt an existing project | No |
| `continue-harness-inspect` | Command-level | Read project facts and machine-readable state | No |
| `continue-harness-plan` | Command-level | Preview `create` and `init` writes | No |
| `continue-harness-doctor` | Command-level | Read-only diagnostics | No |
| `continue-harness-verify` | Command-level | Layered verification | No |
| `continue-harness-inputs` | Command-level | Register and analyze task-specific project inputs | No |
| `continue-harness-task` | Command-level | Task IDs, history, snapshots | No |
| `continue-harness-design-tokens` | Command-level | Maintain the single Token source | No |
| `continue-harness-api` | Command-level | Select operationIds and generate types and wrappers | No |
| `continue-harness-skills` | Command-level | List and install Skills | No |
| `continue-harness-version` | Command-level | Check CLI availability and version | No |

## Skills and project constraints

`AGENTS.md` is the only project constraint body; `CLAUDE.md` and `.cursor/rules/` only adapt to a vendor and point at `AGENTS.md`. Skills define callable workflows and do not override constraints.

## Related pages

- [Install skills](/en/skills/install)
- [Execution steps](/en/skills/steps)
