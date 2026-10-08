# Real-project Pilot

> These results describe the earlier Pilot run. They have not been rerun against the stricter acceptance links and task/version-bound report checks. Backfill the existing ledger and rerun verification before claiming passage through the current gate.

> Verification date: 2026-10-08. Harness CLI: `0.1.0`.

This page records the commands and results of one `T001` Pilot in each of two real projects, used to verify that the Harness is decoupled from a specific framework. Business acceptance for the website and the administration project is outside this round; capability boundaries are at the end of this page.

## Projects

| Project | Shape | Stack | Pilot task |
| --- | --- | --- | --- |
| HeTun-Site | Frontend website | React, TypeScript, Vite, Tailwind, legacy HTML | `T001` |
| Workbench-Admin | Frontend administration | Vue 2, Vue CLI, Webpack, Element UI, Jest, Yarn | `T001` |

## Commands

The following commands were executed in each project's own repository. The full workflow is in [Workflow](/en/guide/overview).

**Skill**: `continue-harness-inspect`, `continue-harness-doctor`, `continue-harness-inputs`, `continue-harness-task`, `continue-harness-verify` (`generic-harness` covers `intake` and `resume`; `consumer-h5-harness` in a consumer-h5 project)

**CLI (optional)**:

```bash
continue-harness inspect --json
continue-harness doctor --json
continue-harness intake inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness resume --task T001 --json
continue-harness verify audit --json
continue-harness task history T001 --json
```

## Results

| Stage | HeTun-Site | Workbench-Admin |
| --- | --- | --- |
| Intake | `confirmed` | `confirmed` |
| Inputs | One real PRD, `passed` | One real PRD, `passed` |
| Placeholder rejection | Negative test passed | Negative test passed |
| Acceptance | `closed_with_risks` | `closed_with_risks` |
| Audit | `passed`: build, pilot smoke, and acceptance passed | `passed`: pilot lint, unit tests, dev build, and acceptance passed |
| Context recovery | Passed | Passed |
| Handoff snapshot | Passed | Passed |

After installing dependencies, HeTun-Site completed `pnpm install`, `npm run build`, and `npm run verify:pilot`; Vite still reports a chunk-size warning, which does not block this Pilot. Workbench-Admin passed `npm run lint:pilot`, all 28 unit tests, and `npm run build:pilot`; the build command explicitly supplies the OpenSSL compatibility flag required by its legacy Webpack. The original full lint command's historical formatting debt remains recorded separately.

Both final Harness audits are `passed`. Both snapshots contain the real PRD, confirmed inputs, acceptance status, verification results, and durable decisions. `.env.*` files are excluded, and harmless business filenames do not trigger a sensitive-file false positive.

## Pilot completion criteria

The Harness calls a Pilot complete when all of the following hold:

- Intake facts and second-round evidence have explicit statuses and sources.
- Input checks reject Harness placeholder documents.
- Task IDs, input hashes, command logs, and verification reports are traceable to each other.
- `resume` restores the task, inputs, acceptance, risks, verification, and next actions.
- Unresolved acceptance blocks a completion conclusion; deferrals and external blockers retain reasons.
- Snapshots exclude sensitive content without rejecting harmless filenames.
- Two projects with different stacks produce consistent protocol behavior.

This round completed one T001 Pilot in each of two projects with different stacks, both reaching `passed`. Future business work needs new tasks plus the matching permission, API, visual, or deployment evidence.

## Capability boundaries

### Verified capabilities

| Capability | Evidence | Current conclusion |
| --- | --- | --- |
| Cross-stack onboarding | HeTun-Site (React/Vite) and Workbench-Admin (Vue 2/Vue CLI) used the same generic Harness protocol | 2 samples: Core is not coupled to one business framework, and project configuration supplies commands and engineering gates |
| Multi-round Intake | Both projects completed basic facts, input registration, and non-applicable evidence decisions | The Harness asks for project facts first, then narrows input questions by project type |
| Traceable inputs | Real PRDs, sources, versions, hashes, and task IDs are recorded in the manifest and snapshots | Placeholder inputs are rejected and original evidence is not rewritten by the Harness |
| Engineering verification and acceptance | Both project audits are `passed`; unresolved acceptance makes an audit fail | Build, test, lint, or smoke commands come from project configuration, while acceptance status independently affects the result |
| Context recovery and handoff | Both projects generated immutable T001 snapshots containing inputs, decisions, risks, and latest verification | A new Agent can recover from task history instead of relying on the previous conversation |
| Logs and security | Command logs, reports, and snapshots reference each other; `.env.*` files are excluded and harmless filenames no longer trigger false positives | Execution remains traceable with a lower risk of sensitive content entering snapshots |
| Regression protection | Harness root `pnpm test` passed 79/79 and the Site build passed | Core/CLI flow behavior has automated regression coverage |

### Not yet verified

- Broad applicability across enough languages, platforms, and deployment environments.
- Quantified improvement in delivery speed, rework rate, defect rate, or Agent cost.
- Replacement of product-owner confirmation for business, permission, API, visual, and release outcomes.
- A `passed` Pilot maps to the T001 engineering gates and acceptance boundaries, not to every product requirement.
- Historical formatting debt, legacy dependencies, performance warnings, and business-scope gaps may remain and need registration and acceptance in later tasks.

This round verified collaboration, verification, recovery, and handoff flows on 2 projects with one task each; it does not support "automatically completing arbitrary projects" or "improving engineering efficiency."

## Maintenance

When Harness behavior changes, update together:

1. Core/CLI automated tests.
2. The Pilot commands and result table on this page.
3. [Verification](../guide/verification.md) and [Verification and snapshots](../sop/verification-and-snapshot.md).
4. Both language pages and Site navigation.

Do not edit `.vitepress/.temp` or `.vitepress/dist`; they are build artifacts.
