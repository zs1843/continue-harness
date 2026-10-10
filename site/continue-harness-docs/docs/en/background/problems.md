# Problems addressed

This page lists the collaboration problems that continue-harness targets and the mechanism applied to each one. The motivation behind them is in [Why a harness](./why-harness.md).

## Scattered input evidence

PRD, RP, UI, API, and asset inputs come from different tools and often live in chat, cloud drives, screenshots, exported files, and temporary directories. Without one registry, developers and Agents cannot tell which input a task is based on.

continue-harness registers raw input paths, sources, types, and statuses in `.continue-harness/inputs/manifest.yaml`; it does not require moving or copying project materials. Raw inputs are read-only by default, and analysis output is generated separately.

## Context loading range

An Agent that reads every design, API, history, and task file mixes unrelated constraints into the current task; an Agent that reads too little starts guessing.

The default strategy reads the stable workflow first, then loads evidence linked to the confirmed task scope. Design, interface, or other specialized materials are read only when the task needs them and the project confirms their applicability; durable decisions are consulted for long-lived conflicts and architecture changes.

## Completion criteria

A page that opens and a build that passes do not establish that requirements are implemented. Dialogs, error states, return paths, and second-level pages are easy to miss in multi-layer flows.

Continue Harness records acceptance closure in `docs/ACCEPTANCE.md`. Each item needs an interpretable status and linked evidence; unresolved items prevent feature and audit verification from passing. Project owners or Agents remain responsible for reviewing requirement decomposition and coverage quality.

## Generated files and manual edits

When generated API types and request wrappers are edited by hand, the next generation can overwrite business fixes.

continue-harness scopes OpenAPI generation to one task and protects generated files against conflicts through managed-file tracking. The generated layer stays a pure contract, and business mapping lives in a separate service or repository. The current generation path reads local JSON exports.

## Agent rule drift

Codex, Claude Code, and Cursor each have their own entry file, and copying the full rule set into each one eventually produces several rule sets for the same project.

continue-harness keeps `AGENTS.md` as the single constraint authority. `CLAUDE.md` and the Cursor rule stay thin adapters, and Skills are callable workflows that do not override project constraints.
