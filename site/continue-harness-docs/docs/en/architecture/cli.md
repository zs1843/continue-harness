# CLI boundaries

The canonical executable is `continue-harness`; `fe-harness` remains a compatibility alias. The CLI owns command routing, human-readable help, stable JSON output, plan previews, resource installation, and process exit semantics. Core owns execution and project protocols.

The CLI must not encode business pages, API paths, brand values, or project-private decisions. Public interface changes require compatibility review.

## Default help surface

The main help keeps the shortest workflow visible:

```text
create / init → intake → inputs → task → verify
```

`inspect`, `doctor`, `plan`, `resume`, `api`, `design`, `ui`, and `skills` remain available as
explicit commands. The `--json` option provides stable output for Agents and CI instead of making
automation parse human-readable text.

## Command ownership

The target project owns facts, command mappings, and verification policy in
`.continue-harness/project.yaml`. The CLI routes commands and reports results; Core executes the
protocol. This separation keeps project-specific decisions out of the public executable.
