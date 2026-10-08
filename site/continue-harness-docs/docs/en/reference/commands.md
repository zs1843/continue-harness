# CLI

This page is the authoritative list of CLI commands, subcommands, options, and file writes, for Agents, CI, and troubleshooting. The CLI is an optional entry point: every example below is optional and runs through the matching Skill in the Commands table by default. For routine adoption, start with [Project adoption](/en/guide/ai-first).

## Commands

| Command | Purpose | When to use | Writes files | Skill |
| --- | --- | --- | --- | --- |
| `version` | Print the CLI version | Check tool availability | No | `continue-harness-version` |
| `create` | Create a generic or explicitly selected preset project | Start a new project | Yes | `continue-harness-create` |
| `init` | Adopt an existing project | Add Harness files to an existing project | Yes; no writes on conflict | `continue-harness-init` |
| `migrate` | Move `.fe-harness` to `.continue-harness` | Upgrade an existing state directory | Yes; no writes on conflict | CLI only |
| `intake` | Confirm project facts and the minimum evidence list in rounds | Project type or evidence scope is not settled | `inspect` read-only; `answer` and `evidence` write `.continue-harness/intake.yaml` | `generic-harness` (`consumer-h5-harness` in a consumer-h5 project) |
| `plan` | Print a structured create/init plan | Preview before writing | No | `continue-harness-plan` |
| `inspect` | Read project facts and capability state | Before an Agent starts a task | No | `continue-harness-inspect` |
| `doctor` | Run read-only diagnostics | Check config, scripts, inputs, Tokens, Agent readiness | No | `continue-harness-doctor` |
| `inputs` | Inspect, analyze, and diff evidence | After PRD/RP/UI/API/assets arrive | Mostly read-only | `continue-harness-inputs` |
| `task` | Manage IDs, history, and snapshots | Start and completion of work | Yes | `continue-harness-task` |
| `resume` | Restore a collaboration handoff state | New Agent, new session, or interrupted task | No | `generic-harness` (`consumer-h5-harness` in a consumer-h5 project) |
| `verify` | Run configured verification modes | After implementation or before delivery | Reports | `continue-harness-verify` |
| `api` | Inspect and generate from OpenAPI | API tasks | `inspect` read-only, `generate` writes generated files | `continue-harness-api` |
| `design` | Inspect, discover, and diff Design Tokens | UI tasks or existing-project adoption | Read-only | `continue-harness-design-tokens` |
| `ui` | Manage UI System and UI Contract evidence | Choosing a component system or inventorying components | `install` and `inventory --write` write adapter or inventory files | CLI only |
| `skills` | Install Agent Skills | Complete Codex/Claude/Cursor workflows | `install` writes Skill files | `continue-harness-skills` |

## Common commands

The CLI is an optional entry point; the matching Skill runs these steps by default.

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
continue-harness create my-project --preset consumer-h5
continue-harness create my-project --skip-install
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
```

`plan` and `--dry-run` expose file impact before writing. When a real conflict exists in an existing project, `init` writes nothing.

## Intake and inputs

`intake` records project facts in two rounds: basic information first, then a minimum evidence list generated from the project type.

```bash
continue-harness intake inspect --json
continue-harness intake answer --type frontend --goal "Member center" --runtime "Mobile WebView" --toolchain "uni-app + Vue 3"
continue-harness intake evidence --id api --status confirmed --source docs/api.md --version 1.0
```

`inputs` checks registration and file drift:

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
```

`inspect` compares the input directory with `manifest.yaml`, `analyze` extracts evidence conclusions and same-key conflicts, and `diff` reports whether earlier conclusions still apply after an input change.

## Tasks

```bash
continue-harness task create --title "First scoped change" --json
continue-harness task inspect T001 --json
continue-harness task history T001 --json
continue-harness task snapshot T001 --title "First scoped change" --request "User request" --json
```

The task ID is a stable identity that connects PRD/RP excerpts, operationIds, implementation files, verification reports, and snapshots to the same task number.

## Verification

```bash
continue-harness verify feature
```

`verify` accepts six mode names; their definitions and gate behavior are in [Verification modes](./verification-modes.md). A mode maps to entries in `commands` through `verify` in `.continue-harness/project.yaml`; the CLI embeds no test commands of its own.

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

Generation requires `inspect` and `--dry-run` first. The PRD selects operationIds, the OpenAPI JSON supplies the field contract, and business mapping stays outside the generated layer.

## Design Tokens

```bash
continue-harness design tokens inspect --json
continue-harness design tokens discover --json
continue-harness design tokens diff --json
```

`inspect` checks the single source of truth and Token status; `discover` read-only scans style files under `src/` and prints candidates; `diff` is read-only and reports differences only when the project supplies before/after versions.

## UI System

```bash
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
continue-harness ui systems install tdesign-uniapp
```

```bash
continue-harness ui contract inspect --json
continue-harness ui contract inventory --write --json
```

Adapter installation writes evidence files only. It adds no production UI dependency and decides no Token value.

## Skills

```bash
continue-harness skills list --json
continue-harness skills install --project --name consumer-h5-harness
continue-harness skills install --project --provider all --name consumer-h5-harness
continue-harness skills install --global --provider claude --name continue-harness-init --target ~/.claude/skills
continue-harness skills install --project --name continue-harness-api --force
```

`--provider` defaults to `codex`; `all` syncs Codex, Claude Code, and Cursor. Project-level Codex and Cursor share `.agents/skills`, while Claude Code uses `.claude/skills`. `--target` sets the install directory and cannot be combined with `--provider all`; an existing target is skipped unless `--force` is given.

## Boundaries

The adapter installed by `ui systems install tdesign-uniapp` is marked `status: experimental` in `ui-systems/tdesign-uniapp/adapter.yaml`. `skills install --global` and `--force` overwriting an existing Skill are confirmation-required actions.
