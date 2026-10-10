# Adopt an existing project

When adopting an existing project, inspect its current state and target files before deciding which Harness records to add. The recommended entry point is the `continue-harness-init` Skill; the CLI is optional.

## Preview and write

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

The plan identifies files to create, unchanged managed files, and project-modified files:

| Status | Meaning | Adoption behavior |
| --- | --- | --- |
| `create` | Target does not exist | Create the file |
| `managed_unchanged` | Target matches the template | Preserve without rewriting |
| `project_owned_modified` | The project has modified the target | Preserve without overwriting; other missing files can still be created |

Adoption is not an all-or-nothing transaction. A write error or concurrent change may leave a partial result. Doctor performs read-only checks of the current configuration and enabled capabilities.

## Incremental adoption

1. Confirm project constraints, goals, and owners.
2. Reuse existing project documents and evidence; register their sources and applicability.
3. Confirm tasks and acceptance criteria, then map the checks the project actually runs.
4. Execute configured checks and review reports and unresolved items.
5. Save recoverable context and handoff actions.

Enable optional capabilities only when confirmed requirements and acceptance criteria need them. Adoption does not replace existing project workflows or rewrite existing materials automatically.
