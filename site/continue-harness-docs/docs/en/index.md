---
layout: home

hero:
  name: Continue Harness
  text: Resumable project collaboration and quality
  tagline: Requirements, implementation, acceptance, and evidence bound to one task ID, so project context can be resumed.
  actions:
    - theme: brand
      text: Get started
      link: /en/guide/ai-first
    - theme: alt
      text: View the workflow
      link: /en/guide/overview

features:
  - title: Requirements to acceptance
    details: Define criteria before implementation and link requirements, implementation items, acceptance and evidence to a task.
  - title: Input registration and evidence binding
    details: Select inputs from project type, toolchain and task scope. Record sources and versions, and review changes that affect acceptance.
  - title: Task resume
    details: resume is a read-only summary of the current task, input status, recent snapshots, coverage matrix, decisions, Git changes, and up to three next actions.
---

Continue Harness connects requirements to implementation, acceptance criteria, evidence and handoff state. It preserves project context so collaborators can resume work from confirmed facts and records.

```text
Requirement → Implementation item → Acceptance item → Evidence → Handoff state
```

Define acceptance criteria before implementation. Project type, toolchain and task scope determine which inputs and checks apply; UI, API and Design Token files are optional. See [Inputs and evidence](/en/guide/evidence) and [Verification](/en/guide/verification).

The current scope is this delivery loop, traceable evidence and resumable context. Specialized adapters remain optional; expanding templates and frameworks is outside the current milestone.

## What it is

This page covers the positioning of `continue-harness`, its Core capability boundaries, its verification scope, and its CLI entry points. It is a project-neutral collaboration and quality harness at version 0.1.0; it is not published to npm, and `@company` is a placeholder scope.

## Adoption

The project can be adopted through a Skill-enabled Agent or used directly through the CLI. For a first adoption, give the project to an Agent and let it complete Intake, register inputs, and inspect the current state from project facts. Send the following request to begin:

```text
Use the Continue Harness project-adoption Skill to adopt the current project.
Use `continue-harness-create` for a new project and `continue-harness-init` for an existing project.
Do not modify business code yet. Start with Intake: confirm project type, scope, runtime, collaborators, and toolchain.
Mark unknown facts as pending; do not guess. Then generate the minimum evidence list for the project type, register sources, and inspect the current project.
End with confirmed facts, open questions, risks, and the first executable task.
```

The Agent connects Intake, input registration, tasks, logs, context recovery, verification, and handoff into one flow, and binds every stage to the same task ID. See [Project adoption](/en/guide/ai-first) for the full prompts and [Tasks, resume, and snapshots](/en/guide/tasks-and-resume) for how recovery data is read.

<details>
<summary>Optional capabilities and configuration boundaries</summary>

| Layer | Current implementation | Boundary |
| --- | --- | --- |
| Core | Configuration, diagnostics, input analysis, tasks, resume, verification, reports | Mechanism layer; the target project owns its business facts |
| Project integration protocol | Project facts, constraints, command mappings, logs, context, and acceptance records | Declared by the target project and its verification model |
| Evidence and extension capabilities | Input registration, contract analysis, design facts, UI Contract, UI System | UI Contract is implemented; the UI System protocol is validated only on the two built-in fixtures `list-detail` and `form-result`. The `tdesign-uniapp` adapter is experimental and is not a dependency of any preset |

Adapter values are validated by Core configuration enums and `schemas/project.schema.json`: `project.product_type` covers `generic`, `consumer_h5`, and `developer_tooling`; `project.platforms` covers `node` and `web_mobile`; `stack.adapter` covers `node-esm` and `uni-app`. The default preset is `generic`, which generates a constraint container without `src/` or `tests/`; `consumer-h5` requires an explicit `--preset consumer-h5`.

The reasoning and tradeoffs behind the split between Core and project facts are in [Design principles](/en/background/principles).


</details>

<details>
<summary>CLI execution reference (optional)</summary>

**Skill**: `continue-harness-create`, `continue-harness-init`, `continue-harness-inspect`, `continue-harness-inputs`, `continue-harness-task`, `continue-harness-verify` (default flow; `generic-harness` covers `intake` and `resume`, and the full command-to-Skill mapping is in [CLI](/en/reference/commands))

**CLI (optional)**:

```bash
continue-harness create my-project
cd my-project
continue-harness intake inspect --json
continue-harness inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "Implement the first scoped change" --json
continue-harness resume --json
continue-harness verify feature
```

The CLI is the lower-level execution interface for Agents. For automation, CI, and troubleshooting, read the [CLI reference](/en/reference/commands).

</details>

## Verification scope

The current suite contains 79 automated regression tests covering Core, the CLI, Doctor, initialization, and the UI System protocol. Real-project validation covers HeTun-Site (React/Vite) and Workbench-Admin (Vue 2/Vue CLI); each completed its own T001 pilot task and passed `verify audit`. The product itself is not complete, and there is no quantified efficiency gain. The `upgrade` command, GitLab CI template, Codex Plugin, npm registry publishing, and online Apifox sync are not implemented.

## Next steps

- New project: read [Create or adopt a project](/en/guide/getting-started).
- Existing project: read [Inputs and evidence](/en/guide/evidence), then run `continue-harness init --dry-run`.
- Agent collaboration: read [Tasks, resume, and snapshots](/en/guide/tasks-and-resume) and [Agent collaboration](/en/guide/agent-workflow).
- Command lookup: open the [CLI reference](/en/reference/commands).
