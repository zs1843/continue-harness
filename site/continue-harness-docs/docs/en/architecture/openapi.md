# OpenAPI and input analysis

OpenAPI generation is task-scoped:

```bash
continue-harness api inspect --task T001 --json
continue-harness api generate --task T001 --dry-run
continue-harness api generate --task T001
```

The PRD or task selects operationIds. An Apifox-exported local OpenAPI JSON supplies the transport contract. Generated TypeScript types and request wrappers are managed files; manual changes are detected by hash and are not overwritten.

Online Apifox synchronization, advanced media types, discriminator mapping, and provider-specific extensions are not implemented in the current release.
