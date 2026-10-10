# Configuration and files

This page describes Harness configuration, collaboration records, and verification artifacts. See [Project structure](../sop/project-structure.md) for directory purposes.

## Project configuration

Each adopted project maintains `.continue-harness/project.yaml` at its root. The configuration records confirmed project facts, command mappings, verification modes, and optional capabilities that the project actually needs. Inputs are selected for the project and task; inapplicable input types do not need to be created.

The following minimal example uses generic mode. Empty `commands` and `verify` mean that project checks have not been registered; they do not mean verification passed. An unconfigured mode returns an unconfigured result.

```yaml
harness:
  mode: generic
  version: "0.1.0"
project:
  name: "Project name"
commands: {}
verify: {}
```

The common adoption path requires `harness.version` and `project.name`. `commands` and `verify` may be absent or empty; an unconfigured verification mode is not a pass. Once project checks are confirmed, register the actual commands and map them to verification modes. Project type, runtime, toolchain, and package-manager values are optional project facts and are not restricted to built-in specialized labels. The table describes each field; `harness.mode`, `harness.package`, `sources`, `ui`, and `facts` are optional and should be added only when relevant:

| Field | Purpose |
| --- | --- |
| `harness.mode`, `harness.package`, `harness.version` | Collaboration mode, Harness package and version; `version` is required, the rest are optional |
| `project.name` | Project name |
| `project.product_type`, `project.platforms`, `stack.adapter`, `stack.package_manager` | Optional project facts recorded as non-empty strings; Core does not restrict adoption to a fixed list of names |
| `commands` | Names and actual commands for project checks; configure when project checks are known |
| `verify` | Verification modes and command mappings; configure as needed; an unconfigured mode is not a pass |
| `sources`, `ui`, `facts` | Configure only when the project confirms the corresponding capability is needed |

Intake state is recorded in `.continue-harness/intake.yaml`; the input manifest is `.continue-harness/inputs/manifest.yaml`. These records follow confirmed project facts and do not require every project to have the same fields or input directories.

## Collaboration records

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Single authority for project constraints |
| `docs/PROJECT.md` | Project goals, scope, non-goals, and deliverables |
| `docs/CURRENT_STATUS.md` | Current status, risks, and open work |
| `docs/DECISIONS.md` | Confirmed decisions that remain in effect |
| `docs/ACCEPTANCE.md` | Acceptance items, statuses, and evidence links |
| `.continue-harness/inputs/manifest.yaml` | Input sources, applicability, versions, and links |
| `.continue-harness/logs/commands.ndjson` | Append-only log of commands and Intake actions |
| `docs/history/` | Task snapshots and recoverable handoff context |

The adoption workflow creates or reuses records according to the project’s existing state. The table describes record responsibilities, not a required complete file list. Default generated files may change with template versions; consult the current create/adoption plan for the exact scope.

## Verification artifacts

| Path | Content |
| --- | --- |
| `tmp/continue-harness/report.json` | Machine-readable report from the latest verification |
| `tmp/continue-harness/report.md` | Human-readable report from the latest verification |
| `tmp/continue-harness/logs/` | Verification command logs |

Verification runs only commands declared by the project. The Harness records results and evidence links; it does not replace project-specific judgments about correctness.

## Security boundary

Credentials, cookies, access tokens, and environment-file contents are project-private and must not be written to templates, snapshots, or reports. Automated operations must detect and preserve project-owned changes; exact write or refusal behavior is defined by each command.
