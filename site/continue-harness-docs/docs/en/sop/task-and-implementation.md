# Task and implementation

This page covers task ID creation, the evidence scope read per task type, and implementation boundaries. For command options see [CLI](../reference/commands.md).

## Create a task

Create a task ID with the `task` Skill.

**Skill**: `continue-harness-task`

**CLI (optional)**:

```bash
continue-harness task create --title "Task title" --json
```

Task IDs usually look like `T001`. As applicable to the task, the ID connects:

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

Preserve existing module boundaries. For a new project, decide source and test layout after confirming the toolchain. Harness does not prescribe page, component, service or state directories; acceptance records reference actual implementation files.

## Limits

`task snapshot` fails before writing when `docs/ACCEPTANCE.md` is missing, contains a table without a status column, or has unresolved rows. Input status, Intake, and the current verification report must also meet their gates; see [Verification and snapshots](./verification-and-snapshot.md) for the full requirements.
