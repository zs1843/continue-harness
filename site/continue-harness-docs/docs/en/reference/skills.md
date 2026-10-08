# Skill list

The current Skill families are:

| Skill | Purpose |
| --- | --- |
| `generic-harness` | Technology-neutral aggregate workflow |
| `consumer-h5-harness` | Specialized Consumer H5 workflow |
| `continue-harness-create` | Create a project |
| `continue-harness-init` | Adopt an existing project |
| `continue-harness-inspect` | Read project facts |
| `continue-harness-plan` | Preview changes |
| `continue-harness-doctor` | Run read-only diagnostics |
| `continue-harness-inputs` | Register and analyze evidence |
| `continue-harness-task` | Manage task IDs and snapshots |
| `continue-harness-verify` | Select and run verification |
| `continue-harness-api` | OpenAPI inspection and generation |
| `continue-harness-design-tokens` | Discover and maintain Tokens |
| `continue-harness-skills` | Install project or global Skills |
| `continue-harness-version` | Check CLI compatibility |

Install only what the task needs:

```bash
continue-harness skills list --json
continue-harness skills install --project --name continue-harness-api
```
