---
layout: home

hero:
  name: continue-harness
  text: Resumable project collaboration and quality
  tagline: Keep project facts, Agent workflows, verification reports, and task history in one executable protocol.
  actions:
    - theme: brand
      text: Get started
      link: /en/guide/overview
    - theme: alt
      text: View architecture
      link: /en/architecture/overview

features:
  - title: Project neutral
    details: Core does not contain business pages, brands, API paths, status enums, or design values. Target projects own their facts.
  - title: Evidence first
    details: Register, analyze, and bind PRD, RP, UI, API, and asset inputs to tasks before implementation.
  - title: Resumable collaboration
    details: Task IDs, snapshots, reports, Git state, and next actions let another Agent continue without losing context.
---

## What it is

`continue-harness` is a project-neutral collaboration and quality harness. It does not choose a project's business, pages, APIs, or design. It provides a stable protocol for registering facts, loading constraints, numbering tasks, resuming work, running verification, and leaving evidence.

## Generic Core capabilities and boundary

| Layer | Current implementation | Boundary |
| --- | --- | --- |
| Core | Configuration, diagnostics, input analysis, tasks, resume, verification, reports | Independent of product, platform, language, and framework |
| Project integration protocol | Project facts, constraints, command mappings, logs, context, and acceptance records | Declared by the target project and its verification model |
| Evidence and extension capabilities | Input registration, contract analysis, design facts, UI Contract, UI System | Enabled by project facts and task evidence; independent of product, platform, and framework |

The repository's `consumer-h5`, `web-mobile`, and `uni-app` implementations are specialized adapter and regression-test samples. They are not required components of the generic harness and do not define the Core support boundary. Adapter availability must be established by the target project's configuration and corresponding verification evidence.

## Default workflow

```bash
continue-harness create my-project
cd my-project
continue-harness inspect --json
continue-harness inputs inspect --json
continue-harness task create --title "Implement the first scoped change" --json
continue-harness resume --json
continue-harness verify feature
```

The default project setup uses the `generic` preset and installs the aggregate `generic-harness` Skill. It provides technology-neutral project facts, inputs, tasks, logs, context, and acceptance constraints. OpenAPI, UI System, Design Token, visual baseline, and command-specific Skills are enabled when a task requires them. `consumer-h5` is an explicit specialized preset, not a Core technology boundary. Other products, platforms, and stacks declare their facts and verification commands in project configuration; platform- or framework-specific checks require a corresponding adapter.
