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

The remaining limitation is evidence: a complete unrelated production project run, its reports, screenshots, and measured outcomes still need to be linked before claiming broad effectiveness.
