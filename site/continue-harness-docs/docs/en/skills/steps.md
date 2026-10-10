# Execution steps

This page lists steps for operation Skills. Project constraints remain defined by `AGENTS.md`; an aggregate project Skill is not required.

## Operation Skills

### continue-harness-create

Use the Intake questions when multiple rounds of clarification are needed.

1. Confirm the project name, destination, goals, delivery scope, and project facts that affect collaboration or verification. Record runtime or toolchain facts when relevant; keep unknowns pending and do not enable specialized capabilities based on assumptions.
2. Check whether the CLI is available. The current package is unpublished; do not install an unpublished placeholder scope. Use a user-provided local repository or a verified source, following the host's permissions.
3. Run `continue-harness plan create <name> --output <dir> --json`, inspect the destination, then create it. By default, create only project constraints; use a specialized preset only when explicitly selected.
4. Confirm project facts through Intake. Select evidence from the project facts and task scope; project-type questions are candidates, not a fixed checklist. UI, interface, and visual-value records are not automatically required.
5. Register confirmed source evidence in the manifest with its type, source, version or hash, and task ID. Save and confirm requirements from conversation as project records before registering them. Do not require users to prepare a fixed document format.
6. Create a task and record requirement IDs, implementation items, and acceptance criteria in `docs/ACCEPTANCE.md` before implementation. Run project-configured checks with `verify feature --task <id>` or `verify audit --task <id>`.
7. Save status, decisions, execution logs, and a task snapshot. Report deferrals, blockers, and verification results distinctly.

The root `AGENTS.md` is the single project-constraint entry point. Creation does not overwrite existing project content or add task-irrelevant component, visual-value, or framework constraints.

### continue-harness-init

1. Read project constraints, documentation, structure, and existing checks. Confirm project goals, project shape, and current task; record runtime and toolchain facts only when they affect collaboration or verification.
2. Run `continue-harness plan init --json`. Review the per-file plan before running `continue-harness init`; existing files are preserved, and missing files are created individually.
3. Complete Intake. Select evidence from confirmed facts, record each source, applicability, and version, and give a reason for non-applicable items. Do not create placeholder inputs.
4. Run `inspect`, `doctor`, and `inputs inspect`; map the project's existing checks into verification configuration.
5. Restore the current task, valid requirements, decisions, acceptance state, and next steps. Confirm acceptance criteria before starting a new task.
6. Maintain the requirement → implementation item → acceptance item → evidence → handoff links, using existing project logs and history to preserve the process.

Enable visual, component, or interface-generation capabilities only when the current task requires them. Adoption does not require extracting visual values, rewriting styles, or replacing tools. Provider entry files point to `AGENTS.md`, and Skills are used as needed by stage.

### continue-harness-inspect

1. Run `continue-harness inspect --json` in the project root.
2. Translate the stable JSON codes into conclusions without modifying the project.
3. Report project facts, relevant documents, applicable inputs, configured verification, and Agent workflow. Include visual references only when the project uses that capability.
4. For unconfigured items, suggest what to add; do not describe them as failures or as complete.
5. Switch to `continue-harness-doctor` when specific diagnostics are needed.

### continue-harness-plan

- New project: `continue-harness plan create <name> --output <complete target directory> --json`.
- Existing project: `continue-harness plan init --json`.
- Explain `create`, `managed_unchanged`, and `project_owned_modified`; the latter means an existing file is preserved and does not prevent other missing files from being created.
- `--output` is the complete project directory, not its parent.
- The plan stage installs no dependencies and writes no files; it lists files to create, unchanged managed files, and project-modified files.

### continue-harness-doctor

1. Run `continue-harness doctor --json`; run `continue-harness doctor` when a human-readable output is needed.
2. Group by failure, pending confirmation, unconfigured, pass, and not applicable; do not promote heuristic advice into deterministic errors.
3. Fix deterministic failures first, reading the advice and project facts before the fix.
4. Report toolchain, port permission, registry, or Corepack problems separately from business failures.
5. Doctor is read-only; do not modify the project when the user only asked for diagnostics.
6. Rerun once after a fix and report capabilities that remain unconfigured.

### continue-harness-verify

Read the project configuration and the current task's acceptance criteria, then select checks for the task scope. Use `quick` for rapid feedback and `feature` or `audit` for task acceptance. Run `continue-harness verify feature --task <id>` or `continue-harness verify audit --task <id>` to bind the result to an explicit task.

Each row in `docs/ACCEPTANCE.md` must link a valid requirement, implementation item, and readable local evidence. Record a reason, owner, and follow-up condition for deferrals or blockers; neither counts as passed. Update existing legacy rows instead of creating a parallel ledger.

Use `runtime`, `interaction`, or `visual` modes only when configured and relevant to the project. Do not add browser, visual, or screenshot requirements to every project. Rerun verification when inputs, implementation, or criteria change, and report completion only when checks and acceptance both meet the current scope.

### continue-harness-inputs

1. Read Intake facts about project goals, project shape, and current task to determine which evidence implementation and acceptance need.
2. Treat project-type questions as candidates; select inputs from the conversation and record why they apply. Mark non-applicable items `not_applicable` with a reason. Custom input types use lowercase names such as `data_contract` or `deployment`.
3. Register `id`, `type`, `path`, `status`, `task_id`, `source`, and version or `sha256` in `inputs/manifest.yaml`. Preserve the original evidence.
4. Run `inputs inspect --json` and `inputs diff --json`. Reconfirm changed inputs and rerun acceptance verification when needed.
5. `inputs analyze --json` provides text clues; it does not prove that requirements were fully understood. Use suitable tools to interpret images, PDFs, and other non-text material.
6. Link requirement input IDs to implementation items, acceptance criteria, and evidence in `docs/ACCEPTANCE.md`. Ask the user to resolve uncertain goals or conflicts.

Do not presume that visual, prototype, interface, or design-value records are required; load their specialized instructions only when the task needs them.

### continue-harness-task

1. Restore an existing task with `resume --task <id> --json`; create a new ID with `task create --title "<title>" --json`.
2. Register valid requirements and link their IDs, implementation items, and acceptance criteria in `docs/ACCEPTANCE.md`. Confirm scope and non-goals before implementation.
3. After implementation, run `verify feature --task <id>` or `verify audit --task <id>`. The report must match the task and current input and implementation versions.
4. Update current status, decisions, and necessary logs. Record reasons, owners, and follow-up conditions for deferrals or blockers; do not mark them passed.
5. Create a handoff snapshot with `task snapshot <id> --title "<title>" --request "<request>" --json`. The snapshot preserves acceptance links, context, and a copy of the verification report. Rerun verification when the report no longer matches.
6. State the goal, completed and unfinished work, evidence locations, risks, and next steps in the handoff. Record revisions with a new snapshot.

Do not create parallel ledgers or add visual-value files unrelated to the task.

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
