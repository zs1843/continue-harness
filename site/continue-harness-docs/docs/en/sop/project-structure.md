# Project structure

The default workspace contains collaboration records, not an application layout. Existing source code, dependency files and tests keep their project-owned structure.

## Illustrative tree

This tree illustrates directory responsibilities; not every project receives every listed file or directory. The current `create` / `init` plan defines the actual write scope.

```text
.continue-harness/
  project.yaml         # project configuration and command mapping
  intake.yaml          # confirmed facts and input applicability
  inputs/
    README.md
    manifest.yaml      # input sources, versions and task references
  logs/                # execution records
AGENTS.md              # canonical constraints
CLAUDE.md              # provider entry point
.cursor/rules/
.agents/skills/              # present only when a Skill is selected
.claude/skills/              # present only when a Skill is selected
docs/
  PROJECT.md           # goals, scope and deliverables
  CURRENT_STATUS.md    # progress and next actions
  DECISIONS.md         # durable decisions
  ACCEPTANCE.md        # requirement, implementation and evidence links
  history/             # handoff snapshots
```

## Responsibilities

Inputs remain at their registered paths. Logs record execution, while history retains handoff state; neither is a second source of project requirements.

Task commands create task metadata and a requirement draft when needed. Verification writes disposable reports under `tmp/continue-harness/`; snapshots retain report copies and context under `docs/history/tasks/`.

## Application code and tests

Continue Harness does not require `src/pages`, a component directory, a programming language or a particular test runner. Confirm the project's architecture and map its own commands into verification. UI and API materials are registered only when the task depends on them.

See [Inputs](../guide/evidence.md) and [Tasks, recovery and snapshots](../guide/tasks-and-resume.md).
