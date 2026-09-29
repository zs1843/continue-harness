# Inputs and evidence

The harness separates raw inputs, project facts, and task evidence. The project owns source files; continue-harness registers, analyzes, and tracks their changes.

## Input types

| Type | Default directory | Purpose |
| --- | --- | --- |
| PRD | `.continue-harness/inputs/prd/` | Goals, rules, and acceptance criteria |
| RP | `.continue-harness/inputs/rp/` | Page flows, states, actions, and return paths |
| UI | `.continue-harness/inputs/ui/` | Visual references, screenshots, and design notes |
| API | `.continue-harness/inputs/api/` | OpenAPI or Apifox exports |
| assets | `.continue-harness/inputs/assets/` | Images, icons, fonts, and other assets |

## Inspect, analyze, and diff

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
```

- `inspect` checks the manifest, files, hashes, unregistered inputs, and active conflicts.
- `analyze` extracts business, interaction, and visual evidence from text PRD/RP/UI files and reports conflicts.
- `diff` summarizes input changes so old conclusions can be reconsidered.

Input analysis is heuristic. PDFs, images, and complex binary prototypes still need Agent or tool-assisted interpretation.

## Bind evidence to a task

Task metadata can reference PRD, RP, and API inputs. API work also selects operationIds in `.continue-harness/api/selection.yaml`. A snapshot can then explain what the change used, generated, and verified.
