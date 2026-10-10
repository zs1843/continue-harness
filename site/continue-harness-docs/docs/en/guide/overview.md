# Workflow

This page outlines the flow from project fact confirmation through task handoff. Start with [Get started](/en/guide/getting-started).

## Collaboration flow

Traceability follows **Requirement → Implementation item → Acceptance item → Evidence → Handoff state**. Define criteria before implementation. Handoff state identifies verified work, unfinished items and next actions.

<ZoomableImage
  src="/diagrams/delivery-loop-en.svg"
  alt="Delivery flow with acceptance, rework and scope-change branches"
  caption="Criteria are defined before implementation. Click to enlarge."
/>

Each step reads or produces a durable project fact or a verifiable result. The Harness does not make business decisions; it keeps Agents working from the same constraints and evidence.

## First use

See [Get started](/en/guide/getting-started) for the user entry point and Agent prompt.

## Loading capabilities on demand

The default workflow covers project facts, inputs, tasks, logs, context, and acceptance. The Agent loads deeper capabilities only when the task requires them:

- API work: an OpenAPI snapshot, operation selection, and managed-file protection.
- Visual acceptance: use confirmed project references. Design Tokens, UI Contract and UI System apply only when needed by the project.
- Architecture work: `ARCHITECTURE.md`, `DECISIONS.md`, and relevant history.

Specialized Skills load when their task appears, so ordinary tasks do not read API, Design Token, or visual baseline rules.

The current milestone focuses on acceptance links, evidence validity and project context recovery. Additional specialized adapters and stack templates are deferred.

<details>
<summary>CLI reference (optional)</summary>

Use the existing operation Skill for each stage: `continue-harness-create` for a new project, `continue-harness-init` for adoption, `continue-harness-inputs` for input registration, `continue-harness-task` for tasks and handoff, and `continue-harness-verify` for verification. Intake is part of the create, adoption, and input-confirmation workflows; there is no standalone Intake Skill.

Use the CLI when an Agent is unavailable, CI needs explicit commands, or execution must be diagnosed manually:

```bash
continue-harness intake inspect --json
continue-harness task create --title "Task title" --json
continue-harness verify feature
```

See the [CLI reference](/en/reference/commands) for the complete command list.

These commands illustrate entry points; they do not imply that a project already has task, input, or verification configuration. An unconfigured verification mode returns `not_configured`, not a pass.

</details>
