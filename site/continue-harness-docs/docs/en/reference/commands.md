# CLI reference

| Command | Purpose | Writes files |
| --- | --- | --- |
| `version` | Print the CLI version | No |
| `create` | Create a `consumer-h5` project | Yes |
| `init` | Adopt an existing project | Yes; no writes on conflict |
| `migrate` | Move `.fe-harness` to `.continue-harness` | Yes; no writes on conflict |
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
continue-harness doctor --json
continue-harness inputs inspect --json
continue-harness task create --title "Task title" --json
continue-harness resume --json
continue-harness verify feature
```

All symbolic verification steps are resolved through `.continue-harness/project.yaml`. Use `--json` for stable Agent and CI consumption.
