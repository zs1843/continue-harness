# UI Contract and Design Token

UI capabilities are optional and task-scoped. They do not turn Core into a component library.

## Design Token

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
continue-harness design tokens diff --json
```

`discover` reads existing Vue/CSS/SCSS/Less sources without changing them. The project confirms a single machine-readable Token source, normally `docs/design/tokens.json`.

## UI Contract

```bash
continue-harness ui contract inspect --json
continue-harness ui contract inventory --write --json
```

The contract records adoption, protected component boundaries, component inventory, visual evidence, and Token states. The current inventory scanner targets Vue/uni-app source layouts; it is not a general-purpose detector for every framework.

## UI System Adapter

```bash
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
```

Adapter installation writes evidence only. It does not add a production UI dependency or choose project-owned Token values.
