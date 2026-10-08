# Current Status

Updated: 2026-10-08

## Completed

- Narrowed the active scope to requirement → implementation → acceptance → evidence → handoff.
  Inputs now accept project-defined types; Intake records applicability reasons and reopens confirmation
  after project-fact changes. Acceptance validates links and local evidence, and reports/snapshots bind
  to task and content fingerprints. Resume includes project facts, source documents and active inputs.
  Existing status-only acceptance tables require links and re-verification; earlier Pilot results are
  historical evidence, not a rerun of the stricter gate. Site display name is Continue Harness.
  Validation: 79 automated tests, ESLint, JavaScript syntax and project schema checks passed.
  The bilingual Site built successfully in a temporary copy, preserving existing artifact deletions.

- Reworked the documentation site into a skills-first handbook: single-source navigation (`navigation.mjs`)
  with a `首页` entry and an optional version switcher (`versions.mjs`), simplified page titles, removal of
  duplicated prompt blocks and duplicate Skill lists, and a new Skills section (install / built-in inventory
  / execution steps). Corrected capability-boundary claims, including a fabricated `plan create` sample,
  treating fixture-only UI System evidence as verified, a design-token diff that writes nothing, the
  `generic-harness` aggregate Skill name, and missing CLI commands. `pnpm docs:build` passes with no broken
  links or anchors, and the site gained a favicon.

- Reworked the default from an H5-shaped generator into a generic constraint and evidence harness:
  `create` now produces a technology-neutral container, and `consumer-h5` is an explicit preset rather
  than the default project shape.
- Added a stateful multi-round `intake` flow (`inspect` / `answer` / `evidence`) that confirms project
  facts first, then generates a minimal, project-type-specific input list instead of imposing UI/API/stack
  templates on every project.
- Added a generic acceptance-closure path, structured command/agent/decision logs, and richer
  `resume`/`task snapshot` handoff so a new agent can restore task, inputs, coverage, decisions, risks,
  and verification without relying on the previous conversation.
- Added a generic preset and a framework-neutral `chs-demo` fixture; kept `chs-demo-h5` as the standalone
  H5 adapter fixture.
- Validated the generic protocol against two unrelated real projects (HeTun-Site on React/Vite and
  Workbench-Admin on Vue 2/Vue CLI); both `T001` pilot tasks closed with `verify audit` passed, and the
  results are recorded in the documentation site showcase.

- Added repository CI on Node.js 20 with frozen installs, syntax checks, tests, Doctor, Audit verification,
  documentation build, and high-severity dependency audits. The nested documentation site now has an
  explicit independent-install policy and a root `docs:install` command.
- Added root ESLint for Harness JavaScript sources and real generated-project ESLint plus `vue-tsc --noEmit`
  gates. CI installs the generated project's locked dependencies independently before running these checks.
- Added standards-compliant Ajv project-schema validation and tracked-file safety checks to the CI gate.
- Added Core/CLI tarball pack checks so package contents are validated before a future release decision.

- Created the Core and CLI workspace packages.
- Added YAML project configuration loading and focused runtime validation.
- Added Quick, Feature, Visual, and Audit command resolution.
- Added fail-fast and continue-on-error execution.
- Added Markdown, JSON, and per-command log reports.
- Added a read-only initial Doctor.
- Added safe initialization and dry-run behavior.
- Added the initial `consumer-h5` Product Profile.
- Added the initial `web-mobile` Platform Adapter.
- Added the initial `uni-app` Stack Adapter.
- Added a JSON Schema draft for project configuration.
- Added a minimal business-neutral uni-app H5 fixture.
- Added the initial Core and orchestration test suite; the current suite contains 71 passing tests.
- Verified example Doctor and Audit execution.
- Initialized an independent Git repository on branch `main`.
- Strengthened runtime validation for supported project, platform, stack, command, and verification
  values without adding a production dependency.
- Added stable Doctor check codes and focused remediation for missing project scripts.
- Changed initialization to preflight every target before writing, report create/unchanged/conflict
  states, and write nothing when any conflict exists.
- Added consumer-H5 product, current-status, decision, changelog, PRD-input, and UI-input templates.
- Added focused configuration, Doctor, initialization, creation, UI System protocol, and two independent
  flow-shape fixture tests; 71 tests now pass.
- Added lightweight Doctor checks for Node.js 20, package-manager/lockfile consistency, uni-app page
  registration and dependencies, Harness report ignore rules, and optional OpenAPI JSON snapshots.
- Added an optional `sources.api` configuration protocol for Apifox-exported OpenAPI snapshots,
  without adding an Apifox SDK or code-generation path.
- Replaced the placeholder example build with a real minimal uni-app Vue 3 H5 fixture using the
  official DCloud Vue 3 preset release line and Vite 5.2.8.
- Upgraded the uni-app page-registry Doctor check to parse `src/pages.json`, require at least one
  page, and verify that each registered Vue page component exists.
- Added a focused Playwright browser runtime check for the real fixture at the 390 x 844 mobile
  viewport. It verifies the HTTP response, core content, console errors, and uncaught page errors.
- Connected the runtime check to the fixture's Visual and Audit verification modes.
- Added `create`, `inspect`, and structured `plan` CLI commands. The consumer-H5 preset now generates
  a real project, local Harness scripts, project facts, PRD/UI/Snapshot inputs, Agent instructions,
  and a project-local validated Skill.
- Defined the automatic Agent workflow: inspect and diagnose, ask only at necessary authority or
  ambiguity boundaries, implement, select verification by change type, retry failures at most twice,
  and update current status and durable decisions.
- Added Agent automation readiness reporting to Inspect and Doctor. Consumer-H5 projects now fail
  Doctor when their Agent guide or project-local Harness Skill is missing or lacks core CLI rules.
- Added input analysis for registered PRD/RP/UI evidence. The analyzer extracts simple labelled
  conclusions, separates business/interaction/visual dimensions, and reports same-key conflicts
  without modifying original inputs.
- Added consumer-H5 dev ready verification through `test:dev-ready` and mapped it into runtime
  verification.
- Added a real Playwright screenshot visual spec, explicit baseline update command, and missing
  baseline handling. Missing screenshots are reported as `not_configured`; generated baselines allow
  visual verification to pass.
- Added environment-block classification for local port listen failures so toolchain restrictions
  are not reported as business failures.
- Added independently invokable Skills for create, init, inspect, plan, doctor, verify, inputs,
  Design Token, task, Skill installation, and version commands. Generated projects receive the
  complete Skill set.
- Upgraded `continue-harness-create` into a composite workflow covering CLI availability, necessary
  PRD/RP/UI/API/assets and Token-authority questions, dependency installation, initial diagnosis,
  engineering gates, and first-task history.
- Added `continue-harness skills list/install` with explicit project/global scopes and safe no-overwrite
  defaults.
- Changed project creation to install dependencies by default with an explicit `--skip-install`
  escape hatch.
- Added EditorConfig, Prettier, TypeScript-aware ESLint, local CI gate, Vite API proxy environment,
  typed `uni.request` HTTP wrapper, reusable formatting helpers, and a minimal base component to the
  consumer-H5 preset.
- Separated runtime from visual Playwright execution and left interaction explicitly unconfigured
  until a project supplies a real key flow.
- Prepared Core and CLI package metadata and CLI resource staging for npm packing. Publishing still
  requires a real package scope, registry, and explicit release approval.
- Established root `AGENTS.md` as the single project constraint body. Added thin Claude Code and
  Cursor adapters, Claude project Skill distribution, provider-aware project/global Skill
  installation, Inspect visibility, and Doctor drift checks without changing old project schemas.
- Added the first Apifox/OpenAPI code-generation path for local JSON exports. Tasks connect PRD and
  API evidence to selected operationIds, preview changes with dry-run, generate TypeScript request/
  response types and uni-app request wrappers, and refuse to overwrite manually changed generated
  files. Added the independently invokable `continue-harness-api` Skill.
- Added a requirement-closure workflow for PRD and HTML RP implementation. Agents must recursively
  inventory reachable pages, dialogs, states, actions, and return paths instead of stopping at the
  first-level page. The feature and audit gates now reject active PRD tasks with missing, unresolved,
  or unverifiable coverage rows; explicit deferrals and external blockers require recorded reasons.
- Added the framework-neutral UI System protocol, semantic Design Token marker, Page Flow Model,
  Layout Spec, visual-reference metadata, and structured UI-adjustment classification.
- Added an experimental TDesign UniApp Adapter descriptor without adding a production UI dependency.
  The CLI can list and safely install Adapter evidence; Doctor validates selection, version, component
  catalog, semantic mapping, Token mapping, page transitions, layout sections, and adjustment records.
- Validated the protocol against two independent fixtures: list-to-detail and form-to-result. These
  fixtures prove protocol generality only; real-project reduction in visual tuning remains unproven.
- Changed project creation intake to a two-stage flow: create the project container and standard input
  directories first, then collect/register PRD, RP, UI, API, and assets before creating the first
  business task. Empty fresh projects remain explicitly waiting for input.
- Added UI runtime lifecycle governance: Adapter installation remains dependency-free; an adopted UI
  runtime must be a version-locked production dependency, and framework replacement requires migration
  and verification before removing the old runtime.
- Added read-only existing-project Token discovery across Vue/CSS/SCSS/Less sources. Init now requires
  active inventory of CSS variables and recurring visual values before confirming semantic Tokens,
  while preserving existing styles and marking inferred or conflicting candidates explicitly.
- Reduced the default cognitive footprint without removing capabilities: create/init now install only
  the aggregate Consumer-H5 workflow Skill for Codex/Cursor and Claude, while command-specific Skills
  remain available through explicit installation. The CLI default help now presents
  `create/init → inputs → task → verify`, and Agents load design, API, and decision evidence only for
  relevant task types.
- Updated Agent handoff rules: each completed conversation turn lists a few concrete numbered next
  actions, and a number-only reply selects an action from the latest list without another selection
  round. Missing facts and required approval remain explicit boundaries.
- Added a generic UI Contract layer for Consumer H5 projects: adoption records, protected component
  inventory and boundaries, visual evidence guidance, stable/candidate/pending/legacy/page-specific
  Token states, UI Contract Doctor checks, and `ui contract inspect/inventory` commands. The layer
  remains business-neutral and does not import project-specific component paths or brand values.
- Fixed automatic task numbering so new tasks continue from legacy PRD files, manifest entries,
  history tables, coverage records, and task snapshot directories instead of restarting at `T001`.
- Added the first AI collaboration handoff command, `continue-harness resume`, which produces a read-only
  handoff state containing the current task, input status, snapshots, coverage closure, decisions,
  Git changes, and up to three next actions. It is also available as structured JSON for a new Agent.
- Migrated the canonical target-project state directory to `.continue-harness/`. Existing projects using
  `.fe-harness/` remain readable through a compatibility resolver and can be moved with
  `continue-harness migrate --dry-run` followed by `continue-harness migrate`.

## Verified commands

```text
pnpm install
pnpm test
node packages/cli/bin/continue-harness.mjs version
node packages/cli/bin/continue-harness.mjs init --dry-run
node ../../packages/cli/bin/continue-harness.mjs doctor
node ../../packages/cli/bin/continue-harness.mjs verify audit
```

## Current limitations

- The generic protocol is now validated against two unrelated real projects (HeTun-Site and
  Workbench-Admin), but a real Consumer H5 project's repository, input manifest, verification reports,
  and screenshots are not yet linked from this repository. The in-repo `chs-demo-h5` fixture remains the
  only consumer-h5 evidence, so the H5-specific public trail is still thin.

- Runtime validation still uses focused JavaScript rules; the CI contract now additionally validates the
  project configuration with the standards-compliant JSON Schema validator.
- Initialization deliberately provides only a lightweight terminal plan; it does not generate
  conflict patches, perform three-way merges, or roll back exceptional mid-write filesystem errors.
- Upgrade is not implemented.
- Online Apifox synchronization and token-based OpenAPI fetching are not implemented; the current
  adapter starts from a local Apifox OpenAPI JSON export. Referenced parameters, advanced media
  types, discriminator mapping, and provider-specific extensions remain future work.
- Doctor validates the repository CI entry point and `.env*` ignore rules; CI additionally checks tracked
  sensitive/generated paths, while full CI job semantic analysis remains future work.
- Platform Adapter defaults are not yet fully materialized automatically; the consumer-H5 preset
  configures its Playwright mobile viewport explicitly.
- Input analysis is heuristic and text-first; PDF/image/RP binary inputs still require Agent or
  tool-assisted interpretation.
- No CI release pipeline, package registry, remote repository, or published npm package exists.
- No Codex Plugin exists.
- UI System effectiveness has not yet been measured against two unrelated real projects with real UI
  references; TDesign UniApp remains experimental and is not a preset dependency.
- UI Contract component inventory scanning currently targets Vue/uni-app source layouts; protected
  component changes are documented and reviewed by confirmation, but are not yet detected from Git
  diffs automatically.

## Next recommended task

Validate the stricter requirement-to-acceptance links and task-bound report freshness in real projects.
Backfill existing acceptance records without replacing project-owned content. Adapter, template,
upgrade and publishing expansion is deferred while the core delivery loop is stabilized.

Do not restart the repository scaffold or copy files from a business project.
