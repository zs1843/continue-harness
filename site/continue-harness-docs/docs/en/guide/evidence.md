# Inputs and evidence

Inputs provide the basis for implementation and acceptance. Continue Harness records their source, version, applicability, and task links, and indicates when a change may affect existing conclusions.

## Select inputs for the task

First confirm project goals, scope, type, runtime, and known constraints through conversation. Then determine which inputs apply to the current task. Project facts help the Agent form questions; the confirmed task determines the final list.

Possible inputs include requirements, behavior descriptions, visual references, interface contracts, data definitions, runtime constraints, acceptance conditions, and existing project materials. These are candidates to select as needed, not a fixed checklist.

Intake supports project-defined evidence items. The current CLI also provides candidate questions for several common project categories; other values use a general candidate set. These prompts do not restrict the project's technology or make optional input types mandatory. Confirmation records the source; non-applicability records a reason. When project facts change, reconfirm affected inputs.

<ZoomableImage
  src="/diagrams/input-selection-en.svg"
  alt="Select inputs from project facts and task needs"
  caption="Confirm sources, record non-applicability, or keep questions pending."
/>

## Register inputs

Register inputs in `.continue-harness/inputs/manifest.yaml`. Existing categories can be reused, or a project can define its own names:

```yaml
version: 1
inputs:
  - id: REQ-001
    type: requirements
    path: docs/requirements/export.md
    task_id: T001
    status: active
    source: Confirmed requirement source
    version: "1"
```

Paths reference actual project materials; copying them into a fixed directory is unnecessary. Confirmed requirements from conversation can be saved as project records with source and version. Content fingerprints can identify later changes.

Keep unknown inputs pending and record why an input does not apply. Empty placeholder materials are unnecessary.

## Inspect changes

Use the `continue-harness-inputs` Skill. inspect checks files, hashes, conflicts, and unregistered material; diff reports changes; analyze extracts text clues. Materials requiring semantic interpretation need review by an Agent or suitable tool.

When an input changes, reconfirm affected requirements and acceptance items and rerun relevant checks. Automation can find registration and traceability issues; it cannot determine whether business requirements are complete.

## Link acceptance

Reference input IDs and relevant sections in `docs/ACCEPTANCE.md`. Link implementation items, acceptance criteria, and evidence to the same task ID. See [Verification](./verification.md).

<details>
<summary>CLI reference</summary>

```bash
continue-harness intake evidence --id data_contract --status confirmed --source docs/data.md --note "This task depends on field definitions"
continue-harness inputs inspect --json
continue-harness inputs diff --json
continue-harness inputs analyze --json
```

</details>
