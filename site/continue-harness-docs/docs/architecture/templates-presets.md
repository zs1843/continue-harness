# 模板与 Preset

Templates 和 Presets 都是业务中立文件来源：Templates 供 `init` 接入已有项目，Presets 供 `create` 创建新项目。本页列出实际文件清单和写入边界。

## Templates

`init` 按 `templates/` 到目标路径的固定映射补齐缺失文件：

| 模板 | 目标路径 |
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

`presets/generic/` 是默认 preset，创建只包含通用约束、输入、任务、日志、上下文和验收容器的项目：

- `AGENTS.md`、`CLAUDE.md`、`.cursor/rules/continue-harness.mdc`
- `docs/PROJECT.md`、`docs/CURRENT_STATUS.md`、`docs/DECISIONS.md`、`docs/ACCEPTANCE.md`、`docs/history/README.md`
- `.continue-harness/project.yaml`、`.continue-harness/intake.yaml`
- `.continue-harness/inputs/README.md`、`.continue-harness/inputs/manifest.yaml`
- `.continue-harness/logs/README.md`
- `.gitignore`

`presets/consumer-h5/` 是显式选择的专项 preset，在通用容器之外创建可运行的 minimal uni-app H5 工程：

- `package.json`、`tsconfig.json`、`vite.config.mjs`、`index.html`
- `src/App.vue`、`src/main.ts`、`src/manifest.json`
- `src/pages.json`、`src/pages/index/index.vue`
- `src/services/http.ts`、`src/components/BaseButton.vue`、`src/styles/tokens.scss`
- `playwright.config.mjs`、`tests/e2e/dev-ready.mjs`、`tests/e2e/runtime.spec.mjs`、`tests/e2e/visual.spec.mjs`、`tests/structure.test.mjs`、`tests/coverage-closure.mjs`
- `.continue-harness/` 配置、模型、输入和快照目录
- `docs/` 项目文档

## 边界

Preset 只创建容器、目录和工程能力，不放业务示例页：真实项目应从 PRD/RP/UI/API 输入生成业务页面，输入为空时项目保持等待输入。`init` 在写入前预检，不覆盖项目已维护文件。
