# Project structure

This page is the authoritative location for the directory tree and path responsibilities. The tree comes from the explicitly selected Consumer H5 preset.

Generate it with the `create` Skill.

**Skill**: `continue-harness-create`

**CLI (optional)**:

```bash
continue-harness create my-h5 --preset consumer-h5
```

The default generic preset generates only the Harness fact directory, the Agent entry, and the acceptance skeleton, with no `src/`, framework configuration, or business modules; the file differences between presets are in [Configuration and files](../reference/config-and-files.md).

## Markers

| Marker | Meaning |
| --- | --- |
| Required | Needed by the default workflow; do not delete unless explicitly migrated |
| Optional | Enabled only when the task or team needs it |
| On demand | Directory or README is generated; actual files appear when a task occurs |
| Project-owned | Maintained by the project team; the Harness does not overwrite it |
| Harness-managed | Managed by Harness templates or the CLI; read the plan before updating |

## Directory tree

```text
my-h5/
├── .continue-harness/                    # Harness project facts and task data
│   ├── api/
│   │   └── selection.yaml                # Task-scoped operationId selection
│   ├── inputs/
│   │   ├── api/README.md                 # Where to put API evidence
│   │   ├── assets/README.md              # Where to put asset evidence
│   │   ├── prd/README.md                 # Where to put PRD evidence
│   │   ├── rp/README.md                  # Where to put RP evidence
│   │   ├── ui/README.md                  # Where to put UI evidence
│   │   └── manifest.yaml                 # Input registration manifest
│   ├── models/
│   │   ├── layout-specs.yaml             # Page layout specs
│   │   └── page-flow.yaml                # Page flow and interaction model
│   ├── snapshots/README.md               # API and task snapshot notes
│   ├── ui/
│   │   └── adjustments.yaml              # Visual adjustment records
│   └── project.yaml                      # Single Harness configuration entry
├── .cursor/
│   └── rules/continue-harness.mdc        # Thin Cursor adapter rule
├── docs/
│   ├── design/
│   │   ├── COMPONENTS.md                 # Component semantics and usage boundaries
│   │   ├── TOKENS.md                     # Token explanation, without copied values
│   │   └── tokens.json                   # Single machine-readable Design Token truth
│   ├── history/
│   │   ├── CHANGE_HISTORY.md             # Implementation change history
│   │   └── PRD_HISTORY.md                # PRD input and requirement history
│   ├── CHANGELOG.md                      # Project-facing change log
│   ├── CURRENT_STATUS.md                 # Current status, limits, next steps
│   ├── DECISIONS.md                      # Long-term architecture and decisions
│   ├── DESIGN.md                         # Project design facts and visual principles
│   ├── IMPLEMENTATION_COVERAGE.md        # PRD/RP requirement coverage matrix
│   ├── PRODUCT.md                        # Project product facts
│   └── PROJECT_MAP.md                    # Project module map
├── src/
│   ├── components/
│   │   ├── BaseButton.vue                # Minimal base component example
│   │   └── README.md                     # Component boundary notes
│   ├── composables/README.md             # Reusable Vue composables
│   ├── fixtures/README.md                # Test and development fixtures
│   ├── pages/
│   │   └── index/
│   │       └── index.vue                 # Default placeholder home page
│   ├── repositories/README.md            # Business data mapping layer
│   ├── services/
│   │   ├── http.ts                       # Shared HTTP request wrapper
│   │   └── README.md                     # Service layer boundaries
│   ├── stores/README.md                  # Cross-page state
│   ├── styles/
│   │   ├── reset.scss                    # Global style reset
│   │   └── tokens.scss                   # Compile-time style Token mapping
│   ├── types/README.md                   # Type definition boundaries
│   ├── utils/
│   │   ├── format.ts                     # Shared formatting example
│   │   └── README.md                     # Pure function and utility boundaries
│   ├── App.vue                           # uni-app root component
│   ├── main.ts                           # Application entry
│   ├── manifest.json                     # uni-app application metadata
│   └── pages.json                        # Project page registration
├── tests/
│   ├── e2e/
│   │   ├── dev-ready.mjs                 # Development server readiness check
│   │   ├── runtime.spec.mjs              # Browser runtime check
│   │   └── visual.spec.mjs               # Screenshot visual check
│   ├── unit/README.md                    # Unit test conventions
│   ├── visual/
│   │   ├── baselines/README.md           # Visual baseline directory
│   │   ├── diffs/README.md               # Visual diff directory
│   │   └── README.md                     # Visual test notes
│   ├── coverage-closure.mjs              # Requirement closure check
│   └── structure.test.mjs                # Project structure check
├── .editorconfig                         # Editor base formatting
├── .env.example                          # Environment variable example, no real secrets
├── .eslintrc.cjs                         # ESLint configuration
├── .gitignore                            # Git ignore rules
├── .prettierignore                       # Prettier ignore rules
├── .prettierrc                           # Prettier configuration
├── AGENTS.md                             # Single canonical project constraint source
├── CLAUDE.md                             # Thin Claude Code adapter
├── env.d.ts                              # TypeScript environment declarations
├── index.html                            # Vite HTML entry
├── package.json                          # Project dependencies and scripts
├── playwright.config.mjs                 # Playwright configuration
├── tsconfig.json                         # TypeScript configuration
└── vite.config.mjs                       # Vite / uni-app build configuration
```

The keys of `.continue-harness/project.yaml` are documented in [Configuration and files](../reference/config-and-files.md).

## `.continue-harness/`

This is the Harness fact area, not a business source area.

| Path | Status | Purpose |
| --- | --- | --- |
| `.continue-harness/project.yaml` | Required / project-owned | Selects profile, platform, stack, commands, and verification modes |
| `.continue-harness/inputs/manifest.yaml` | Required | Records project-selected inputs, sources, versions and task associations |
| `.continue-harness/inputs/*/` | Required directories / filled on demand | Stores raw inputs; raw evidence is read-only by default |
| `.continue-harness/api/selection.yaml` | Required file / used on demand for API tasks | Selects operationIds per task |
| `.continue-harness/models/page-flow.yaml` | On demand | Records pages, states, actions, and transitions |
| `.continue-harness/models/layout-specs.yaml` | On demand | Records page composition and layout specs |
| `.continue-harness/ui/adjustments.yaml` | Used on demand for UI tasks | Records visual adjustments, before/after values, and impact |
| `.continue-harness/snapshots/` | On demand | Stores snapshot notes and related inputs |

Harness configuration, inputs, and task records live outside `src/`, so task evidence stays bound to the same task number while business code changes.

## `docs/`

This is the project's readable knowledge layer. Machines read `tokens.json`, `project.yaml`, and the YAML models; people and Agents read the Markdown explanations.

| Path | Status | Purpose |
| --- | --- | --- |
| `docs/PROJECT_MAP.md` | Required | Explains project modules and boundaries |
| `docs/CURRENT_STATUS.md` | Required | Records current completion, limits, and next steps |
| `docs/PRODUCT.md` | Required for business tasks | Records product facts |
| `docs/DESIGN.md` | Required for UI tasks | Records visual principles and authority |
| `docs/design/tokens.json` | Required for UI projects | Single machine-readable Token truth |
| `docs/design/TOKENS.md` | Required for UI projects | Explains Tokens without a second set of values |
| `docs/IMPLEMENTATION_COVERAGE.md` | Required for feature tasks | Records whether each requirement node is verified, deferred, or blocked |
| `docs/DECISIONS.md` | Optional for architecture decisions | Records long-term constraints and major tradeoffs only |
| `docs/history/` | Used after tasks | Records PRD and implementation changes |
| `docs/CHANGELOG.md` | Recommended | Change summary for project members |

## `src/`

This is the business implementation area. The Harness provides boundaries and a few neutral examples, and generates no concrete business module.

| Path | Status | Purpose |
| --- | --- | --- |
| `src/pages/` | Required | Page-level entries; distinct pages use distinct directories |
| `src/components/` | Required | Reusable UI components |
| `src/services/` | Required | HTTP, request wrappers, and external service calls |
| `src/repositories/` | Optional | Mapping from API responses to page business models |
| `src/stores/` | Optional | State shared across pages |
| `src/composables/` | Optional | Reusable Vue composition logic |
| `src/utils/` | Recommended | Cross-page pure functions and light utilities |
| `src/types/` | Recommended | Business and shared types |
| `src/fixtures/` | Optional for tests/development | Local fixtures and test data |
| `src/styles/` | Required | Reset and style Token mapping |
| `src/App.vue` | Required | uni-app root component |
| `src/main.ts` | Required | Application entry |
| `src/manifest.json` | Required | uni-app application metadata |
| `src/pages.json` | Required | uni-app page registration |

The boundaries of `src/pages/`, `src/components/`, `src/services/`, and `src/utils/` stay explicit: distinct pages are not merged into one Vue file, and API business mapping is not written into pages.

## `tests/`

| Path | Status | Purpose |
| --- | --- | --- |
| `tests/structure.test.mjs` | Required | Verifies directories, page registration, and base structure |
| `tests/coverage-closure.mjs` | Required for Consumer H5 features | Verifies the requirement coverage matrix is closed |
| `tests/e2e/dev-ready.mjs` | Recommended | Checks whether the development server is ready |
| `tests/e2e/runtime.spec.mjs` | Recommended | Checks page response, console errors, and uncaught errors |
| `tests/e2e/visual.spec.mjs` | Optional for UI tasks | Runs screenshot regression |
| `tests/visual/baselines/` | Optional for visual tasks | Stores confirmed visual baselines |
| `tests/visual/diffs/` | Optional for visual tasks | Stores screenshot diffs |
| `tests/unit/` | When business work needs it | Holds unit tests |

## Root engineering files

| File | Status | Purpose |
| --- | --- | --- |
| `package.json` | Required | Dependencies, scripts, and project name |
| `vite.config.mjs` | Required | Vite and uni-app build configuration |
| `playwright.config.mjs` | Recommended | Browser tests and mobile viewport configuration |
| `tsconfig.json` | Recommended | TypeScript type checking |
| `.eslintrc.cjs` | Recommended | ESLint rules |
| `.prettierrc` | Recommended | Formatting rules |
| `.editorconfig` | Recommended | Editor line endings, indentation, and encoding |
| `.env.example` | Recommended | Environment variable key names, without secrets |
| `.gitignore` | Required | Ignores dependencies, reports, environment files, and local artifacts |
| `AGENTS.md` | Required | Single constraint source for every Agent |
| `CLAUDE.md` | Optional for Claude Code | Vendor adapter that imports `AGENTS.md` |
| `.cursor/rules/continue-harness.mdc` | Optional for Cursor | Vendor adapter that points to `AGENTS.md` |
| `index.html` | Required | Vite HTML entry |
| `env.d.ts` | Optional for TypeScript | Environment type declarations |

## Deletable content

Once the project confirms it is not needed, these can be removed or adjusted:

- `src/components/BaseButton.vue`: a minimal base component example.
- `src/utils/format.ts`: a formatting example.
- The `README.md` files in each directory: merge them into the module map and delete when the team already maintains equivalent boundary notes.
- `tests/e2e/visual.spec.mjs` and the visual directories: disable when the project explicitly does no visual regression, and update the project config and documentation at the same time.
- `src/repositories/`, `src/stores/`, `src/composables/`, `src/fixtures/`: keep the empty-directory notes or remove them after team confirmation when the corresponding boundary is not needed.

Do not delete directly:

- `AGENTS.md`.
- `.continue-harness/project.yaml`.
- `docs/PROJECT_MAP.md` and `docs/CURRENT_STATUS.md`.
- `src/pages.json`, `src/main.ts`, `src/App.vue`.
- `tests/coverage-closure.mjs`, unless the product explicitly drops the requirement closure gate and the verification configuration is updated at the same time.

## Limits

The tree on this page matches the Consumer H5 preset; the generic preset is smaller, and the differences are in [Configuration and files](../reference/config-and-files.md). The visual directories ship with README files only, so `verify visual` returns `not_configured` without a baseline.
