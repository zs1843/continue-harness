# Roadmap

## Current focus: reliable requirement closure

The active focus is the complete, recoverable chain:

```text
Project facts → applicable inputs → requirements → implementation → acceptance → evidence → handoff
```

Priorities:

- Keep Intake limited to facts that affect project constraints and task execution.
- Select inputs from confirmed project type, scope, and evidence; record non-applicability and unknowns explicitly.
- Preserve stable links among inputs, tasks, implementation records, acceptance items, and verification evidence.
- Ensure reports and snapshots restore the actual result, outstanding risks, and next action.
- Strengthen negative tests so missing, stale, conflicting, or changing evidence cannot produce a false pass.
- Validate the same workflow in projects with different structures and independently declared checks.

## Deferred

Do not expand specialized profiles, adapters, starter content, or optional governance features until pilot evidence shows a concrete need. Existing specialized code is not a requirement for the common workflow and should not shape default project creation.

## Completion evidence

A capability is considered established only when implementation, regression tests, Site guidance, and reproducible evidence agree. Pilot outcomes must be reported as observed, including failures and unverified areas; passing command execution alone does not establish requirement acceptance.
