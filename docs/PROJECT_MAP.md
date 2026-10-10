# Continue Harness Project Map

## Purpose

Continue Harness provides project-neutral collaboration records, verification orchestration, traceability, and context recovery. People, agents, and automation use the same project-owned facts and acceptance evidence.

## Top-level responsibilities

| Path | Responsibility |
| --- | --- |
| `packages/core/` | Configuration, Intake, inputs, tasks, recovery, verification, acceptance, logs, and reports |
| `packages/cli/` | Command-line interface and structured output |
| `profiles/`, `platforms/`, `stacks/` | Implementation areas; not a dynamically discovered plugin protocol |
| `templates/` | Constraint and collaboration records for project adoption |
| `presets/` | Initial project record containers |
| `skills/` | Agent-callable collaboration workflows |
| `schemas/` | Public configuration protocols |
| `examples/` | Disposable integration fixtures |
| `tests/` | Unit, CLI, and workflow regression tests |
| `docs/` | Architecture, current status, roadmap, and adoption guidance |

## Dependency direction

```text
CLI → Core
Core → project configuration and evidence
Specialized paths → implementation-defined support
Examples → public CLI behavior
Tests → Core, CLI, and workflow
```

Core must not depend on a particular project’s business rules or evidence.

## Runtime and package facts

The executable package declares its runtime and package-manager requirements in its package metadata. Consult the repository package configuration for the current supported versions. Packages are not published unless a release is explicitly approved.

## Generated artifacts

Verification reports and command logs are written under `tmp/continue-harness/`. Generated files and dependencies are ignored by Git where configured. Optional generators may have their own project-owned output paths; these are not required by the common workflow.
