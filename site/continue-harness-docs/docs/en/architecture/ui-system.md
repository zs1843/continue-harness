# UI System

A UI System Adapter is an optional component-semantics mapping protocol, not a default UI dependency. This page covers the adapter status, protocol files, UI Contract behavior, the Token relationship, and the dependency policy.

## Adapter

`tdesign-uniapp` is the only UI System Adapter, marked experimental, and it is not a dependency of any preset. An adapter provides:

- Component semantics.
- Design Token mapping.
- Component usage constraints.
- Page transition and layout section descriptions.
- The visual adjustment record format.

`ui systems` and `ui contract` provide CLI commands only and have no matching Skill.

```bash
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
```

## Protocol files

The project points to three protocol files through facts, and `core/ui-system.mjs` validates each one:

| File | Schema | Validator |
| --- | --- | --- |
| `.continue-harness/models/page-flow.yaml` | `page-flow-model/v1` | `validatePageFlowModel` |
| `.continue-harness/models/layout-specs.yaml` | `layout-spec/v1` | `validateLayoutSpecCollection` |
| `.continue-harness/ui/adjustments.yaml` | `ui-adjustments/v1` | `validateAdjustmentLog` |

The Page Flow Model carries page nodes and transitions from the RP, the Layout Spec carries page composition, sections, and visual reference metadata, and the Adjustment Log records token, component, layout, responsive, and page_exception adjustments.

## UI Contract

CLI only: `continue-harness ui contract inventory --write` scans `.vue` files under `src/` and generates a component inventory; component state is always marked `protected`, and the "pages in use", "public interface", and "visual state" columns are fixed at pending confirmation. Adoption records, component boundaries, and visual evidence live in template files and need human confirmation before they count as evidence.

```bash
continue-harness ui contract inspect --json
continue-harness ui contract inventory --write --json
```

## Design Token

The project owns the single machine-readable Design Token source, and an adapter only explains how to map it to component library variables. When adopting an existing project, run read-only discovery first (the `continue-harness-design-tokens` Skill runs it by default; the CLI is optional) to identify CSS Variables and high-frequency visual values, then have the user confirm semantic Tokens. See [Design Token](./design-tokens.md) for the detailed rules.

## Dependency policy

The UI runtime is a project technical decision; installing an adapter writes evidence only and does not modify production dependencies. When a project decides to adopt a UI runtime, it:

1. Locks the production dependency version.
2. Migrates component usage.
3. Verifies pages and visuals.
4. Removes the old runtime.

## Boundary

The Page Flow Model, Layout Spec, and Adjustment Log protocols are currently verified only against the two built-in fixtures `list-detail` and `form-result`; other page structures need their own evidence.
