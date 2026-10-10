# Example Agent Guide

Read `.continue-harness/project.yaml` and the task-relevant project inputs before changes.
Use `continue-harness inspect`, `continue-harness doctor`, and the appropriate `continue-harness verify` mode
automatically. Ask only for missing information or authority that cannot be inferred safely.

When PRD/RP/UI describes multiple pages, flow nodes, or return paths, split them into separate
uni-app pages under `src/pages/<module>/<page>.vue` and update `src/pages.json`. Keep pages focused
on orchestration; put shared UI in `src/components/`, reusable logic in `src/composables/`, and API
access in `src/services/` or `src/repositories/`.

If `docs/design/tokens.json` is `pending_extraction`, extract tokens from UI first, or from RP when
UI is unavailable. When UI is added later, update the JSON and record the token diff.

Put shared pure helpers in `src/utils/`; keep reactive lifecycle logic in composables and API/data
source details in services or repositories.
