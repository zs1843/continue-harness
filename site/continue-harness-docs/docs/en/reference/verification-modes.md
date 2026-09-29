# Verification modes

| Mode | Typical use |
| --- | --- |
| `quick` | Fast fail-fast feedback |
| `feature` | Completed feature gate |
| `runtime` | Browser startup and runtime checks |
| `interaction` | A configured critical interaction |
| `visual` | Screenshot baseline comparison |
| `audit` | Run all configured checks and report all failures |

Modes are symbolic names. The target project maps them to actual commands in `.continue-harness/project.yaml`, so the same workflow can work with different package managers and test runners.
