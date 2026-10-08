# Adapters

Adapters split product shape, runtime platform, framework toolchain, and UI component semantics into independent extension points. This page covers the four adapter kinds, configuration ownership, and verification boundaries.

## Product Profile

A Product Profile describes checks caused by product shape. The current public implementation is `consumer-h5`:

- Page structure.
- Requirement closure.
- Input evidence priority.
- Common H5 acceptance paths.

It does not write business pages or brands.

## Platform Adapter

A Platform Adapter describes the runtime platform. The current public implementation is `web-mobile`:

- Mobile web viewport.
- Browser runtime checks.
- H5 screenshot acceptance.
- Environment-blocker classification.

With platform rules separated, mini-program, React Native, or desktop web can have their own acceptance models.

## Stack Adapter

A Stack Adapter describes framework and toolchain integration. The current public implementation is `uni-app`:

- Vue 3.
- Vite.
- `src/pages.json` page registration.
- Playwright.
- Project scripts.

## UI System Adapter

A UI System Adapter describes component semantics and Design Token mapping; see [UI System](./ui-system.md).

## Layering rationale

`consumer-h5` is a product shape, `web-mobile` is a runtime platform, and `uni-app` is an implementation stack. They often appear together, but they are not equivalent and they change for different reasons, so they are three independent extension points.

## Configuration ownership

Each target project owns `.continue-harness/project.yaml`, which selects adapters and maps symbolic verification steps to project commands. The repository's own `developer_tooling + node + node-esm` combination describes maintenance of this repository and is not a target-project preset. See `docs/ARCHITECTURE.md` for the shared configuration rules.

## Boundary

The repository contains fixture projects for the `consumer-h5 + web-mobile + uni-app` combination; real-project verification currently stops at the T001 pilot, with no quantified benefit data. These samples do not define the Core support boundary: other combinations need the corresponding configuration or adapter, plus their own verification evidence, before the related capability can be claimed.
