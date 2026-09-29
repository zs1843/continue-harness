---
name: continue-harness-api
description: Inspect Apifox-exported OpenAPI JSON and generate task-scoped TypeScript API types and uni-app request wrappers under continue-harness. Use when registering API evidence, combining a PRD task with operationIds, previewing API generation, regenerating managed API files, or resolving API generation conflicts.
---

# FE Harness API

## Workflow

1. Read `AGENTS.md`, `.continue-harness/project.yaml`, the input manifest, the task PRD, and
   `.continue-harness/api/selection.yaml`.
2. If the Apifox OpenAPI JSON is absent, ask for the exported file. Do not ask for a token when a
   local export is sufficient and never persist credentials.
3. Register the file in `.continue-harness/inputs/manifest.yaml` as an active `api` input. Preserve the
   original file as read-only evidence.
4. Derive required operations from the PRD. If multiple operations plausibly satisfy a core flow,
   ask the user to choose; do not invent an operationId.
5. Configure the task in `.continue-harness/api/selection.yaml`:

   ```yaml
   tasks:
     T001:
       prd_inputs: [PRD-T001]
       api_input: API-001
       operations: [getUser]
   ```

6. Run `continue-harness api inspect --task T001 --json`.
7. Run `continue-harness api generate --task T001 --dry-run --json`. Stop on `conflict`; preserve manual
   changes by moving business mapping into a non-generated service or repository.
8. Run `continue-harness api generate --task T001` after a clean plan.
9. Add project-specific error normalization, DTO-to-view-model mapping, caching, or orchestration in
   separate non-generated files. Never modify `api.generated.ts` directly.
10. Run `continue-harness verify quick`, then use `feature` when the interface is connected to a feature.
11. Record changed files, input IDs, selected operations, and actual verification in task history.

## Authority

- Use the PRD to decide product scope and which operations are needed.
- Use OpenAPI as the authority for method, path, parameters, request body, and response shape.
- Treat discrepancies affecting core flow, authentication, payment, permissions, or data shape as a
  confirmation boundary.
- Treat generated code as transport infrastructure, not business semantics.

## Current boundary

Support local OpenAPI 3.x/Swagger 2.0 JSON exports. Online Apifox synchronization is a later adapter;
only request an Apifox token when that sync command actually exists and is being used.
