# Project structure details

The default generic structure separates project facts, raw inputs, task history, implementation
code, and verification evidence without assuming a framework:

```text
.continue-harness/       configuration, inputs, API selection, models, UI adjustments
docs/              product, design, decisions, status, history, coverage
src/               project-owned implementation
tests/             project-owned unit, runtime, interaction, and visual checks
tmp/continue-harness/  generated reports and command logs
```

The generic preset does not generate `src/`, framework configuration, or business modules. The
exact implementation directories belong to the target project or an explicitly selected Stack
Adapter. The detailed uni-app tree documented below this level applies only to the explicit
Consumer H5 preset. Harness templates must remain business-neutral and must not replace existing
project-owned files.
