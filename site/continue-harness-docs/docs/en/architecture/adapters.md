# Profiles, platforms, and stacks

Adapters keep changes isolated:

| Layer | Describes | Does not own |
| --- | --- | --- |
| Product Profile | Product-shape checks and requirement closure | Business pages or copy |
| Platform Adapter | Runtime, viewport, browser, and visual acceptance | Framework implementation |
| Stack Adapter | Framework directories, scripts, and page registration | Product rules |
| UI System Adapter | Component catalog, semantic mapping, and Token mapping | Production dependency installation |

The current public combination is `consumer-h5 + web-mobile + uni-app`. Other combinations are planned only after evidence from unrelated projects.

## Configuration ownership

Each target project owns `.continue-harness/project.yaml`. It selects adapters and maps symbolic verification steps to actual project commands. The repository's own `developer_tooling + node + node-esm` configuration describes maintenance of this repository; it is not a target-project preset.
