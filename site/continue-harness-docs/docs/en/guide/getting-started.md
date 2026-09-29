# Create or adopt a project

## Install the CLI

Version `0.1.0` is not published to npm yet, and `@company` is still a placeholder scope. Install it from source:

```bash
git clone https://github.com/zs1843/continue-harness.git
cd continue-harness
pnpm install
node packages/cli/bin/continue-harness.mjs version
```

Requirements: Node.js 20 or later, and pnpm 10.12.1 or a compatible version. The examples below use `continue-harness` as the CLI name; when running from source, replace it with `node packages/cli/bin/continue-harness.mjs`.

## Create from scratch

Preview first, then create:

```bash
continue-harness plan create my-h5 --json
continue-harness create my-h5
cd my-h5
continue-harness inspect --json
```

The current `consumer-h5` preset creates a minimal uni-app + Vue 3 + Vite project, Playwright checks, the `.continue-harness/` state directory, project constraints, history, and a coverage matrix. Dependencies are installed by default; use `--skip-install` offline.

After creation, run the first checks in this order:

```bash
continue-harness inspect --json
continue-harness doctor
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "Implement the first scoped change"
continue-harness verify feature
```

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
