# Execution steps

This page lists execution steps per Skill. Aggregate workflow Skills get the full flow; command-level Skills get the main steps.

## Aggregate workflow Skills

### generic-harness

The generic project workflow is installed by default. Confirm project facts, select inputs from the toolchain and task scope, then use the project-configured CLI checks, verification and handoff. Enable specialized inputs only after confirming applicability.

#### Read order

1. `.continue-harness/project.yaml`
2. `.continue-harness/intake.yaml`
3. `AGENTS.md`
4. `docs/PROJECT.md`, `docs/CURRENT_STATUS.md`, `docs/ACCEPTANCE.md`
5. `docs/DECISIONS.md`, the current task, active inputs, snapshots, and logs

#### Responsibility boundaries

`inputs/` holds raw evidence, `logs/` holds an append-only execution trail, `docs/history/` holds immutable handoff snapshots, and `docs/DECISIONS.md` holds long-lived decisions. Do not copy the same content between these directories.

#### Handoff requirements

Each round records goal, basis, changes, verification, failed retries, risks, and next steps. Only confirmed facts enter canonical context.

#### Intake and acceptance

The second Intake round confirms inputs item by item: required items need a source, non-applicable items are marked `not_applicable`, and placeholder documents do not stand in for evidence. Close out acceptance status and keep the latest verification report before a task handoff.

### consumer-h5-harness

The full Consumer H5 flow, installed with `--preset consumer-h5`. These 15 steps follow the Skill's automatic workflow.

1. Restore context: run `continue-harness resume --json` when taking over an existing task, and `continue-harness inspect --json` when nothing is resumable.
2. Run `continue-harness doctor` when project validity is uncertain.
3. Read the input manifest: `continue-harness inputs inspect --json`. For a newly created project with no inputs, show the five input directories and pause business implementation.
4. Analyze inputs against the three priorities: business, interaction, and Tokens.
5. Build the page and flow list from PRD/RP, trace every reachable node recursively, and output the page split, route registration, and layering plan. Keep `.continue-harness/models/page-flow.yaml` and `layout-specs.yaml` in sync.
6. Check `docs/design/tokens.json`; when UI/RP inputs exist and Tokens are empty or `pending_extraction`, extract or update them first.
7. Update the coverage matrix `docs/IMPLEMENTATION_COVERAGE.md` before coding.
8. Run `continue-harness plan init --json` or `continue-harness plan create <name> --json`.
9. Implement the project code without overwriting project-owned content.
10. Run verification for the change type; the mapping is in the table below.
11. Fix in-scope failures, with at most two retry rounds.
12. Update `docs/CURRENT_STATUS.md`, `docs/DECISIONS.md`, `docs/history/PRD_HISTORY.md`, `docs/history/CHANGE_HISTORY.md`, and `docs/CHANGELOG.md`.
13. Re-walk entries and every transition against the PRD/RP; implement remaining gaps and raise blockers as a batch. Write visual adjustments into `.continue-harness/ui/adjustments.yaml` as token, component, layout, responsive, or page_exception.
14. After closure, create the immutable task snapshot: `continue-harness task snapshot <task ID> --json`.
15. Report actual implementation, actual verification, explicit deferrals, and remaining risks, then list executable numbered next actions.

| Change type | Verification command |
| --- | --- |
| Logic | `pnpm harness:quick` |
| Completed feature | `pnpm harness:feature` |
| Runtime | `pnpm harness:runtime` |
| Interaction | `pnpm harness:interaction` |
| UI, styles, layout | `pnpm harness:visual` |
| Configuration or cross-module | `pnpm harness:audit` |

Report visual verification as not configured when no baseline exists. A passing build, an openable page, a passing E2E run, or a passing screenshot does not equal product acceptance.

## Command-level Skills

### continue-harness-create

Confirm goals, project type, toolchain and task-specific inputs. Preview creation and create a constraint workspace. Register actual evidence, define acceptance criteria, implement, verify and save the handoff. Specialized presets require explicit selection.

### continue-harness-init

Inspect the existing project and preview initialization. Preserve its files and conventions. Select evidence through Intake, map existing checks, and restore task and acceptance state. Adoption does not require Token extraction or style changes.

### continue-harness-inspect

1. Run `continue-harness inspect --json` in the project root.
2. Translate the stable JSON codes into conclusions without modifying the project.
3. Report project and toolchain, fact documents, inputs, the single Token source, verification modes, and Agent workflow separately.
4. For unconfigured items, suggest what to add; do not describe them as failures or as complete.
5. Switch to `continue-harness-doctor` when specific diagnostics are needed.

### continue-harness-plan

- New project: `continue-harness plan create <name> --output <complete target directory> --json`.
- Existing project: `continue-harness plan init --json`.
- Explain `create`, `managed_unchanged`, `project_owned_modified`, `template_update_available`, and `true_conflict`.
- `--output` is the complete project directory, not its parent.
- The plan stage installs no dependencies and writes no files; on true conflicts, list the exact files and decision points.

### continue-harness-doctor

1. Run `continue-harness doctor --json`; run `continue-harness doctor` when a human-readable output is needed.
2. Group by failure, pending confirmation, unconfigured, pass, and not applicable; do not promote heuristic advice into deterministic errors.
3. Fix deterministic failures first, reading the advice and project facts before the fix.
4. Report toolchain, port permission, registry, or Corepack problems separately from business failures.
5. Doctor is read-only; do not modify the project when the user only asked for diagnostics.
6. Rerun once after a fix and report capabilities that remain unconfigured.

### continue-harness-verify

Run project-configured checks. Use `verify feature/audit --task <id>` for acceptance. Verified rows require requirement, implementation and evidence links. Deferrals and blockers retain their reasons and do not count as passed.

### continue-harness-inputs

Register project-selected inputs with source, version or hash and task ID. Custom types are supported. Record reasons for applicability, inspect changes and link requirements to acceptance. UI, API and Tokens are optional.

### continue-harness-task

Restore or create a task, define acceptance links before implementation, verify with an explicit task ID, and save current state and a snapshot. Snapshots preserve report copies and context; outdated reports require another verification.

### continue-harness-design-tokens

1. Run `continue-harness design tokens inspect --json`; for an existing project, run `continue-harness design tokens discover --json` first.
2. Token priority is high-fidelity UI, then RP, then the user's temporary visual requirement, then existing project Tokens, then DESIGN principles, then Harness defaults, then Agent inference.
3. When UI/RP exist but Tokens are pending extraction, confirm the input version and visual authority before editing `docs/design/tokens.json`.
4. `TOKENS.md` explains only; it does not copy a second set of values.
5. When the user explicitly overrides the UI, record before and after values, source, Token version, affected pages and components, and reason.
6. Run `continue-harness design tokens diff --json`; it is read-only and reports a diff only when the project supplies before/after versions. Record changes by comparing the values and updating change history.
7. Do not claim verified visual fidelity when no visual baseline exists.
8. Legacy extraction establishes current facts only and never rewrites the original styles; mark high-frequency repeated values as inferred candidates, mark multiple variable sets or same-semantics-different-value cases as conflicts, and write the single source of truth only after user confirmation.

### continue-harness-api

1. Read `AGENTS.md`, `.continue-harness/project.yaml`, the input manifest, the task PRD, and `.continue-harness/api/selection.yaml`.
2. When the Apifox OpenAPI JSON is absent, ask for the exported file; do not ask for a token when a local export suffices, and never persist credentials.
3. Register the file in `.continue-harness/inputs/manifest.yaml` as an active `api` input and keep the original as read-only evidence.
4. Derive required operationIds from the PRD; when several candidates plausibly satisfy a core flow, let the user choose and never invent an operationId.
5. Configure the task in `.continue-harness/api/selection.yaml`:

```yaml
tasks:
  T001:
    prd_inputs: [PRD-T001]
    api_input: API-001
    operations: [getUser]
```

6. Run `continue-harness api inspect --task T001 --json`.
7. Run `continue-harness api generate --task T001 --dry-run --json`; stop on `conflict` and move business mapping into non-generated files.
8. After a clean plan, run `continue-harness api generate --task T001`.
9. Put error normalization, DTO-to-view-model mapping, caching, and orchestration in separate non-generated files; never edit `api.generated.ts` directly.
10. Run `continue-harness verify quick`, and switch to `continue-harness verify feature` once the interface is wired into a feature.
11. Record changed files, input IDs, selected operationIds, and actual verification in task history.

Boundary: the PRD decides product scope, and OpenAPI decides method, path, parameters, request body, and response shape. Discrepancies affecting core flow, authentication, payment, permissions, or data shape are a confirmation boundary. Generated code is transport infrastructure and carries no business semantics. Local OpenAPI 3.x and Swagger 2.0 JSON exports are supported; online Apifox sync is a later adapter.

### continue-harness-skills

1. Decide which Skill to install; the list is in [Built-in skills](./index.md).
2. Project install: copy `skills/<name>/` from the repository into `.agents/skills` (Codex, Cursor) or `.claude/skills` (Claude Code); the equivalent CLI command is `continue-harness skills install --project --provider <codex|claude|cursor|all>`.
3. Confirm with the user before a global install, then copy into `~/.codex/skills`, `~/.claude/skills`, or `~/.cursor/skills`; the equivalent CLI command is `continue-harness skills install --global --provider <codex|claude|cursor|all>`.
4. Use `--name <name>` for a single Skill.
5. Existing content is skipped by default; use `--force` only when the user explicitly asks for an update, and check user-maintained content before overwriting.
6. Use `--target <complete directory>` for a custom global directory.
7. After installation, read the target `SKILL.md` and report what was installed, skipped, and failed.
8. Skills are callable workflows, not the constraint body; constraints live only in the repository root `AGENTS.md`.

### continue-harness-version

1. Run `command -v continue-harness` and `continue-harness version`; `continue-harness -v` or `continue-harness --version` work for a short check.
2. Compare with `harness.version` in `.continue-harness/project.yaml` and report the result.
3. When the CLI is missing, do not use an unknown package with the same name; state the install command and request approval for a global install.
4. When the package is unpublished or the version does not satisfy the project, stop related writes and offer a local tarball, the published registry package, or a project configuration upgrade.
