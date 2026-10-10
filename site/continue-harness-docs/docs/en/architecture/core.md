# Core

Core implements the shared, business-agnostic collaboration workflow in `packages/core/`. It maintains collaboration records and evaluates project-declared checks; it does not own a project's business rules.

## Capabilities

| Capability | Responsibility |
| --- | --- |
| Configuration | Reads project facts, command mappings, and verification policy |
| Intake | Records confirmed facts, unknowns, and applicable input needs |
| Inputs | Maintains source registration, applicability, and task links |
| Tasks and history | Tracks stable task identifiers, snapshots, and changes |
| Context recovery | Summarizes current work, evidence, decisions, risks, and next steps |
| Verification | Runs only project-declared checks and normalizes outcomes |
| Acceptance | Checks requirement-to-acceptance links and unresolved states |
| Reports and logs | Produces structured results and append-only operation records |

## Boundary

Core does not define project business rules, requirements, domain states, or actual verification commands. Those remain project-owned. The common configuration accepts project-defined product types, runtimes, toolchains, and package managers rather than requiring built-in specialized labels. Doctor runs structural checks only for explicitly configured specialized capabilities; unsupported specialized diagnostics remain unconfigured and do not invalidate general adoption.

Configuration expresses project facts and maps verification modes to commands. For example:

```yaml
commands:
  check: "<project-defined check command>"
verify:
  quick:
    commands:
      - check
```

This is schematic; each project supplies its actual commands and evidence sources.

## Modules

| File | Responsibility |
| --- | --- |
| `config.mjs` | Configuration loading and validation |
| `runner.mjs` | Command execution and result normalization |
| `doctor.mjs` | Read-only diagnostics |
| `init.mjs` | Initialization plans and safe writes |
| `intake.mjs` | Project fact confirmation |
| `inputs.mjs` | Input registration, discovery, and analysis |
| `resume.mjs` | Collaboration-context recovery |
| `acceptance.mjs` | Acceptance-state checks |
| `history.mjs` | Task history and snapshots |
| `report.mjs` | Reports and logs |
