# Configuration and files

## Project configuration

Every target project owns:

```text
.continue-harness/project.yaml
```

The file selects `product_type`, platforms, stack, project facts, named commands, and verification modes. The repository's configuration describes the harness itself and is not copied as a target project's business rules.

## Durable project state

| Path | Purpose |
| --- | --- |
| `.continue-harness/inputs/` | Registered PRD/RP/UI/API/assets evidence |
| `.continue-harness/api/selection.yaml` | Task-scoped operationId selection |
| `.continue-harness/models/` | Page Flow and Layout Spec models |
| `.continue-harness/ui/adjustments.yaml` | Structured visual adjustments |
| `docs/history/` | PRD and implementation history |
| `docs/IMPLEMENTATION_COVERAGE.md` | Requirement closure |
| `tmp/continue-harness/` | Verification reports and logs |

Generated artifacts and dependency directories are ignored by Git. Secrets remain project-owned and must not enter templates, snapshots, or reports.
