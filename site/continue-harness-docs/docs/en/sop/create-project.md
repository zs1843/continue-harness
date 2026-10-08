# Create a project

This page covers the command, generated content, and evidence order for a new project. For the directory and path inventory see [Project structure](./project-structure.md); for command options see [CLI](../reference/commands.md).

## Commands

Preview the write plan with the `plan` Skill, then create the project.

**Skill**: `continue-harness-plan`

**CLI (optional)**:

```bash
continue-harness plan create my-project --preset consumer-h5 --json
```

Once the plan is confirmed, generate the project with the `create` Skill.

**Skill**: `continue-harness-create`

**CLI (optional)**:

```bash
continue-harness create my-project --preset consumer-h5
```

Offline creation is also handled by `continue-harness-create`, with `--skip-install` added.

**Skill**: `continue-harness-create`

**CLI (optional)**:

```bash
continue-harness create my-project --preset consumer-h5 --skip-install
```

## Generated content

With the Consumer H5 preset selected explicitly, the command generates:

- A uni-app + Vue 3 + Vite project.
- Playwright runtime and visual verification configuration.
- `.continue-harness/project.yaml` and the standard input directories.
- `AGENTS.md`, `CLAUDE.md`, and a Cursor rule.
- The aggregate Skill used by the preset: `consumer-h5-harness`.
- PRODUCT, DESIGN, CURRENT_STATUS, PROJECT_MAP, history, and coverage files under docs.
- Boundary directories under src: components, services, repositories, stores, utils.

Without `--preset`, the generic preset generates only the Harness fact directory, the Agent entry, and the acceptance skeleton, with no business pages or framework configuration. The file differences between presets are in [Configuration and files](../reference/config-and-files.md).

## Creation and evidence order

The create command generates a container and its rules; it does not complete business work. Existing material enters the project afterwards:

1. Create the project and input directories.
2. Put material into `.continue-harness/inputs/prd|rp|ui|api|assets/`.
3. Run `continue-harness inputs inspect` and `inputs analyze`.
4. Run `continue-harness task create` for the first task.

Missing PRD, UI, or API evidence does not block creation; that material is registered before the task that needs it starts.

## Default Skills

The Consumer H5 preset uses `consumer-h5-harness`; a generic project uses the `generic-harness` aggregate Skill. Command-specific Skills are installed on demand by copying `skills/<name>/` from the repository into the host directory:

```bash
cp -R <repo-path>/skills/continue-harness-api .agents/skills/
```

When the CLI is available you can also run `continue-harness skills install --project --name continue-harness-api`. See [Install skills](../skills/install.md).

## Limits

`--skip-install` skips dependency installation, so verification commands cannot run until dependencies are installed.
