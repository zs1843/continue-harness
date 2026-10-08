# continue-harness

[中文](README.md) ｜ [English](README.en.md)

`continue-harness` is a technology-neutral project constraint and quality harness. It provides
traceable project facts, resumable AI handoffs, input and decision management, structured logs,
automated verification, acceptance closure, and auditable reports.

The repository currently includes these optional adapters:

- Product profile: `consumer-h5`
- Platform adapter: `web-mobile`
- Stack adapter: `uni-app`

These adapters are enabled only by an explicit preset. The default project is not bound to a language,
framework, or technology stack.

## Installation

Version `0.1.0` is not published to npm yet, and `@company` is still a placeholder scope. Install dependencies from the source repository:

```bash
git clone https://github.com/zs1843/continue-harness.git
cd continue-harness
pnpm install
node packages/cli/bin/continue-harness.mjs version
```

Requirements: Node.js 20 or later, and pnpm 10.12.1 or a compatible version. The commands below use `continue-harness` as the installed CLI name; when running directly from the source repository, replace it with `node packages/cli/bin/continue-harness.mjs`.

## Quick start

### Create a project

```bash
continue-harness plan create project-core --json
continue-harness create project-core
cd project-core
continue-harness intake inspect --json
continue-harness intake answer --type backend --json
continue-harness inspect --json
continue-harness doctor
```

`create` generates only a constraint container by default; it does not create business code or
technology-specific dependencies. After confirming the project type, use `intake answer` to generate
the minimum evidence checklist and enable adapters only when needed.

### Adopt an existing project

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

`init` preflights the project, creates missing files, and preserves files already owned by the project. A real conflict prevents all writes.

### Register inputs and verify a task

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "Implement the first scoped change"
continue-harness verify feature
```

## Commands

```bash
continue-harness create my-h5 --dry-run
continue-harness create my-h5
continue-harness init --dry-run
continue-harness init
continue-harness migrate --dry-run
continue-harness inspect --json
continue-harness plan init --json
continue-harness plan create my-h5 --json
continue-harness doctor
continue-harness verify quick
continue-harness verify feature
continue-harness verify visual
continue-harness verify audit
continue-harness inputs inspect --json
continue-harness design tokens inspect --json
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
continue-harness task create --title "首次需求"
continue-harness skills list --json
continue-harness skills install --project
continue-harness skills install --global
continue-harness version
continue-harness -v
continue-harness --version
```

`create --preset consumer-h5` generates the uni-app, Vue 3, Vite, and Playwright H5 project contents.
`init` connects an existing project without overwriting project-owned files. AI agents should restore
context and Intake first, then register evidence, create tasks, and select verification from project
configuration.

Command-specific Skills remain available through explicit installation when a task needs them.

`AGENTS.md` is the only project constraint body. Generated `CLAUDE.md` imports it, Cursor receives a
thin always-applied rule pointing to it, and Codex/Cursor use `.agents/skills` while Claude Code uses
`.claude/skills`. Install workflows for supported providers with:

```bash
continue-harness skills install --project --provider all --name consumer-h5-harness
continue-harness skills install --global --provider claude
continue-harness skills install --global --provider cursor
```

## Architecture

```text
Core
  + Product Profile
  + Platform Adapter
  + Stack Adapter
  + Project-owned configuration
```

Core does not contain product pages, domain states, API endpoints, brand values, or design tokens.
It also does not import a concrete UI library. Optional UI System Adapters map semantic components and
project-owned semantic tokens to a selected library; see `docs/UI_SYSTEMS.md`.

## Documentation site

A deployable VitePress documentation site lives under `site/continue-harness-docs/`. It explains the
background, SOP, module design, Agent workflow, verification strategy, and static deployment path.

Online documentation: [https://ai.zs1843.cn](https://ai.zs1843.cn)

For concrete behavior and current limits, see the [project case study](site/continue-harness-docs/docs/showcase/case-study.md)
and [reproducible CLI example](site/continue-harness-docs/docs/showcase/workflow-example.md).

```bash
cd site/continue-harness-docs
pnpm install
pnpm docs:build
```

## Status

This repository is an initial `0.1.0` implementation. Core and CLI packages can be packed for
registry verification, but the placeholder `@company` scope must be replaced or configured before
publishing. Publishing, upgrades, API contract adapters, and additional project profiles remain
explicit release decisions.
