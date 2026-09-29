# Verification and reports

Verification modes are mapped to real commands by `.continue-harness/project.yaml`. Agents should read the project mapping instead of hard-coding a package-manager command.

| Mode | Purpose |
| --- | --- |
| `quick` | Fast fail-fast checks for small changes |
| `feature` | Completion gate for a feature change |
| `runtime` | Page startup, browser response, and runtime errors |
| `interaction` | A configured critical user flow |
| `visual` | Screenshot baselines and pixel differences |
| `audit` | Run and summarize all configured checks |

```bash
continue-harness verify quick
continue-harness verify feature
continue-harness verify runtime
continue-harness verify visual
continue-harness verify audit
```

For Consumer H5, `feature` and `audit` also enforce requirement closure: reachable pages, dialogs, states, actions, and return paths must be verified, explicitly deferred, or recorded as externally blocked. A working first page or a successful build is supporting evidence, not coverage closure.

Reports are written to:

```text
tmp/continue-harness/
```

Business failures, environment blocks, unconfigured checks, and passes should be interpreted separately.
