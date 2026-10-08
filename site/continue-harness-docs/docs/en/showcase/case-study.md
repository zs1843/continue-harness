# Case study

> Basis: the `0.1.0` implementation and local verification on 2026-10-08. Full real-project Pilot records are in [Real-project Pilot](./real-project-pilot.md).

This page records how the `continue-harness` repository maintains itself with its own protocol: delivery scope, architecture tradeoffs, verification results, and open risks. The `consumer-h5`, `web-mobile`, and `uni-app` entries in the repository are specialized adapters and regression-test samples; the generic Core does not depend on them.

## Problem hypothesis

AI-assisted software projects face more than the question of whether code can be generated. Requirement and engineering evidence is scattered, different Agents read different rules, local flows are verified while critical paths are missed, generated code overwrites manual edits, and acceptance conclusions cannot be reproduced. These are the project's problem hypotheses; before-and-after data from adopted projects is not yet recorded in the repository.

The goal is one set of project facts and verification entry points for developers, CI, and Agents, while the target project owns its business, API, and design decisions. The Harness provides constraints and execution mechanics; business judgement stays in the target project.

## Scope

| Capability | Verified evidence | Boundary |
| --- | --- | --- |
| Create and adopt | `create` defaults to the generic preset and an explicit preset generates specialized files; `init` performs a full preflight and stops on conflict | Upgrade and three-way merge are not implemented |
| Diagnostics | `inspect` reads project facts; `doctor` checks environment, scripts, page registration, inputs, and Agent workflow without writing | CI-entry and sensitive-content checks are not complete |
| Verification | Six modes: `quick`, `feature`, `runtime`, `interaction`, `visual`, and `audit`, producing Markdown, JSON, and command logs | Visual acceptance requires project baselines and real flows |
| Requirement closure | Pages, states, actions, and return paths of the active PRD are recorded per item as verified, deferred, or externally blocked | Two real projects each completed one T001 Pilot covering task, inputs, logs, recovery, and acceptance protocol; deep flows of real business pages are not part of this case |
| Intake and traceability | Registration of PRD/RP/UI/API/assets; task IDs, command logs, resume state, snapshots, and acceptance records | Business evidence still has to be supplied by each target project |
| API generation | Local OpenAPI JSON generation of types and request wrappers per task, with protection for hand-edited files | Online Apifox synchronization and full OpenAPI coverage are not implemented |
| UI System | UI System protocol verified against the built-in fixture | real-project visual convergence is not verified |
| Agent collaboration | `AGENTS.md` as the single constraint source; skills loaded per task | No quantified data on cross-Agent efficiency |

Implementation entry points are `docs/PROJECT_MAP.md` and [Core](../architecture/core.md); `docs/CURRENT_STATUS.md` is the current status of record.

## Architecture

```text
Developer / CI / Agent
          ↓
        CLI ──────► Core: configuration, diagnostics, execution, reports
                      │
                      ├─ project configuration: capability selection, command mapping
                      ├─ Profile: product-shape checks
                      ├─ Platform: runtime acceptance
                      ├─ Stack: framework and toolchain rules
                      └─ optional UI System: component semantics and token mapping
```

Core understands only the generic protocol and imports no Profile, Platform, Stack, or business project. Requirement closure for a consumer H5, runtime checks for mobile web, and page registration for uni-app can therefore evolve separately; the cost is more protocol and configuration layers and clear boundaries for early projects. [Architecture](../architecture/overview.md) documents the dependency direction.

### Design tradeoffs

1. **Project facts stay in the project.** `.continue-harness/project.yaml` selects verification commands and adapters; PRD, UI, API, and tokens are stored by the target project. The Harness is reusable, and it must handle missing inputs, conflicts, and version traceability.
2. **Preview before writing.** `create/init` provides a plan or dry run, and initialization of an existing project checks every target file and stops on conflict. This protects existing projects; merge patches are not generated.
3. **"Done" has a checkable definition.** `feature/audit` does not treat a successful build as requirement completion; every coverage row of the active PRD needs a verification result or an explicit reason. This blocks obvious omissions, while coverage quality still depends on input analysis and human confirmation.

## Workflow

The default path is `create/init → inputs → task → verify`. The full workflow diagram is in [Workflow](/en/guide/overview). UI System, Design Token, and OpenAPI capabilities are enabled per task.

## Verification results

- On 2026-10-08 at the repository root, `node packages/cli/bin/continue-harness.mjs version` printed `0.1.0`; the `pnpm test` result is in [Real-project Pilot](./real-project-pilot.md).
- Automated tests cover configuration, the CLI, Doctor, initialization conflict protection, OpenAPI generation protection, requirement closure, and two fixtures with different flow shapes.
- The repository contains a minimal uni-app H5 integration sample and a Playwright runtime check; the documentation site builds statically.
- Two real projects each completed one T001 Pilot covering Intake, input registration, tasks, logs, context recovery, acceptance, and handoff.

These results are limited to the T001 engineering gates and the input protocol; delivery speed, visual fidelity, and Agent cost have no data yet. Capability boundaries are in [Real-project Pilot](./real-project-pilot.md).

## Open risks

| Risk or gap | Next verification step |
| --- | --- |
| Input analysis is heuristic; PDFs, images, and complex RP documents need extra interpretation | Collect misreads and manual corrections from the real Pilots |
| UI System and visual-flow outcomes are not yet recorded | Add first/final screenshot differences, iteration counts, and manual adjustment counts |
| Local OpenAPI export does not cover complex specifications | Collect operations that cannot be generated and the manual additions needed |
| Business permission, API, visual, and deployment acceptance in real projects still needs per-task evidence | Register the matching inputs in later tasks and reuse the same task and verification flow |

The next step is to add PRD/UI evidence and runtime verification records for the real projects, then derive generic checks from the new evidence. Whether to extend the Merchant H5, Admin Web, or other profiles depends on unrelated project needs and verification results. See `docs/ROADMAP.md` in the repository.
