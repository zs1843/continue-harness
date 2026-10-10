# Design principles

Continue Harness keeps project facts, requirements, implementation, acceptance, evidence, and handoff state linked. The Harness provides common records and gates; each project owns its business judgments, authoritative inputs, and actual check methods.

## Core and project boundaries

Core maintains configuration, Intake, input registration, task history, context recovery, verification orchestration, acceptance checks, reports, and logs. It does not define project business behavior or requirement conclusions.

Project configuration belongs to the project and records confirmed facts, relevant inputs, and checks the project actually runs. The Harness does not infer other projects' structure from one sample.

## Safe initialization

Preview the write plan before adopting an existing project. Initialization preserves existing files, including project-modified files, and creates missing files individually. A write failure or concurrent change may leave a partial result.

```bash
continue-harness init --dry-run
```

## Enable capabilities when needed

The default workflow covers project facts, inputs, tasks, logs, context recovery, and acceptance. Other inputs and checks are enabled only when relevant to the task and confirmed by the project. Optional capabilities do not alter the common closure or become universal requirements.

## Verification is evidence, not a business judgment

Reports record configured checks, outcomes, and blocking reasons. Unconfigured, failed, blocked, and passed are distinct states. A successful command does not automatically mean a requirement is complete; requirements need links to implementation items, acceptance criteria, and reviewable evidence.

## Constraints and approvals

`AGENTS.md` is the single authority for project constraints. Host entry files may point to it; Skills describe callable workflows and do not copy or override constraints.

Publishing, dependency upgrades, and public protocol changes require explicit approval.
