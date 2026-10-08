# CLI reference

| Command | Purpose | Writes files |
| --- | --- | --- |
| `version` | Print the CLI version | No |
| `create` | Create a generic or explicitly selected preset project | Yes |
| `init` | Adopt an existing project | Yes; no writes on conflict |
| `migrate` | Move `.fe-harness` to `.continue-harness` | Yes; no writes on conflict |
| `intake` | Confirm project facts and minimum evidence through multiple rounds | The answer/evidence subcommands write state |
| `plan` | Preview create or init changes | No |
| `inspect` | Read project facts and capability state | No |
| `doctor` | Run read-only diagnostics | No |
| `inputs` | Inspect, analyze, and diff evidence | Mostly read-only |
| `task` | Manage IDs, history, and snapshots | Yes |
| `resume` | Restore a collaboration handoff state | No |
| `verify` | Run configured verification modes | Reports |
| `api` | Inspect and generate from OpenAPI | Depends on subcommand |
| `design` | Inspect and discover Design Tokens | Read-only |
| `ui` | Manage UI System and UI Contract evidence | Adapter/inventory files |
| `skills` | Install Agent Skills | Yes |

## Common commands

```bash
continue-harness inspect --json
continue-harness intake inspect --json
continue-harness doctor --json
continue-harness inputs inspect --json
continue-harness task create --title "Task title" --json
continue-harness resume --json
continue-harness verify feature
```

All symbolic verification steps are resolved through `.continue-harness/project.yaml`. Use `--json` for stable Agent and CI consumption.

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

The default `generic` preset creates a technology-neutral constraint container. The Consumer H5
preset must be selected explicitly. `plan` and `--dry-run` expose file impact before writing;
real conflicts stop initialization without partial writes.

## Intake, inputs, and tasks

```bash
continue-harness intake inspect --json
continue-harness intake answer --type backend --goal "Service" --runtime "Container" --toolchain "Node.js"
continue-harness intake evidence --id api --status confirmed --source docs/api.md --version 1.0
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
continue-harness task create --title "First scoped change" --json
continue-harness task history T001 --json
continue-harness task snapshot T001 --title "First scoped change" --request "User request" --json
```

Intake records project facts before it asks for type-specific evidence. Input inspection checks
registration and hashes; analysis extracts facts and conflicts; task IDs connect inputs, changes,
reports, and snapshots.

## Verification and optional capabilities

```bash
continue-harness verify quick
continue-harness verify feature
continue-harness verify runtime
continue-harness verify interaction
continue-harness verify visual
continue-harness verify audit
continue-harness api inspect --json
continue-harness api generate --task T001 --json
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
continue-harness design tokens diff --json
```

Verification modes are mapped to project-owned commands. Visual checks without a configured
baseline remain `not_configured`; they must not be presented as passed.
