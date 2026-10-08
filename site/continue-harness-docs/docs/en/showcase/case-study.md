# Case study

The harness repository maintains itself through the same protocol exposed to target projects:

```text
Developer / CI / Agent
          ↓
        CLI → Core → configuration and adapters
```

The repository uses `developer_tooling + node + node-esm` internally. The repository currently includes
and validates `consumer-h5 + web-mobile + uni-app`; these are adapters, not hard-coded business rules
or a technology restriction in Core.

The first two real-project Pilots are now recorded in [Real-project Pilot verification](./real-project-pilot.md). Their T001 engineering audits pass, while business permissions, APIs, visual acceptance, and deployment evidence remain task-specific; Pilot completion is not product completion.
