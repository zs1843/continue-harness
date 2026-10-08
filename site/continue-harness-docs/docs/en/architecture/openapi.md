# OpenAPI

OpenAPI capabilities cover task-scoped API generation. This page covers input locations, task selection, generated artifacts, generation protection, and the unimplemented scope. The `continue-harness-api` Skill runs `inspect` and `generate` by default, and the CLI is an optional entry point.

## Input and artifacts

The current implementation starts from a local OpenAPI JSON file, usually an Apifox export.

```text
.continue-harness/inputs/api/
.continue-harness/api/selection.yaml
src/types/api.generated.ts
src/services/api.generated.ts
.continue-harness/api/generated.json
```

## Task selection

The PRD determines which operationIds the current task needs, and `selection.yaml` binds tasks to operationIds. Generation stays task-scoped, so the whole API is not generated at once and Agents do not guess fields from the PRD.

## Generated artifacts

- TypeScript request/response types are written to `src/types/api.generated.ts`.
- Request functions are written to `src/services/api.generated.ts` and call the project's `request` wrapper from `src/services/http.ts` (generated as `import { request } from './http'`), not `uni.request`.
- Managed metadata is written to `.continue-harness/api/generated.json`.

## Generation protection

Generated files stay reproducible. The recorded hash is checked before generation; if a developer edited a generated file manually, the next generation refuses to overwrite it. Business mapping stays outside the generated layer, keeping the transport contract separate from business adaptation.

## Not implemented

The current release does not implement online Apifox synchronization, authenticated pulls, complex discriminator mapping, or advanced media type support. Reference parameters (`$ref` parameter) are skipped during generation and are not resolved.
