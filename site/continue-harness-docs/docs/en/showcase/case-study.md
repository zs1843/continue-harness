# Case study

The harness repository maintains itself through the same protocol exposed to target projects:

```text
Developer / CI / Agent
          ↓
        CLI → Core → configuration and adapters
```

The repository uses `developer_tooling + node + node-esm` internally. The repository contains
`consumer-h5`, `web-mobile`, and `uni-app` as specialized adapter and regression-test samples;
they are not required by the generic Core and do not define its technology boundary.

The first two real-project Pilots are now recorded in [Real-project Pilot verification](./real-project-pilot.md). Their T001 engineering audits pass, while business permissions, APIs, visual acceptance, and deployment evidence remain task-specific; Pilot completion is not product completion.

## Scope and evidence

| Capability | Verified evidence | Boundary |
| --- | --- | --- |
| Create and adopt | `create` defaults to the generic preset; an explicit preset creates specialized files; `init` performs a preflight and stops on conflict | Upgrade and three-way merge are not implemented |
| Diagnostics | `inspect` reads project facts; `doctor` checks environment, scripts, inputs, and Agent readiness without writing | CI-entry and sensitive-content checks are not complete |
| Verification and reports | `quick`, `feature`, `runtime`, `interaction`, `visual`, and `audit` produce Markdown, JSON, and command logs | Visual acceptance requires project baselines and real flows |
| Intake and traceability | Intake, input registration, task IDs, logs, resume state, snapshots, and acceptance records | Business evidence still has to be supplied by each target project |
| API and UI evidence | Local OpenAPI generation, Design Token inspection, UI Contract, and UI System evidence | Online provider synchronization and every OpenAPI/UI-system variant are not implemented |

## Workflow

```text
create or adopt a project
  → confirm project facts and register PRD / RP / UI / API / assets
  → analyze conflicts and create a stable task ID
  → implement against the selected evidence
  → run the matching verification mode
  → save reports, coverage conclusions, and a task snapshot
```

This makes the basis for a change, the change itself, and its completion evidence traceable. The
generic path stays small; API, UI, Token, and visual capabilities enter when the task evidence
requires them.

## Current validation

- The repository test suite passes 70/70 tests.
- The Site builds successfully with VitePress.
- Two real projects completed Intake, evidence registration, task creation, logs, context recovery,
  acceptance, audit, and handoff through the same generic protocol.

These results establish automated regression protection and a reproducible collaboration loop. They
do not quantify delivery speed, rework, visual fidelity, or Agent cost, and they do not replace
product-owner decisions about business, permissions, APIs, release, or deployment.

## Remaining risks

- Input analysis remains heuristic for PDFs, images, and complex RP documents.
- UI-system and visual-flow outcomes need more real-project evidence.
- Local OpenAPI exports do not cover every complex specification.
- Business permission, API, visual, and deployment acceptance must be added per task.
