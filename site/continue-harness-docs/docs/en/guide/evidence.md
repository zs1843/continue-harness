# Inputs and evidence

Inputs provide the basis for implementation and acceptance. Continue Harness records their sources, versions and task associations, and detects changes that require review.

## Select inputs for the task

Confirm the goal, scope, project type, runtime and toolchain first. Then select the evidence needed for the current task. Project types suggest questions; the confirmed task determines the final list.

A layout change may need a design reference. A frontend logic fix may need reproduction steps and expected behavior without any UI files. A background job may need domain rules and a data contract. A deployment change may need environment and rollback requirements.

UI, API and Design Token inputs are optional. A visual task does not automatically require a design system.

Intake supports project-defined evidence items. Confirmation requires a source; marking an item not applicable requires a reason. Changes to project facts reopen evidence confirmation.

<ZoomableImage
  src="/diagrams/input-selection-en.svg"
  alt="Choose inputs from project facts and task applicability"
  caption="Confirm sources, record non-applicability or keep questions pending."
/>

## Register inputs

Register inputs in `.continue-harness/inputs/manifest.yaml`. Existing prd, rp, ui, api and assets types remain supported. Custom types use lowercase letters, digits, underscores or hyphens.

```yaml
version: 1
inputs:
  - id: REQ-001
    type: requirements
    path: docs/requirements/export.md
    task_id: T001
    status: active
    source: Confirmed export requirements
    version: "1"
```

Paths reference actual project files; copying them into a fixed directory is unnecessary. Requirements agreed in conversation can be saved as a project file and registered. Record the applicability reason in the Intake note and use sha256 to detect content changes.

## Inspect changes

Use the `continue-harness-inputs` Skill. inspect checks files, hashes, conflicts and unregistered material; diff identifies changes; analyze extracts text clues. Images and PDFs require an Agent or suitable tool.

When an input changes, review the affected requirements and acceptance items and rerun verification. These checks cannot establish that business requirements are complete.

## Link acceptance

Reference the input ID in `docs/ACCEPTANCE.md`, optionally with a section such as `REQ-001#export-format`. Use the same task ID for implementation, criteria and evidence. See [Verification](/en/guide/verification).

<details>
<summary>CLI reference</summary>

```bash
continue-harness intake evidence --id data_contract --status confirmed --source docs/data.md --note "This task depends on field definitions"
continue-harness intake evidence --id ui --status not_applicable --note "Only calculation logic changes"
continue-harness inputs inspect --json
continue-harness inputs diff --json
continue-harness inputs analyze --json
```

</details>
