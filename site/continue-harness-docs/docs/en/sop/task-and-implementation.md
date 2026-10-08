# Task and implementation

This page covers task ID creation, the evidence scope read per task type, and implementation boundaries. For command options see [CLI](../reference/commands.md).

## Create a task

Create a task ID with the `task` Skill.

**Skill**: `continue-harness-task`

**CLI (optional)**:

```bash
continue-harness task create --title "Task title" --json
```

Task IDs usually look like `T001`. The ID connects the following to the same task number:

- PRD/RP excerpts.
- API operationId selections.
- Implementation files.
- Verification results.
- Snapshots and history.

## Reading evidence by task type

| Task type | Read |
| --- | --- |
| Business implementation | manifest, PRODUCT, PRD/RP |
| UI adjustment | DESIGN, Design Tokens, UI input, visual adjustment records |
| API integration | API input, OpenAPI snapshot, selection.yaml |
| Architecture decision | DECISIONS, ARCHITECTURE, related history |

## Evidence scope

Load only the evidence that matches the current task type. Reading everything pulls unrelated material into context, for example old visual adjustment records in an API task, or a UI adjustment pushed into the interface generation flow.

## Directory ownership

Boundaries suggested by the Consumer H5 preset:

- Pages live in `src/pages/`, one directory per distinct page.
- Components live in `src/components/`.
- Request wrappers live in `src/services/`.
- Business data mapping lives in `src/repositories/`.
- Cross-page pure functions live in `src/utils/`.
- State management lives in `src/stores/`.

These directories give pages, components, interfaces, state, and utilities a defined owner.

## Limits

`task snapshot` fails before writing when `docs/ACCEPTANCE.md` is missing, contains a table without a status column, or has unresolved rows. Snapshots require closed acceptance.
