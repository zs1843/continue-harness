# Tasks, resume and snapshots

A task ID connects requirements, implementation, acceptance and evidence. Handoff state records progress and next actions so another collaborator can continue from project records.

## Start a task

Use `continue-harness-task` to create or continue a task. Confirm goals, scope, non-goals and acceptance criteria before implementation. Register the necessary inputs and link them in the acceptance ledger.

Input files hold source material. `docs/ACCEPTANCE.md` holds acceptance links. Logs record execution, decisions describe lasting choices, and snapshots preserve handoff state.

## Restore project context

Resume includes Intake facts, PROJECT, CURRENT_STATUS and DECISIONS documents, the task inventory, active inputs and sources, acceptance records, verification state, snapshots and Git changes. Follow these references to the original material.

`resume --task T001` focuses on a task while retaining project context. A report from another task or an outdated input or implementation version is marked for confirmation. Collaborators maintain project documents; Harness does not determine whether an old decision should be superseded.

<ZoomableImage
  src="/diagrams/context-recovery-en.svg"
  alt="Restore project context and check whether the report applies"
  caption="Check task and version associations before using earlier verification."
/>

## Save handoff state

Before a snapshot, check input and acceptance links and verify the current task. The snapshot contains:

- Task notes and a project-file hash inventory.
- A copy of the verification report and its task/version association.
- Intake, acceptance links, decisions and input fingerprints.
- Deferrals, blockers, risks and handoff notes.

Snapshots live in `docs/history/tasks/`. The hash inventory is an index, not a full project backup; Git retains source history.

## Continue work

The handoff should identify completed and unfinished work, evidence locations, open questions and next actions. Update requirements and acceptance criteria before implementing a changed scope.

<details>
<summary>CLI reference</summary>

```bash
continue-harness task create --title "Task name" --json
continue-harness resume --task T001 --json
continue-harness verify feature --task T001
continue-harness task snapshot T001 --title "Task name" --request "User request" --json
```

</details>
