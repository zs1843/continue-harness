# Create a project: detailed behavior

```bash
continue-harness plan create my-project --preset consumer-h5 --json
continue-harness create my-project --preset consumer-h5
```

The explicitly selected Consumer H5 preset creates a minimal uni-app + Vue 3 + Vite project, Playwright runtime and visual checks, `.continue-harness/` state, project facts, history, coverage, and the aggregate `consumer-h5-harness` Skill. The default generic preset is technology-neutral and installs `generic-harness`. Dependencies are installed unless `--skip-install` is used.

Creation is intentionally separate from business intake. Add PRD, RP, UI, API, and asset evidence after the container exists, then run `inputs inspect`, `inputs analyze`, and create the first task.
