# continue-harness

[中文](README.md) ｜ [English](README.en.md)

`continue-harness` is a business-agnostic project collaboration and quality harness. It provides
traceable project constraints, resumable AI handoffs, configuration-driven verification, diagnostics,
reports, initialization templates, and CI entry points.

The first profile targets:

- Product profile: `consumer-h5`
- Platform adapter: `web-mobile`
- Stack adapter: `uni-app`

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

`create` generates a real consumer-H5 project with uni-app, Vue 3, Vite, Playwright, project facts,
automatic Agent instructions, and the default aggregate Consumer H5 workflow Skill. It installs
project dependencies by default; use `--skip-install` for offline scaffolding. `init` connects an
existing project without overwriting project-owned files. AI agents should use `inspect` and `plan`
before mutation, then invoke the appropriate verification mode automatically.

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
