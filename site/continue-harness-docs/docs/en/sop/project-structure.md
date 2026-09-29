# Project structure details

The generated structure separates project facts, raw inputs, task history, implementation code, and verification evidence:

```text
.continue-harness/       configuration, inputs, API selection, models, UI adjustments
docs/              product, design, decisions, status, history, coverage
src/               project-owned implementation
tests/             project-owned unit, runtime, interaction, and visual checks
tmp/continue-harness/  generated reports and command logs
```

The exact framework directories belong to the selected Stack Adapter. Harness templates must remain business-neutral and must not replace existing project-owned files.
