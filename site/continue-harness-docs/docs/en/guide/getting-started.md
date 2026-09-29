# Create or adopt a project

## Create from scratch

Preview first, then create:

```bash
continue-harness plan create my-h5 --json
continue-harness create my-h5
cd my-h5
continue-harness inspect --json
```

The current `consumer-h5` preset creates a minimal uni-app + Vue 3 + Vite project, Playwright checks, the `.continue-harness/` state directory, project constraints, history, and a coverage matrix. Dependencies are installed by default; use `--skip-install` offline.

Creation builds the container. It does not require a complete PRD, UI, or API set. Register inputs and create the first task when the material is ready.

## Adopt an existing project

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

`init` creates missing files and preserves files already maintained by the project. A real conflict prevents all writes.

| Plan state | Meaning |
| --- | --- |
| `create` | The file does not exist and will be created |
| `managed_unchanged` | A harness-managed file is still the template version |
| `project_owned_modified` | The project owns a modified file; it is preserved |
| `conflict` | Manual resolution is required |

## First checks

```bash
continue-harness inspect --json
continue-harness doctor --json
continue-harness inputs inspect --json
```

For an existing front-end project, `continue-harness design tokens discover --json` can inventory current styles before a canonical Token file is confirmed.

## Migrate the legacy directory

Older projects may use `.fe-harness/`. Preview and then migrate it:

```bash
continue-harness migrate --dry-run --json
continue-harness migrate
```

Migration moves the directory only when `.continue-harness/` does not already exist. A conflict stops the operation. Projects that have not migrated remain readable and writable through the compatibility resolver.
