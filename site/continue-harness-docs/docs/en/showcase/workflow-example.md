# Read-only command examples

This page lists read-only commands executed against the repository at `0.1.0` (2026-10-08), with excerpts of their output. `plan` prints a target list and writes no files. All commands run from the repository root.

## Version

```bash
node packages/cli/bin/continue-harness.mjs version
```

```text
0.1.0
```

## Creation plan

`plan create` prints the files it would create and writes nothing.

```bash
node packages/cli/bin/continue-harness.mjs plan create demo-h5 --json
```

```json
{
  "action": "create",
  "entries": [
    { "status": "create", "target": ".continue-harness/inputs/README.md" },
    { "status": "create", "target": ".continue-harness/inputs/manifest.yaml" },
    { "status": "create", "target": ".continue-harness/intake.yaml" },
    { "status": "create", "target": ".continue-harness/logs/README.md" },
    { "status": "create", "target": ".continue-harness/project.yaml" },
    { "status": "create", "target": ".cursor/rules/continue-harness.mdc" },
    { "status": "create", "target": ".gitignore" },
    { "status": "create", "target": "AGENTS.md" },
    { "status": "create", "target": "CLAUDE.md" },
    { "status": "create", "target": "docs/ACCEPTANCE.md" },
    { "status": "create", "target": "docs/CURRENT_STATUS.md" },
    { "status": "create", "target": "docs/DECISIONS.md" },
    { "status": "create", "target": "docs/PROJECT.md" },
    { "status": "create", "target": "docs/history/README.md" },
    { "status": "create", "target": ".agents/skills/generic-harness/SKILL.md" },
    { "status": "create", "target": ".claude/skills/generic-harness/SKILL.md" },
    { "status": "create", "target": ".agents/skills/generic-harness/agents/openai.yaml" },
    { "status": "create", "target": ".claude/skills/generic-harness/agents/openai.yaml" }
  ],
  "name": "demo-h5",
  "output": "<working-directory>/demo-h5",
  "status": "ready",
  "preset": "generic"
}
```

The default `preset` is `generic`, `output` is an absolute path under the current working directory, and `status: ready` means this plan found no conflict that blocks creation. Those 18 `target` entries are the complete generic list.

`--preset consumer-h5` produces 70 targets under the same protocol, including `src/App.vue`, `src/components/BaseButton.vue`, `src/pages.json`, `src/pages/index/index.vue`, `package.json`, `playwright.config.mjs`, `tests/e2e/runtime.spec.mjs`, and `docs/design/tokens.json`, none of which appear in the generic list.

For an existing project, `plan init --json` reports each entry as `create`, `managed_unchanged`, or `project_owned_modified`, and files the project owns are not overwritten. Next steps are in [Create a project](../sop/create-project.md) and [Adopt an existing project](../sop/init-existing-project.md).

## Project facts

```bash
node packages/cli/bin/continue-harness.mjs inspect --json
```

This repository reports `product_type: developer_tooling` and `stack.adapter: node-esm`, with `quick`, `feature`, and `audit` in `modes`. A generated project reads its own `.continue-harness/project.yaml`, so project type, stack, verification modes, and input state are independent of this repository.

## Diagnostics

```bash
node packages/cli/bin/continue-harness.mjs doctor --json
```

`doctor --json` returns a top-level `status` and a `results` array, where each check carries a stable `code` and status. In this repository `RUNTIME_NODE_VERSION`, `CI_ENTRY_POINT`, and `PROJECT_SCRIPT` are `passed`; `OPENAPI_SNAPSHOT` is `not_configured`, meaning the check has no configuration yet; `INPUTS`, `TASK_HISTORY`, and `VISUAL_BASELINE` are `not_applicable`. A target project's diagnostics come from that project's own configuration and files.

## Example state

`demo-h5` has a registered draft PRD. The verifiable facts are input registration, hash inspection, and `draft` status. [The evidence record](./demo-h5-capture.md) separates verified facts from evidence still to be added.
