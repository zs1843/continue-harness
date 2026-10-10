# Verification and acceptance

Continue Harness links requirements, implementation, acceptance criteria and evidence to a task. Define acceptance criteria before implementation and use verification results to assess the current implementation.

## Acceptance records

Maintain the links in the existing `docs/ACCEPTANCE.md` ledger:

| id | task | requirement | implementation | criterion | status | evidence | reason | owner | next |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AC-001 | T001 | REQ-001 | implementation file path | Output matches the confirmed requirement | pending | | | | |

The requirement references an active manifest input ID, optionally with a section. Implementation and evidence are project-relative file paths. This row is a format example; the project chooses its own files and criteria.

A verified row needs a valid requirement, implementation file and readable evidence file. The check validates references and file state; reviewers must still assess whether the evidence proves the criterion.

Every active input scoped to the selected task or shared at project level needs an acceptance link, regardless of type. Coverage is checked at the input-file and ledger-row level. Collaborators must still decompose requirements, check section references and review coverage of individual implementation items.

Use deferred or blocked with a reason, owner and follow-up condition. These states record risk and do not count as acceptance passed. Deferred work may reference a planned implementation path.

## Run checks

Use `continue-harness-verify` to run the project's configured checks. quick provides fast feedback. feature and audit also check the selected task's acceptance links. An existing task without acceptance records cannot pass these gates.

Enable runtime, interaction or visual checks only when the task needs them. Backend, data and infrastructure projects do not need browser or visual tests just to adopt Harness.

Where Intake exists, project facts and input applicability must be confirmed before feature, audit or snapshot creation can succeed. Missing, blank or pending answers do not count as confirmation. Reading Intake recomputes its status rather than trusting a stored confirmed value. Legacy projects without Intake remain compatible; Doctor reports it as not configured, not as confirmed project facts.

## Report validity

Reports contain the task ID, input hashes, implementation hashes and an acceptance-record fingerprint. Resume and snapshots check these against current state. Reports from another task, unbound legacy reports and outdated reports require verification again.

The fingerprint also includes evidence files, Intake status and applicability, and the configured commands and verify mappings. A change between the pre-run and post-run states fails verification and prevents the report from backing a snapshot. Use saved, independent evidence files rather than the latest report or logs overwritten by the same run. Save new evidence before running the binding verification.

Reports live under `tmp/continue-harness/`. Snapshots store a report copy so later verification cannot overwrite the handoff evidence.

Change detection covers linked inputs, implementation files and acceptance records. Changes to unregistered dependencies still require project tests and review. File existence or command success alone does not prove business acceptance.

Before/after comparison is not a filesystem lock and cannot detect a change reverted during execution. Doctor diagnoses structure; passed does not mean all optional capabilities are configured and does not replace task acceptance.

## Existing projects

Legacy tables remain readable, but status-only rows require requirement and implementation links. Update the existing ledger and rerun verification. Historical passed results do not establish passage through the new gate.

<details>
<summary>CLI reference</summary>

```bash
continue-harness verify feature --task T001
continue-harness verify audit --task T001
```

Without --task, verification selects the most recently updated task. Specify the ID during concurrent work.

</details>
