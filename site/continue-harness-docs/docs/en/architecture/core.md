# Core, CLI, and adapters

## Core

Core owns configuration loading, named command resolution, verification execution, diagnostics, input analysis, task metadata, resume state, and Markdown/JSON/log reports. It does not understand business pages, brands, API payloads, or project Token values.

## CLI

The canonical entry point is `continue-harness`. `fe-harness` remains an executable compatibility alias for existing projects. The CLI exposes human-readable output and stable `--json` output for Agents and CI.

## Adapters

- A Product Profile describes checks caused by product shape. The first public profile is `consumer-h5`.
- A Platform Adapter describes runtime acceptance. The first public adapter is `web-mobile`.
- A Stack Adapter describes framework and toolchain integration. The first public adapter is `uni-app`.
- A UI System Adapter describes component semantics and Token mapping without importing a production UI dependency.

Target projects select adapters in `.continue-harness/project.yaml`; Core loads the descriptors without importing product code.
