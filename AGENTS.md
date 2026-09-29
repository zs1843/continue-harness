# continue-harness Agent Guide

This repository contains a business-agnostic project collaboration and quality harness.

## Read order

1. Read this file.
2. Read `.continue-harness/project.yaml`.
3. Read `docs/PROJECT_MAP.md` before locating modules or assessing impact.
4. Read `docs/ARCHITECTURE.md` before changing package boundaries or configuration protocols.
5. Read `docs/CURRENT_STATUS.md` before continuing implementation.
6. Read `docs/ROADMAP.md` before expanding supported profiles, platforms, or stacks.

## Scope

- Keep Core independent from product type, platform, framework, and business domain.
- Put product-shape rules in `profiles/`.
- Put runtime-platform rules in `platforms/`.
- Put framework and toolchain rules in `stacks/`.
- Keep project-owned values in `.continue-harness/project.yaml`.
- Do not introduce business pages, domain statuses, API endpoints, brands, or token values.

## Change boundaries

Obtain confirmation before:

- Adding or upgrading production dependencies.
- Changing the public configuration schema or CLI interface.
- Replacing the package manager, test runner, or repository structure.
- Publishing packages, creating remotes, pushing tags, or changing release automation.
- Adding a new product profile, platform adapter, or stack adapter beyond the active roadmap stage.

## Development flow

1. Restate the requested outcome.
2. Identify affected Core, CLI, Profile, Platform, Stack, template, schema, and test files.
3. Preserve backward compatibility unless a breaking change is explicitly approved.
4. Add or update focused tests.
5. Run:
   - `pnpm test`
   - `node packages/cli/bin/continue-harness.mjs version`
   - Example Doctor or verification when relevant.
6. Report actual verification results, remaining limitations, and whether confirmation boundaries were touched.

## Conversation handoff

Finish each user-facing turn with a short numbered list of concrete next actions that can be started from the current context. Offer only relevant actions, usually two or three. A reply containing only a listed number selects that action from the most recent list; start it directly without another selection round. A new request or a number outside that list is handled as a normal message. Do not turn required approval or missing task facts into an ambiguous numbered choice.

Do not automatically commit, push, publish, or initialize external services unless explicitly requested.
