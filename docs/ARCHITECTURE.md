# Architecture

## Composition model

Target-project behavior is composed from four sources:

```text
Core
  + Product Profile
  + Platform Adapter
  + Stack Adapter
  + optional UI System Adapter
  + Project-owned configuration
```

### Core

Core owns:

- Configuration loading and validation.
- Named command resolution.
- Fail-fast and non-fail-fast execution.
- Process exit semantics.
- Doctor diagnostics.
- Markdown, JSON, and command-log reports.

Core does not understand UI pages, business domains, product copy, brands, or API payloads.

Profiles, Platform Adapters, and Stack Adapters are independent extension points. The entries below
are the initial public implementations, not a limitation imposed by Core; other combinations can be
supported when their corresponding descriptors are available.

Core 只理解 UI System Adapter 的通用描述协议，不导入 TDesign、Vant 或其他组件库。项目拥有
语义 Design Token；Adapter 负责将其映射到具体框架变量。Page Flow Model 承接 RP 的页面与
交互事实，Layout Spec 承接页面组合和视觉参考元数据，UI Reference 只用于校准和验收。

### Product Profile

A Product Profile describes verification priorities caused by the shape of a product. The initial
public profile is `consumer-h5`.

### Platform Adapter

A Platform Adapter describes runtime acceptance behavior. The initial public adapter is `web-mobile`.

### Stack Adapter

A Stack Adapter describes framework and toolchain integration. The initial public adapter is `uni-app`.

## Configuration ownership

Each target project owns `.continue-harness/project.yaml`. The file selects adapters and maps symbolic
verification steps to actual project commands.

Projects created before the directory migration may still own `.fe-harness/project.yaml`; Core resolves
the canonical directory first and falls back to the legacy directory until it is explicitly migrated.

The Harness repository also has a self-maintenance configuration using the internal
`developer_tooling + node + node-esm` combination. That combination describes this repository only;
it is not a public target-project preset in version `0.1.0`.

## Verification modes

- Quick: fast, fail-fast feedback.
- Feature: completed-change gate.
- Visual: platform visual and interaction checks.
- Audit: run all configured checks and report all failures.

Consumer-H5 feature completion includes a requirement-closure gate. An active PRD is not complete
until every extracted RP/PRD node is individually verified, explicitly deferred by the user, or
recorded as externally blocked. Build, first-page runtime, and screenshot success are supporting
evidence, not substitutes for coverage closure.

## Safety model

- Initialization must not overwrite existing files.
- Dry-run must be available before mutation.
- Doctor is read-only.
- Upgrade must eventually produce a patch before applying conflicts.
- Credentials remain project-owned and must not enter package templates.
- API generation is task-scoped: PRD selects operationIds, while OpenAPI remains the transport data
  contract. Generated files are updated only when their recorded hash proves they remain managed.
- Publishing and remote repository operations require explicit approval.

## Agent constraint authority

`AGENTS.md` is the single project constraint body. Provider files are managed adapters:

- Codex reads root `AGENTS.md` and project workflows from `.agents/skills/`.
- Claude Code reads `CLAUDE.md`, which imports `AGENTS.md`, and workflows from `.claude/skills/`.
- Cursor reads root `AGENTS.md`; `.cursor/rules/continue-harness.mdc` only makes that authority explicit,
  while workflows remain under the provider-neutral `.agents/skills/` path.

Provider adapters must not copy project constraints. Skills define invokable procedures and never
override the canonical project constraints.
