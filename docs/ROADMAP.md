# Roadmap

## Milestone 0.1: H5 foundation

- Keep the default workflow limited to `create/init → inputs → task → verify`; expose Design Token,
  UI System, OpenAPI, visual baselines, and command-specific Skills only when task evidence requires them.
- Stabilize configuration, runner, reports, and exit semantics.
- Complete Doctor checks for Node, package manager, scripts, test isolation, CI entry points, and
  sensitive-file handling.
- Keep initialization preflight lightweight; add richer reports or conflict patches only if pilot
  projects demonstrate the need.
- Add PRD/UI input conventions, basic project history, and an OpenAPI snapshot check.
- Validate task-scoped generation from local Apifox OpenAPI JSON in the first pilot; add authenticated
  online synchronization only after the local contract workflow is stable.
- Maintain the real minimal uni-app H5 fixture and its focused browser runtime check.
- Validate `consumer-h5 + web-mobile + uni-app` in two unrelated projects.
- Validate recursive PRD/HTML-RP coverage extraction and the requirement-closure gate against a
  multi-level pilot flow.
- Validate the experimental UI System protocol and TDesign UniApp Adapter against two unrelated real
  projects; measure first-pass screenshot difference and classify every manual adjustment.

## Milestone 0.2: Distribution

- Add upgrade dry-run and managed-file metadata.
- Add GitLab CI templates.
- Complete package-name/registry selection and tarball installation integration tests.
- Publish an internal prerelease package after approval.

## Later milestones

- Merchant H5 Product Profile.
- Admin Web Product Profile.
- Mini-program platform adapters.
- React Native platform and stack adapters.
- API/OpenAPI provider interface.
- Optional coding-agent plugins.

New profiles and adapters must be driven by verified needs from unrelated projects, not by copying
domain rules.
