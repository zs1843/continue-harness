# Example Project Map

This fixture intentionally contains no business modules. It provides one registered page and a real
uni-app Vue 3 H5 build so Harness orchestration is tested against compiler behavior rather than
placeholder commands. A focused Playwright scenario verifies mobile viewport rendering and runtime
errors without introducing a screenshot baseline.

Shared pure helpers belong in `src/utils/`; Vue lifecycle or reactive orchestration belongs in
`src/composables/`; API and data-source details belong in `src/services/` or `src/repositories/`.
