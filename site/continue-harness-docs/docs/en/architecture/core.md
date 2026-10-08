# Core

Core lives in `packages/core/` and is the business-neutral runtime of the harness. This page lists its capabilities, boundary, configuration interface, and internal modules.

## Capabilities

| Capability | Mechanism |
| --- | --- |
| Configuration loading | Reads `.continue-harness/project.yaml`, parses project, platform, stack, facts, and command mappings, and validates declared values |
| Verification execution | Maps symbolic commands such as `unit_test` and `coverage_closure` to real shell commands and runs them in fail-fast or audit mode |
| Diagnostics | Doctor performs read-only checks on Node, pnpm, scripts, page registration, inputs, Tokens, and Agent workflows |
| Reports | Writes Markdown, JSON, and command logs |
| Input analysis | Reads the manifest, finds unregistered inputs, extracts text facts, and reports conflicts |
| resume | Summarizes the current task, input states, latest snapshot, coverage matrix, persistent decisions, and Git changes |

## Boundary

Core does not import adapter modules, but it validates adapter values through configuration enums; adding an adapter requires updating both the Core enums and `schemas/project.schema.json`. The current enums cover generic / consumer-h5, node / web-mobile, and node-esm / uni-app.

Core contains no business pages, business states, API endpoints, brand names, Design Token values, or concrete UI component library implementations. Core can tell that a project declares an API snapshot, but not which business endpoint it is; it can tell that a page registration is missing, but not which cards the page should contain.

## Configuration interface

Core works through project configuration:

```yaml
project:
  product_type: generic
verify:
  feature:
    commands:
      - unit_test
      - acceptance
```

The project declares its own facts and verification commands; when product, platform, or framework-specific checks are needed, the project configuration selects the corresponding adapter.

## Modules

| File | Responsibility |
| --- | --- |
| `config.mjs` | Project configuration loading and validation |
| `runner.mjs` | Command execution, fail-fast, status normalization |
| `doctor.mjs` | Read-only diagnostics |
| `init.mjs` | Initialization and creation plans, safe writes |
| `intake.mjs` | Multi-round project fact confirmation and minimum input checklist |
| `inputs.mjs` | Input manifest, discovery, and analysis |
| `resume.mjs` | Collaboration-context recovery |
| `acceptance.mjs` | Acceptance state inspection |
| `openapi.mjs` | OpenAPI operation checks, type and wrapper generation |
| `design.mjs` | Design Token inspect, discover, diff |
| `ui-system.mjs` | UI System Adapter and protocol file checks |
| `ui-contract.mjs` | UI component inventory scan and Contract file checks |
| `history.mjs` | Task history and snapshots |
| `report.mjs` | Report and log output |
