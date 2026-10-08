# Templates and presets

Templates and presets are both sources of business-neutral files: templates serve `init` when adopting an existing project, and presets serve `create` when starting a project. This page lists the actual file inventory and the write boundary.

## Templates

`init` fills in missing files through a fixed mapping from `templates/` to target paths:

| Template | Target path |
| --- | --- |
| `templates/AGENTS.md` | `AGENTS.md` |
| `templates/CLAUDE.md` | `CLAUDE.md` |
| `templates/CURSOR_RULE.mdc` | `.cursor/rules/continue-harness.mdc` |
| `templates/PROJECT_MAP.md` | `docs/PROJECT_MAP.md` |
| `templates/DESIGN.md` | `docs/DESIGN.md` |
| `templates/PRODUCT.md` | `docs/PRODUCT.md` |
| `templates/CURRENT_STATUS.md` | `docs/CURRENT_STATUS.md` |
| `templates/DECISIONS.md` | `docs/DECISIONS.md` |
| `templates/CHANGELOG.md` | `docs/CHANGELOG.md` |
| `templates/INPUTS.md` | `.continue-harness/inputs/README.md` |
| `templates/INPUT_MANIFEST.yaml` | `.continue-harness/inputs/manifest.yaml` |
| `templates/PRD_INPUT.md` | `.continue-harness/inputs/prd/README.md` |
| `templates/RP_INPUT.md` | `.continue-harness/inputs/rp/README.md` |
| `templates/UI_INPUT.md` | `.continue-harness/inputs/ui/README.md` |
| `templates/API_INPUT.md` | `.continue-harness/inputs/api/README.md` |
| `templates/ASSETS_INPUT.md` | `.continue-harness/inputs/assets/README.md` |
| `templates/API_SELECTION.yaml` | `.continue-harness/api/selection.yaml` |
| `templates/SNAPSHOTS.md` | `.continue-harness/snapshots/README.md` |
| `templates/PRD_HISTORY.md` | `docs/history/PRD_HISTORY.md` |
| `templates/CHANGE_HISTORY.md` | `docs/history/CHANGE_HISTORY.md` |
| `templates/IMPLEMENTATION_COVERAGE.md` | `docs/IMPLEMENTATION_COVERAGE.md` |
| `templates/TOKENS.json` | `docs/design/tokens.json` |
| `templates/TOKENS.md` | `docs/design/TOKENS.md` |
| `templates/COMPONENTS.md` | `docs/design/COMPONENTS.md` |
| `templates/UI-CONTRACT-ADOPTION.md` | `docs/UI-CONTRACT-ADOPTION.md` |
| `templates/UI-COMPONENT-INVENTORY.md` | `docs/UI-COMPONENT-INVENTORY.md` |
| `templates/UI-COMPONENT-BOUNDARIES.md` | `docs/UI-COMPONENT-BOUNDARIES.md` |
| `templates/UI-CONTRACT-EVIDENCE.md` | `docs/ui-contract-evidence/README.md` |
| `templates/PAGE_FLOW_MODEL.yaml` | `.continue-harness/models/page-flow.yaml` |
| `templates/LAYOUT_SPECS.yaml` | `.continue-harness/models/layout-specs.yaml` |
| `templates/UI_ADJUSTMENTS.yaml` | `.continue-harness/ui/adjustments.yaml` |
| `templates/project.yaml` | `.continue-harness/project.yaml` |

## Presets

`presets/generic/` is the default preset. It creates a project with generic constraints, inputs, tasks, logs, context, and acceptance containers only:

- `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/continue-harness.mdc`
- `docs/PROJECT.md`, `docs/CURRENT_STATUS.md`, `docs/DECISIONS.md`, `docs/ACCEPTANCE.md`, `docs/history/README.md`
- `.continue-harness/project.yaml`, `.continue-harness/intake.yaml`
- `.continue-harness/inputs/README.md`, `.continue-harness/inputs/manifest.yaml`
- `.continue-harness/logs/README.md`
- `.gitignore`

`presets/consumer-h5/` is the explicitly selected specialized preset. Beyond the generic containers it creates a runnable minimal uni-app H5 project:

- `package.json`, `tsconfig.json`, `vite.config.mjs`, `index.html`
- `src/App.vue`, `src/main.ts`, `src/manifest.json`
- `src/pages.json`, `src/pages/index/index.vue`
- `src/services/http.ts`, `src/components/BaseButton.vue`, `src/styles/tokens.scss`
- `playwright.config.mjs`, `tests/e2e/dev-ready.mjs`, `tests/e2e/runtime.spec.mjs`, `tests/e2e/visual.spec.mjs`, `tests/structure.test.mjs`, `tests/coverage-closure.mjs`
- `.continue-harness/` configuration, model, input, and snapshot directories
- `docs/` project documentation

## Boundary

A preset creates containers, directories, and engineering capability only; it contains no business sample pages, because a real project generates business pages from PRD/RP/UI/API inputs. While inputs are empty the project stays waiting for input. `init` preflights before writing and does not overwrite files the project maintains.
