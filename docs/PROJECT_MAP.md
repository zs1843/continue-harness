# continue-harness Project Map

## Purpose

`continue-harness` is a business-agnostic project collaboration and quality harness. It is consumed by
developers, CI pipelines, and coding agents through the same configuration and CLI.

## Top-level responsibilities

| Path | Responsibility |
| --- | --- |
| `packages/core/` | Configuration loading, verification execution, diagnostics, and reports |
| `packages/core/src/openapi.mjs` | Task-scoped OpenAPI inspection, TypeScript generation, and managed-file conflict protection |
| `packages/cli/` | Public command-line interface |
| `profiles/` | Product-shape verification descriptors |
| `platforms/` | Runtime and acceptance-platform descriptors |
| `stacks/` | Framework and toolchain descriptors |
| `ui-systems/` | 可选 UI System Adapter：组件语义、Token 映射和约束 |
| `templates/` | Business-neutral files created during initialization |
| `presets/` | Complete business-neutral projects created by the CLI |
| `skills/` | 完整 consumer-h5 工作流及每个 CLI 命令对应的可安装 Agent Skills |
| `templates/CLAUDE.md` | Claude Code 薄适配：导入唯一约束本体 `AGENTS.md` |
| `templates/CURSOR_RULE.mdc` | Cursor 薄适配：始终指向唯一约束本体 `AGENTS.md` |
| `schemas/` | Public configuration protocol |
| `examples/` | Disposable integration fixtures |
| `tests/` | Harness unit and orchestration tests |
| `docs/` | Architecture, status, roadmap, and adoption guidance |

## Dependency direction

```text
CLI -> Core
Core -> configuration only
Project configuration -> Profile + Platform + Stack selection
Profiles / Platforms / Stacks -> declarative descriptors
Examples -> public CLI behavior
Tests -> Core and CLI
```

Core must not import a Profile, Platform Adapter, Stack Adapter, example, or target project.

## Current packages

- `@company/continue-harness-core`: private workspace package containing the initial runtime.
- `@company/continue-harness`: private CLI package exposing the `continue-harness` executable.

两个包均已具备 pack 元数据，但尚未发布；`@company` 仍是待确定的 registry scope。

## Runtime requirements

- Node.js 20
- pnpm
- ESM

## Generated artifacts

Target projects receive reports under:

```text
tmp/continue-harness/
```

Generated reports and dependency directories are ignored by Git.

Consumer-H5 API generation writes `src/types/api.generated.ts`,
`src/services/api.generated.ts`, and `.continue-harness/api/generated.json`. The selection authority is
`.continue-harness/api/selection.yaml`; source exports remain under `.continue-harness/inputs/api/`.
