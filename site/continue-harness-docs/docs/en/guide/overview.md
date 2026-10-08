# Workflow

This page describes the flow from project adoption to task delivery and its artifacts. Start with [Project adoption](/en/guide/ai-first).

## Collaboration flow

Traceability follows **Requirement → Implementation item → Acceptance item → Evidence → Handoff state**. Define criteria before implementation. Handoff state identifies verified work, unfinished items and next actions.

<ZoomableImage
  src="/diagrams/delivery-loop-en.svg"
  alt="Delivery flow with acceptance, rework and scope-change branches"
  caption="Criteria are defined before implementation. Click to enlarge."
/>

Each step reads or produces a durable project fact or a verifiable result. The Harness does not make business decisions; it keeps Agents working from the same constraints and evidence.

## First use

See [Project adoption](/en/guide/ai-first) for the adoption prompt, the Skill installation commands, the task prompt, and the prompt that resumes work in a new session.

## Loading capabilities on demand

The default workflow covers project facts, inputs, tasks, logs, context, and acceptance. The Agent loads deeper capabilities only when the task requires them:

- API work: an OpenAPI snapshot, operation selection, and managed-file protection.
- Visual acceptance: use confirmed project references. Design Tokens, UI Contract and UI System apply only when needed by the project.
- Architecture work: `ARCHITECTURE.md`, `DECISIONS.md`, and relevant history.

Specialized Skills load when their task appears, so ordinary tasks do not read API, Design Token, or visual baseline rules.

The current milestone focuses on acceptance links, evidence validity and project context recovery. Additional specialized adapters and stack templates are deferred.

<details>
<summary>CLI reference (optional)</summary>

**Skill**: `generic-harness` (Intake), `continue-harness-task` (tasks), `continue-harness-verify` (verification)

Use the CLI when an Agent is unavailable, CI needs explicit commands, or execution must be diagnosed manually:

```bash
continue-harness intake inspect --json
continue-harness task create --title "Task title" --json
continue-harness verify feature
```

See the [CLI reference](/en/reference/commands) for the complete command list.

</details>
