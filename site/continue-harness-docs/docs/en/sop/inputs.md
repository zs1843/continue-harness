# Input registration

This page describes common input formats. Select evidence from project type, toolchain and task scope before registering it. Custom types and existing project paths are supported. The five types below are optional examples; see [Inputs and evidence](../guide/evidence.md).

## Input types

| Type | Directory | Purpose |
| --- | --- | --- |
| PRD | `.continue-harness/inputs/prd/` | Product requirements and business rules |
| RP | `.continue-harness/inputs/rp/` | Prototypes, page flows, interaction notes |
| UI | `.continue-harness/inputs/ui/` | Visual references, design files, screenshot notes |
| API | `.continue-harness/inputs/api/` | OpenAPI / Apifox exports |
| assets | `.continue-harness/inputs/assets/` | Images, icons, fonts, and other assets |

In its second round, `intake` generates the minimum evidence list from the project type and records registration with `intake evidence --id <item> --status confirmed|not_applicable|pending`.

## Inspect

Compare the input directory with the registration manifest using the `inputs` Skill.

**Skill**: `continue-harness-inputs`

**CLI (optional)**:

```bash
continue-harness inputs inspect --json
```

`inspect` compares the input directory with `manifest.yaml` and reports:

- Which files are registered.
- Which files are not registered yet.
- Which registered entries have no matching file.
- Whether the manifest exists and parses.

## Analyze

Extract and classify facts from the inputs using the `inputs` Skill.

**Skill**: `continue-harness-inputs`

**CLI (optional)**:

```bash
continue-harness inputs analyze --json
```

`analyze` extracts simple facts from text inputs, classifies them by business, interaction, and visual dimension, and reports same-key conflicts.

## Diff

Review changes to registered files and conclusions using the `inputs` Skill.

**Skill**: `continue-harness-inputs`

**CLI (optional)**:

```bash
continue-harness inputs diff --json
```

`diff` reports changes to registered files and analysis conclusions, so earlier conclusions can be judged still valid or not.

## Token source

UI and RP inputs are sources for Token extraction. Visual conflicts are resolved by the priority in [Glossary](../reference/glossary.md).

## Boundaries

Raw inputs are read-only: the implementation process produces analysis conclusions, coverage matrices, and task snapshots, but does not rewrite evidence files under `.continue-harness/inputs/`. Binary design and prototype files may need tool-assisted interpretation.
