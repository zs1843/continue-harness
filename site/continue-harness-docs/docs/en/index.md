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

## Current implementation boundary

| Layer | Current implementation | Boundary |
| --- | --- | --- |
| Core | Configuration, diagnostics, input analysis, tasks, resume, verification, reports | Independent of product and framework |
| Product Profile | `consumer-h5` | The product-shape profile currently included in the repository |
| Platform Adapter | `web-mobile` | The mobile Web acceptance adapter currently included in the repository |
| Stack Adapter | `uni-app` | The uni-app, Vue 3, and Vite adapter currently included in the repository |
| Optional capabilities | OpenAPI, Design Token, UI Contract, UI System | Enabled when task evidence requires them |

## Default workflow

```bash
continue-harness create my-h5
cd my-h5
continue-harness inspect --json
continue-harness inputs inspect --json
continue-harness task create --title "Implement the first scoped change" --json
continue-harness resume --json
continue-harness verify feature
```

The default project setup installs the aggregate `consumer-h5-harness` Skill. Deeper Skills are installed only when a task needs them.
