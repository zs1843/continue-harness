# Design Token details

The project should have one machine-readable Token authority, normally `docs/design/tokens.json`, with human explanation in `docs/design/TOKENS.md`.

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
continue-harness design tokens diff --json
```

Discovery reports candidates from existing styles. It does not silently promote inferred values or rewrite source styles. Token changes are recorded in task snapshots and visual evidence.
