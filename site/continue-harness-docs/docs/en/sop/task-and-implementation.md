# Task and implementation details

Create a task before implementation so evidence, files, verification, and handoff use the same ID:

```bash
continue-harness task create --title "Implement the scoped change" --json
continue-harness resume --json
```

Read evidence by task type: PRD/RP for business work, DESIGN/Tokens/UI Contract for UI work, OpenAPI and `selection.yaml` for API work, and architecture decisions for structural work. Keep page, component, service, repository, store, and utility boundaries owned by the target project.
