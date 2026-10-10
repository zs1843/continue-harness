# Architecture

Continue Harness organizes its capabilities around a project collaboration loop: confirm project facts, register applicable inputs, connect requirements to implementation and acceptance items, run project checks, preserve evidence, and prepare a recoverable handoff.

## Dependency direction

```text
CLI → Core → project configuration and evidence
Project configuration → project facts, inputs, commands, and acceptance rules
Skills → guide collaboration and invoke Harness capabilities
Tests → verify Core, CLI, and end-to-end closure
```

Core provides configuration loading, Intake, input registration, task history, context recovery, verification orchestration, acceptance gates, logs, and reports. The project owns business facts, source evidence, constraints, and actual check commands. The Harness does not infer these facts or replace human confirmation.

## Collaboration boundaries

- People confirm authoritative facts, resolve conflicts, approve scope changes, and decide deferrals.
- Agents follow project constraints, consult relevant evidence, implement work, run checks, and record handoff state.
- Core maintains links, state semantics, and traceable evidence.

## Module map

| Path | Responsibility |
| --- | --- |
| `packages/core/` | Configuration, inputs, tasks, recovery, verification, acceptance, logs, and reports |
| `packages/cli/` | Command-line entry, structured output, and plan previews |
| `profiles/`, `platforms/`, `stacks/` | Repository implementation areas, not a dynamically discovered plugin protocol |
| `templates/`, `presets/` | Constraint and collaboration records used during creation or adoption |
| `skills/` | Agent-invokable collaboration workflows |
| `schemas/` | Configuration protocol |
| `tests/` | Unit, command, and closure tests |

See the [Pilot record](../showcase/real-project-pilot.md) and repository architecture document for current implementation and limits. See [Input registration](./inputs.md) for how project inputs are selected.

The common collaboration workflow does not require one category of project material. This does not mean arbitrary project shapes can be supported by adding declarations alone. Some configuration values and diagnostic paths are fixed in the implementation; additional support requires code, tests, and documentation, and cannot be inferred from directory names.
