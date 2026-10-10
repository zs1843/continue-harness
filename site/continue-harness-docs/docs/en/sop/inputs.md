# Input registration

This page describes common input formats. Select evidence from confirmed project facts and task scope before registering it. Custom types and existing project paths are supported. The categories below are optional examples; see [Inputs and evidence](../guide/evidence.md) for task-specific selection.

## Input types

| Type | Directory | Purpose |
| --- | --- | --- |
| PRD | `.continue-harness/inputs/prd/` | Product requirements and business rules |
| RP | `.continue-harness/inputs/rp/` | Prototypes, page flows, interaction notes |
| UI | `.continue-harness/inputs/ui/` | Visual references, design files, screenshot notes |
| API | `.continue-harness/inputs/api/` | OpenAPI / Apifox exports |
| assets | `.continue-harness/inputs/assets/` | Images, icons, fonts, and other assets |

Intake suggests candidate questions from the project type and records confirmation with `intake evidence --id <item> --status confirmed|not_applicable|pending`. Built-in question sets cover several common categories; unmatched types use the general set. Requirements must be confirmed when Intake is configured; other candidates may be marked not applicable with a reason and are not a universal checklist.

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

`analyze` extracts clues from readable text inputs and reports same-key conflicts. It uses a limited set of recognition rules for known categories; custom types remain neutral rather than being classified as business, interaction, or visual evidence by default. Results are clues for review, not requirement-understanding or acceptance conclusions.

## Diff

Use the `inputs` Skill to inspect the current state and hash drift of registered files.

**Skill**: `continue-harness-inputs`

**CLI (optional)**:

```bash
continue-harness inputs diff --json
```

`diff` currently reuses the `inspect` result and detects file hash drift when the manifest contains a registered `sha256`. It does not compare historical analysis conclusions; collaborators must review whether earlier conclusions still apply.

## Optional visual-value records

When a task needs confirmed visual evidence organized into reusable values, it may be used to form candidate records. This is not required for every project. See the [Glossary](../reference/glossary.md) for conflict handling.

## Boundaries

Raw inputs are read-only: the implementation process produces analysis conclusions, coverage matrices, and task snapshots, but does not rewrite evidence files under `.continue-harness/inputs/`. Binary design and prototype files may need tool-assisted interpretation.
