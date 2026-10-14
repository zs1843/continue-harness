# CLI

This page is a CLI reference for maintainers who need direct operation, automation, or troubleshooting. For routine use, start with [Get started](/en/guide/getting-started); when a relevant operation Skill is installed, an Agent can invoke the capability through it.

## Commands

| Command | Purpose | When to use | Writes files | Skill |
| --- | --- | --- | --- | --- |
| `version` | Print the CLI version | Check tool availability | No | `continue-harness-version` |
| `create` | Create a generic or explicitly selected preset project | Start a new project | Yes | `continue-harness-create` |
| `init` | Adopt an existing project | Preserve project changes and add missing Harness files | Yes; creates missing files individually without overwriting existing files | `continue-harness-init` |
| `migrate` | Move `.fe-harness` to `.continue-harness` | Upgrade an existing state directory | Yes; no writes on conflict | CLI only |
| `intake` | Confirm project facts and candidate evidence items in rounds | Project facts or evidence applicability is not settled | `inspect` creates `.continue-harness/intake.yaml` when absent and otherwise reads it; `answer` and `evidence` write it and append `.continue-harness/logs/commands.ndjson` | Part of `create` / `init`; no standalone Skill |
| `plan` | Print a structured create/init plan | Preview before writing | No | `continue-harness-plan` |
| `inspect` | Read project facts and capability state | Before an Agent starts a task | No | `continue-harness-inspect` |
| `doctor` | Run read-only diagnostics | Check config, scripts, inputs, Tokens, Agent readiness | No | `continue-harness-doctor` |
| `inputs` | Inspect, analyze, and diff evidence | After PRD/RP/UI/API/assets arrive | Mostly read-only | `continue-harness-inputs` |
| `task` | Manage IDs, history, and snapshots | Start and completion of work | Yes | `continue-harness-task` |
| `resume` | Restore collaboration context | New Agent, new session, or interrupted task | No | `continue-harness-task` |
| `verify` | Run configured verification modes | After implementation or before delivery | Reports, verification logs, and an attempted append to `.continue-harness/logs/commands.ndjson` | `continue-harness-verify` |
| `api` | Inspect and generate from OpenAPI | API tasks | `inspect` read-only, `generate` writes generated files | `continue-harness-api` |
| `design` | Inspect, discover, and diff Design Tokens | UI tasks or existing-project adoption | Read-only | `continue-harness-design-tokens` |
| `ui` | Manage UI System and UI Contract evidence | Choosing a component system or inventorying components | `install` and `inventory --write` write adapter or inventory files | CLI only |
| `skills` | Install Agent operation Skills | Invoke a capability needed at the current stage | `install` writes Skill files | `continue-harness-skills` |

## Common commands

The CLI is a direct operation interface. An Agent can also invoke it through a relevant operation Skill when available.

```bash
continue-harness create <name> --output <directory>
continue-harness init --dry-run
continue-harness inputs inspect --json
continue-harness task create --title "Task title"
continue-harness verify feature
```

## Create and adopt

```bash
continue-harness plan create my-project --json
continue-harness create my-project
continue-harness create my-project --skip-install
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
```

`plan` and `--dry-run` expose file impact before writing. `init` creates only missing files and does not overwrite existing files, including project-modified files. A project modification therefore does not prevent all missing files from being added. A write error or concurrent change may leave a partial result; the operation does not provide transactional rollback.

## Intake and inputs

`intake` records project facts in rounds: confirm project goals, boundaries, and known constraints first, then determine applicable inputs from project facts and task scope. The current CLI offers candidate questions for several common project types; these are question sets, not toolchain restrictions. Unmatched types use the general candidate set, and requirements are the only universally required evidence item in Intake.

```bash
continue-harness intake inspect --json
continue-harness intake answer --type <frontend|backend|client|data|infrastructure|mixed> --goal "<confirmed goal>" --runtime "<confirmed runtime>" --toolchain "<confirmed toolchain>"
continue-harness intake evidence --id <input-id> --status confirmed --source <source-path> --version <version>
```

`inputs` checks registration and file drift:

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
```

`inspect` compares the input directory with `manifest.yaml`; `analyze` extracts text clues and same-key conflicts; `diff` currently reuses the `inspect` result. File drift checks require a registered `sha256` and do not compare historical analysis conclusions.

## Tasks

```bash
continue-harness task create --title "First scoped change" --json
continue-harness task inspect T001 --json
continue-harness task history T001 --json
continue-harness task snapshot T001 --title "First scoped change" --request "User request" --json
```

The task ID is a stable identity. Collaborators link requirements and implementation through the input manifest, acceptance ledger, and optional API selection record. Harness does not automatically insert IDs into PRD/RP content, operationIds, or implementation files. Verification reports and snapshots retain the selected task ID.

## Verification

```bash
continue-harness verify feature
```

`verify` documents six common modes and also accepts other mode names defined in project configuration; their definitions and gate behavior are in [Verification modes](./verification-modes.md). A mode maps to entries in `commands` through `verify` in `.continue-harness/project.yaml`; the CLI embeds no test commands of its own.

## Diagnostics

```bash
continue-harness inspect --json
continue-harness doctor
continue-harness doctor --json
```

## Resume

```bash
continue-harness resume
continue-harness resume --task T001 --json
```

`resume` read-only summarizes the current task, input state, latest snapshot, coverage matrix, durable decisions, Git changes, and next actions.

## OpenAPI

```bash
continue-harness api inspect --task T001 --json
continue-harness api generate --task T001 --dry-run
continue-harness api generate --task T001
```

Run `inspect` and `--dry-run` before generation to review scope and conflicts; the CLI does not require records of these prior invocations. The PRD selects operationIds, the OpenAPI JSON supplies the field contract, and business mapping stays outside the generated layer.

## Design Tokens

```bash
continue-harness design tokens inspect --json
continue-harness design tokens discover --json
continue-harness design tokens diff --json
```

`inspect` checks the single source of truth and Token status; `discover` read-only scans style files under `src/` and prints candidates; `diff` currently reuses the `inspect` result and does not compare versions; collaborators must perform that comparison separately.

## UI System

```bash
continue-harness ui systems list --json
continue-harness ui systems install <extension-id> --dry-run --json
continue-harness ui systems install <extension-id>
```

```bash
continue-harness ui contract inspect --json
continue-harness ui contract inventory --write --json
```

Adapter installation writes evidence files only. It adds no production UI dependency and decides no Token value.

## Skills

```bash
continue-harness skills list --json
continue-harness skills install --global --provider claude --name continue-harness-init --target ~/.claude/skills
continue-harness skills install --project --name continue-harness-api --force
```

`--provider` defaults to `codex`; `all` syncs Codex, Claude Code, and Cursor. Project-level Codex and Cursor share `.agents/skills`, while Claude Code uses `.claude/skills`. `--target` sets the install directory and cannot be combined with `--provider all`; an existing target is skipped unless `--force` is given.

## Boundaries

Inspect an extension's status and plan before installing it; specialized capabilities are not part of the default project configuration. `skills install --global` and `--force` overwriting an existing Skill are confirmation-required actions.
