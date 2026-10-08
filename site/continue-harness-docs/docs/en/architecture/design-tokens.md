# Design Token

A Design Token is the optional single machine-readable visual authority for UI tasks, and it is not bound to a product, platform, or framework. This page covers the authority files, source priority, definition steps, semantic naming, existing-project discovery, and the acceptance boundary.

## Authority files

```text
docs/design/tokens.json     machine-readable values
docs/design/TOKENS.md       sources, naming, usage, and maintenance rules
```

`TOKENS.md` explains sources and maintenance rules; it does not duplicate a second set of values.

## Source priority

| Priority | Source |
| --- | --- |
| 1 | High-fidelity UI |
| 2 | RP |
| 3 | Ad-hoc visual request from the user |
| 4 | Existing project Tokens |
| 5 | Principles in `docs/DESIGN.md` |
| 6 | Harness defaults |
| 7 | Agent inference |

Sources closer to the real visual deliverable and to explicit user statements rank higher. A user override of an existing input must record a reason; Agent inference can only be marked `inferred` until confirmed.

## Default state

Harness defaults exist only so that an empty project has a stable structure; they do not represent a brand, a product character, or a UI design. A new project keeps its Token status at `pending_extraction` and extracts values only after real UI, RP, or project styles arrive. Treating defaults as real Tokens makes a page look designed without visual evidence and raises the cost of later replacement.

## Definition steps

1. Run `design tokens inspect` with the `continue-harness-design-tokens` Skill (CLI optional: `continue-harness design tokens inspect --json`) to confirm the single authority file and its current status.
2. Check whether this task has high-fidelity UI, an RP, an ad-hoc user request, or existing project styles.
3. Determine the authority of each Token from the source priority.
4. Write semantic Tokens to `docs/design/tokens.json`, not page-local styles.
5. Explain naming, sources, and usage rules in `TOKENS.md`.
6. Run `design tokens diff` with the `continue-harness-design-tokens` Skill (CLI optional: `continue-harness design tokens diff --json`); the command is read-only and returns a diff only when the project provides before and after versions, writing no files.

## Semantic tokens

A semantic Token describes a purpose, not the look of a color. Preferred:

```json
{
  "color": {
    "brandPrimary": {
      "value": "#2f6f73",
      "source": "ui",
      "status": "confirmed"
    },
    "textPrimary": {
      "value": "#202124",
      "source": "existing_project",
      "status": "confirmed"
    }
  }
}
```

Not preferred:

```json
{
  "color": {
    "green1": "#2f6f73",
    "darkText": "#202124"
  }
}
```

`brandPrimary` can map to buttons, navigation, and emphasis states; `green1` describes a color only and carries no business meaning.

## Existing-project discovery

When adopting an existing project, run read-only discovery first instead of overwriting existing styles with an empty template.

**Skill**: `continue-harness-design-tokens`

**CLI (optional)**:

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```

Discovery covers Vue, CSS, SCSS, and Less under `src/` and reports candidates for CSS Variables, high-frequency colors, fonts and sizes, spacing, radii, shadows, dimensions, z-index, motion, and breakpoints. Candidates are not confirmed Tokens; they need UI/RP context and user confirmation before they are written to the single authority.

## User overrides

A user may explicitly override a UI value or an existing Token, for example by making the primary button a darker green. The override is valid, but it must record the previous value, the new value, the override source, the Token version, the affected pages and components, and the reason, so later visual regression or design review can separate UI changes, project-constraint changes, and ad-hoc business requests.

## Relation to UI System Adapter

The Design Token is project authority; a UI System Adapter is a mapping protocol. An adapter can explain how `brandPrimary` maps to component library variables or component semantics, but it cannot decide the value of `brandPrimary`, so a UI runtime does not decide the project visual system in reverse. See [UI System](./ui-system.md) for the mapping protocol.

## Acceptance boundary

Without a visual baseline, do not claim visual fidelity is verified. The accurate statements are that Tokens are extracted, pages are implemented against the Tokens, runtime or feature verification passed, and no visual baseline is configured. Only after a baseline exists and visual regression has run can screenshot differences serve as visual acceptance evidence.
