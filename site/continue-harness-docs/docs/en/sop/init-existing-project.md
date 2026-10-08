# Adopt an existing project

This page covers the commands, preflight statuses, and incremental adoption order for adding Harness files to an existing project. For command options see [CLI](../reference/commands.md).

## Commands

Run a read-only preflight with the `init` Skill to confirm project-owned files are not overwritten.

**Skill**: `continue-harness-init`

**CLI (optional)**:

```bash
continue-harness init --dry-run
```

Use the `plan` Skill when a machine-readable write plan is needed.

**Skill**: `continue-harness-plan`

**CLI (optional)**:

```bash
continue-harness plan init --json
```

Once the plan is confirmed, write the missing Harness files with the `init` Skill.

**Skill**: `continue-harness-init`

**CLI (optional)**:

```bash
continue-harness init
```

After writing, run a read-only diagnosis with the `doctor` Skill.

**Skill**: `continue-harness-doctor`

**CLI (optional)**:

```bash
continue-harness doctor
```

## Preflight statuses

The initialization plan sorts files before writing:

| Status | Meaning |
| --- | --- |
| `create` | The target does not exist and can be created |
| `unchanged` | The file exists with identical content |
| `managed_unchanged` | A scaffold-managed file is unmodified |
| `project_owned_modified` | Maintained by the project and not directly overwritable |
| `conflict` | A real conflict that requires human handling |

When the plan contains any conflict, `init` writes nothing. `--dry-run` and `plan init` emit the same plan, for human review and machine consumption respectively.

## Incremental adoption

`init` replaces no package manager, test runner, style, or Agent rule; it adds only missing Harness files. Teams enable capabilities in this order:

1. Add `.continue-harness/project.yaml`.
2. Add input directories and project documents.
3. Enable `doctor` and `verify`.
4. Enable Design Token, OpenAPI, or UI System per task.

## Existing Token discovery

After adoption, scan the visual values the project already uses with the Design Token Skill.

**Skill**: `continue-harness-design-tokens`

**CLI (optional)**:

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```

`discover` read-only scans Vue, CSS, SCSS, and Less files under `src/` and prints candidates for CSS Variables, frequent colors, fonts, spacing, radii, shadows, sizes, elevation, motion, and breakpoints. The Token source of truth is updated only after a human confirms candidates.

Token priority is defined in [Glossary](../reference/glossary.md).

## Limits

`discover` prints candidates only and does not write `docs/design/tokens.json`; a human confirms the update of the Token source of truth.
