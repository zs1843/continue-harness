# CLI

The CLI lives in `packages/cli/` and is the shared entry point for developers, CI, and Agents. This page covers the default path, on-demand commands, JSON output, and command boundaries.

## Relation to Skills

The CLI is the underlying execution entry point for Skills: day-to-day work calls a Skill, while the CLI serves automation, CI, and troubleshooting. See the [CLI reference](../reference/commands.md) for the full command-to-Skill mapping.

## Default path

The main help shows only `create/init → intake → inputs → task → verify`; the other commands stay on demand, so new users do not assume they must understand every capability at once.

| Command | Purpose |
| --- | --- |
| `create` | Creates a generic project or a project from a named preset |
| `init` | Adopts an existing project, creating missing files only |
| `migrate` | Migrates the legacy `.fe-harness` state directory to `.continue-harness` |
| `intake` | Confirms project facts and the minimum input checklist through multi-round questions |
| `inputs` | Inspects, compares, and analyzes PRD/RP/UI/API/assets inputs |
| `task` | Creates task IDs, views history, and creates immutable task snapshots |
| `verify` | Runs the quick/feature/runtime/interaction/visual/audit verification modes |

## On-demand commands

| Command | Purpose |
| --- | --- |
| `doctor` | Read-only diagnostics |
| `inspect` | Reads project facts |
| `plan` | Emits a structured plan |
| `resume` | Restores the previous collaboration context |
| `design` | Design Token inspect, discover, and diff |
| `ui` | UI System Adapter management and UI component inventory |
| `api` | OpenAPI inspection and generation |
| `skills` | Lists or installs Agent Skills |
| `version` | Prints the CLI version |

## JSON output

Several commands support `--json`; the matching Skills can trigger them too, and the full mapping is in [CLI](../reference/commands.md).

**Skill**: `continue-harness-inspect`, `continue-harness-plan`, `continue-harness-inputs`, `continue-harness-verify`

**CLI (optional)**:

```bash
continue-harness inspect --json
continue-harness plan init --json
continue-harness inputs analyze --json
continue-harness verify audit --json
```

JSON output lets Agents and CI read state instead of parsing human-readable text.

## Boundary

The CLI does not encode business pages, API paths, brand values, or project-private decisions; public interface changes require a compatibility review. The project owns facts, command mappings, and verification policy in `.continue-harness/project.yaml`; the CLI routes commands and reports results, and Core executes the protocol. See `docs/ARCHITECTURE.md` for the shared safety model.
