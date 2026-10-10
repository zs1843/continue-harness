# Architecture

## Purpose

Continue Harness maintains the chain:

```text
Requirement → implementation item → acceptance item → evidence → handoff state
```

Its common workflow confirms project facts, registers applicable inputs, records task and acceptance links, executes project-declared checks, and preserves logs and snapshots for recovery. Project facts determine which inputs and checks apply; no single input category is mandatory for every project.

The existing acceptance ledger is the relationship authority. Reports bind results to task and content fingerprints; snapshots retain reports and context. Resume restores the current task, relevant inputs, decisions, risks, logs, and next actions. This supports traceability and recovery; it does not prove business correctness or detect every change in unregistered external dependencies.

When a project has an Intake record, its state is recomputed from confirmed facts and evidence; an unconfirmed Intake blocks feature/audit verification and snapshots. Projects without an Intake record remain compatible. Active task-scoped and shared inputs must link to acceptance items. Requirement decomposition and semantic coverage still require project judgment. Verification compares relevant configuration and input fingerprints before and after execution; this is not filesystem locking.

## Core and project ownership

Core owns configuration loading, Intake state, input registration, task history, context recovery, command orchestration, acceptance closure, reports, and logs. The project owns requirements, constraints, authoritative evidence, decisions, and actual check commands.

The repository has specialized implementation areas, but they are not a dynamically discovered plugin protocol. Some configuration values and diagnostic paths remain fixed in code. They are not prerequisites for the common workflow, and arbitrary support must not be claimed without implementation and tests.

## Configuration ownership

Each target project owns `.continue-harness/project.yaml`. It records confirmed facts and maps verification modes to project-defined commands. Legacy configuration locations may be read for compatibility; new projects use the canonical location.

## Verification modes

- Quick: ordered checks with fail-fast behavior.
- Feature: configured checks plus requirement-to-acceptance closure.
- Runtime, interaction, and visual: run only when explicitly configured.
- Audit: collect all configured results and apply the acceptance closure gate.

An unconfigured check is not a pass. External conditions are recorded as blocked; unresolved acceptance or evidence links prevent a passing closure result.

## Safety model

- Initialization preflights and does not overwrite existing files.
- Plans can be inspected before mutation.
- Doctor is read-only.
- Credentials and sensitive values remain project-owned and must not enter templates, snapshots, or reports.
- Generated files are protected by managed metadata where that capability is configured.
- Publishing and remote repository operations require explicit approval.

## Agent constraint authority

`AGENTS.md` is the single project constraint authority. Provider-specific entry files may point to it; they must not duplicate or contradict it. Skills describe callable workflows and do not override project constraints.
