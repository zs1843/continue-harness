# Architecture overview

continue-harness composes target-project behavior from:

```text
Core
  + Product Profile
  + Platform Adapter
  + Stack Adapter
  + optional UI System Adapter
  + project-owned configuration
```

## Dependency direction

```text
CLI → Core
Core → configuration only
Project configuration → Profile + Platform + Stack selection
Profiles / Platforms / Stacks → declarative descriptors
Examples → public CLI behavior
Tests → Core and CLI
```

Core does not import a profile, platform, stack, example, or target project. This is the boundary that keeps generic collaboration capabilities independent from product rules.

## Repository map

| Path | Responsibility |
| --- | --- |
| `packages/core/` | Configuration, diagnostics, input analysis, execution, reports, resume |
| `packages/cli/` | Public command line and JSON protocol |
| `profiles/` | Product-shape verification descriptors |
| `platforms/` | Runtime and acceptance descriptors |
| `stacks/` | Framework and toolchain descriptors |
| `ui-systems/` | Optional UI System adapters |
| `templates/` | Business-neutral files for existing projects |
| `presets/` | New-project containers |
| `skills/` | Agent workflows |
| `schemas/` | Public configuration protocol |
| `tests/` | Core, CLI, and orchestration tests |

## Safety boundaries

Initialization supports dry-run and preflights every target before writing. Doctor is read-only. Credentials remain project-owned. API generation is task-scoped and protects manually changed generated files. Publishing and remote operations require explicit approval.
