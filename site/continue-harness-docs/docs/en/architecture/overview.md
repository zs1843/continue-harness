# Architecture

This page covers the composition model, dependency direction, collaboration boundaries, and repository module map.

continue-harness composes target-project behavior from `Core + Profile + Platform + Stack + optional UI System + Project config`; the normative definition lives in `docs/ARCHITECTURE.md` at the repository root.

## Dependency direction

```text
CLI -> Core
Core -> configuration
Project configuration -> Profile + Platform + Stack selection
Profiles / Platforms / Stacks -> declarative descriptors
Examples -> public CLI behavior
Tests -> Core and CLI
```

Core does not import adapter modules, but it validates adapter values through configuration enums; adding an adapter requires updating both the Core enums and `schemas/project.schema.json`. The current enums cover generic / consumer-h5, node / web-mobile, and node-esm / uni-app.

## Collaboration diagram

<ZoomableImage
  src="/ai-architecture.svg"
  alt="continue-harness collaboration architecture"
  caption="Click to enlarge; while enlarged, use the wheel to zoom, drag to pan, double-click to reset, and Esc to close."
/>

The diagram shows three boundaries:

- Humans confirm authoritative facts, including business goals, visual sources, API choices, conflicts, and deferrals.
- Agents follow `AGENTS.md` and Skill workflows, read evidence by task type, and perform implementation and verification; see [Project collaboration and Agent integration](../guide/agent-workflow.md) for the constraint authority.
- Core executes generic protocols; business, API, and design facts stay with the project.

## Module map

| Path | Responsibility |
| --- | --- |
| `packages/core/` | Configuration loading, verification execution, diagnostics, reports, input analysis, resume |
| `packages/cli/` | Command line entry, JSON output, and plan previews |
| `profiles/` | Product-shape rules |
| `platforms/` | Runtime-platform rules |
| `stacks/` | Framework and toolchain rules |
| `ui-systems/` | Optional UI System Adapters |
| `templates/` | Business-neutral files created when adopting an existing project |
| `presets/` | Business-neutral project containers used when creating a project |
| `skills/` | Agent workflows |
| `schemas/` | Public configuration protocol |
| `tests/` | Core, CLI, and orchestration tests |

## Layering rationale

Product shape, runtime platform, framework toolchain, and Agent workflows change independently. Each kind of rule lives in its own directory and Core handles generic protocols only, so a product-shape change does not touch Core, a platform change does not touch a Product Profile, a toolchain change does not touch the input protocol, and a workflow change does not copy project constraints. See [Adapters](./adapters.md) for the per-layer responsibilities and `docs/ARCHITECTURE.md` for the shared safety model.
