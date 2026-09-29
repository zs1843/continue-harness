# Input protocol

Inputs are registered under `.continue-harness/inputs/` and described by `manifest.yaml`:

```text
prd/  rp/  ui/  api/  assets/
```

The protocol records type, source, status, and hash. Inspection detects drift and unregistered files. Analysis extracts evidence and conflicts without modifying original input files. Tasks reference the inputs they use so snapshots remain reviewable.
