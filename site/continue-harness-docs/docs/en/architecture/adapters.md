# Profiles, platforms, and stacks

Adapters keep changes isolated:

| Layer | Describes | Does not own |
| --- | --- | --- |
| Product Profile | Product-shape checks and requirement closure | Business pages or copy |
| Platform Adapter | Runtime, viewport, browser, and visual acceptance | Framework implementation |
| Stack Adapter | Framework directories, scripts, and page registration | Product rules |
| UI System Adapter | Component catalog, semantic mapping, and Token mapping | Production dependency installation |

The repository includes focused verification samples for the adapter combination
`consumer-h5 + web-mobile + uni-app`. These samples are not required by the generic harness and do
not define the Core support boundary. The generic Core reads project facts, constraints, and
verification commands from project configuration. Other combinations require the corresponding
configuration or adapter and their own verification evidence before the related capability can be
claimed.

## Configuration ownership

Each target project owns `.continue-harness/project.yaml`. It selects adapters and maps symbolic verification steps to actual project commands. The repository's own `developer_tooling + node + node-esm` configuration describes maintenance of this repository; it is not a target-project preset.
