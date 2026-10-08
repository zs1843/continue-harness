# Real-project Pilot verification

> Verification date: 2026-10-08. Harness CLI: `0.1.0`. This page records reproducible local evidence and does not turn project blockers into a Harness pass.

## Projects

| Project | Shape | Stack | Pilot task |
| --- | --- | --- | --- |
| HeTun-Site | Frontend website | React, TypeScript, Vite, Tailwind, legacy HTML | `T001` |
| Workbench-Admin | Frontend administration | Vue 2, Vue CLI, Webpack, Element UI, Jest, Yarn | `T001` |

The projects validate that the Harness protocol is independent from a specific framework. They do not constitute product acceptance for either project.

## Workflow

```text
Intake
  → evidence confirmation and registration
  → create T001
  → command logs
  → verify audit
  → acceptance checks
  → resume context recovery
  → task snapshot handoff
```

The following commands were executed in each project:

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

After installing dependencies, HeTun-Site completed `pnpm install`, `npm run build`, and `npm run verify:pilot`; Vite still reports a chunk-size warning, but it does not block this Pilot. Workbench-Admin passed `npm run lint:pilot`, all 28 unit tests, and `npm run build:pilot`; the build command explicitly supplies the OpenSSL compatibility flag required by its legacy Webpack. The original full lint command's historical formatting debt remains recorded separately.

Both final Harness audits are therefore `passed`. This closes the T001 Pilot engineering gates and acceptance boundaries; it does not claim that the website's business acceptance or the admin project's permission/API matrix is complete. Both snapshots contain the real PRD, confirmed evidence, acceptance status, verification results, and durable decisions. `.env.*` files are excluded, while harmless business filenames do not trigger a sensitive-file false positive.

## Completeness criteria

The Harness can only be called Pilot-complete when all of the following hold:

- Intake facts and second-round evidence have explicit statuses and sources.
- Generated placeholder documents never count as valid input.
- Task IDs, input hashes, command logs, and verification reports are traceable.
- `resume` restores the task, inputs, acceptance, risks, verification, and next actions.
- Unresolved acceptance blocks completion; deferrals and external blockers retain reasons.
- Snapshots exclude sensitive content without rejecting harmless filenames.
- Two projects with different stacks produce consistent protocol behavior.

This run proves the generic collaboration loop and snapshot mechanism, and shows that two projects with different stacks can reach `passed` through the same protocol. Future business work must create new tasks and register permission, API, visual, or deployment evidence; Pilot completion is not product completion.

## Maintenance

When Harness behavior changes, update together:

1. Core/CLI automated tests.
2. The Pilot commands and result table on this page.
3. [Verification and reports](../guide/verification.md) and [Verification and snapshot details](../sop/verification-and-snapshot.md).
4. Both language pages and Site navigation.

Do not edit `.vitepress/.temp` or `.vitepress/dist`; they are build artifacts.
