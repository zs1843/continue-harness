# Adopt an existing project: detailed behavior

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

Initialization preflights all targets before writing. It creates missing business-neutral files, preserves project-owned changes, and writes nothing when a true conflict exists. It does not replace the project's package manager, test runner, styles, or existing Agent authority.

For existing front-end projects, discover current visual values before confirming a canonical Token source:

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```
