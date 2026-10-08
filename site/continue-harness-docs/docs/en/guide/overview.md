# Workflow overview

The shortest continue-harness loop is:

```text
create / init → inspect → intake (when applicable) → inputs → task → implement → resume → verify → snapshot
```

Each step reads or produces a durable project fact. The harness does not make business decisions for an Agent; it keeps Agents working from the same constraints and evidence.

## Two entry points

| Scenario | Entry point | Result |
| --- | --- | --- |
| New project | `continue-harness create <name>` | A business-neutral project container and verification foundation |
| Existing project | `continue-harness init --dry-run` | A preview of constraints, inputs, history, and report files to add |

## Recommended path

```bash
continue-harness inspect --json
continue-harness intake inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "Task title" --json
continue-harness resume --json
continue-harness verify feature
continue-harness task snapshot T001 --title "Task title" --request "The user request" --json
```

`inspect` confirms project facts, `inputs` confirms evidence, `task` establishes a stable ID, `resume` restores the collaboration state, and `verify` plus `snapshot` leave reviewable results.

## Load capabilities by evidence

The default workflow covers project inspection, inputs, tasks, and verification. Load deeper capabilities only when needed:

- API work: an OpenAPI snapshot, operation selection, and managed-file protection.
- UI work: Design Tokens, UI Contract, UI System, and visual verification.
- Architecture work: `ARCHITECTURE.md`, `DECISIONS.md`, and relevant history.
