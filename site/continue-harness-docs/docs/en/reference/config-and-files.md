# Configuration and files

This page describes the keys of `.continue-harness/project.yaml` and the report and artifact paths the CLI writes. The directory tree is in [Project structure](../sop/project-structure.md).

## Project configuration

Every target project owns one configuration file at its root:

```text
.continue-harness/project.yaml
```

## Shared keys

These keys are available in every preset:

| Key | Meaning |
| --- | --- |
| `harness.package`, `harness.version` | Harness package and version declared by the project |
| `project.name` | Project name |
| `project.product_type` | `generic`, `consumer_h5`, or `developer_tooling` |
| `commands` | Named command map; values are actual shell commands |
| `verify` | Mode-to-command-name map; an unconfigured mode is written as `status: not_configured` |
| `sources.api` (optional) | API evidence source: `provider: openapi` and a `snapshot` path |
| `ui.system` (optional) | UI System selection: `status`, `adapter`, `policy`, `version` |

The Generic preset adds `harness.mode: generic` and an `intake` block. The block records `phase`, `status`, and `state`, where `state` points to the state file:

```text
.continue-harness/intake.yaml
```

The Consumer H5 preset adds these on top of the shared keys:

| Key | Meaning |
| --- | --- |
| `project.platforms` | Runtime platform, for example `web_mobile` |
| `stack.adapter`, `stack.framework`, `stack.language`, `stack.bundler`, `stack.package_manager` | Framework and toolchain selection |
| `facts.agent_entry` and related keys | Paths to the Agent entry, module map, design facts, Tokens, history, and coverage matrix |

The Generic preset configuration carries none of `project.platforms`, `stack`, or `facts`. The API configuration key is `sources.api` and the UI configuration key is `ui.system`.

## Key fact files

| File | Generic preset | Consumer H5 preset | Purpose |
| --- | --- | --- | --- |
| `AGENTS.md` | Generated | Generated | Single canonical constraint source |
| `docs/PROJECT.md` | Generated | Not generated | Project goal, scope, non-goals, and deliverables |
| `docs/PROJECT_MAP.md` | Not generated | Generated | Module map |
| `docs/PRODUCT.md` | Not generated | Generated | Product facts |
| `docs/DESIGN.md` | Not generated | Generated | Design facts |
| `docs/CURRENT_STATUS.md` | Generated | Generated | Current status and limits |
| `docs/DECISIONS.md` | Generated | Generated | Long-term decisions |
| `docs/IMPLEMENTATION_COVERAGE.md` | Not generated | Generated | Requirement coverage matrix |
| `docs/ACCEPTANCE.md` | Generated | Not generated | Acceptance gate source for `verify feature` and `verify audit`; with a bound task, a missing file, no table, a missing status column, or unresolved rows all fail |
| `.continue-harness/inputs/manifest.yaml` | Generated | Generated | Input registration manifest |

The Generic preset ships `.continue-harness/intake.yaml`; the Consumer H5 preset does not, and the file appears only after `intake answer` or `intake evidence`.

## Artifact paths

| Path | Content |
| --- | --- |
| `tmp/continue-harness/report.json` | Machine-readable report of the latest verification |
| `tmp/continue-harness/report.md` | Markdown report of the latest verification |
| `tmp/continue-harness/logs/` | Per-command verification logs |
| `.continue-harness/logs/commands.ndjson` | Append-only log of commands and Intake actions |
| `src/types/api.generated.ts` | Generated API types |
| `src/services/api.generated.ts` | Generated API wrappers |
| `.continue-harness/api/generated.json` | Managed metadata for generated artifacts |

`tmp/continue-harness/` is Git-ignored and can serve as a local debugging and CI artifact. Generated interface files carry managed metadata, and regeneration after a manual edit is refused.

## Boundaries

Secrets, Cookies, Access Tokens, and `.env` contents stay project-owned and never enter templates, snapshots, or reports. `verify` runs only the commands listed in the configuration and infers no package manager or test runner.
