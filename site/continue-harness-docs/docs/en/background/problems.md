# Problems addressed

This page lists the collaboration problems that continue-harness targets and the mechanism applied to each one. The motivation behind them is in [Why a harness](./why-harness.md).

## Scattered input evidence

PRD, RP, UI, API, and asset inputs come from different tools and often live in chat, cloud drives, screenshots, exported files, and temporary directories. Without one registry, developers and Agents cannot tell which input a task is based on.

continue-harness stores raw inputs under `.continue-harness/inputs/` and records source, type, and status in a manifest. Raw inputs are read-only by default, and analysis output is generated separately.

## Context loading range

An Agent that reads every design, API, history, and task file mixes unrelated constraints into the current task; an Agent that reads too little starts guessing.

The default strategy reads the stable workflow first, then loads evidence by task type: business tasks read PRD/RP; UI tasks add DESIGN, tokens, UI inputs, and visual adjustment records; API tasks add OpenAPI inputs and operationId selections; long-lived conflicts and architecture decisions add DECISIONS.

## Completion criteria

A page that opens and a build that passes do not establish that requirements are implemented. Dialogs, error states, return paths, and second-level pages are easy to miss in multi-layer flows.

continue-harness records requirement closure in the `docs/ACCEPTANCE.md` table: a row must be marked verified, deferred, or blocked; any other status counts as unresolved and fails the feature and audit gates. The consumer-h5 preset adds a coverage-matrix test that checks reachable pages, states, actions, and return paths for active PRD tasks.

## Generated files and manual edits

When generated API types and request wrappers are edited by hand, the next generation can overwrite business fixes.

continue-harness scopes OpenAPI generation to one task and protects generated files against conflicts through managed-file tracking. The generated layer stays a pure contract, and business mapping lives in a separate service or repository. The current generation path reads local JSON exports.

## Agent rule drift

Codex, Claude Code, and Cursor each have their own entry file, and copying the full rule set into each one eventually produces several rule sets for the same project.

continue-harness keeps `AGENTS.md` as the single constraint authority. `CLAUDE.md` and the Cursor rule stay thin adapters, and Skills are callable workflows that do not override project constraints.
