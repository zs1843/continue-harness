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
| Audit | Build passed; audit failed on unresolved acceptance | Unit tests passed; lint, dev build, and acceptance remain blocked |
| Context recovery | Passed | Passed |
| Handoff snapshot | Passed | Passed |

After installing dependencies, HeTun-Site completed `pnpm install` and `npm run build`; the audit still exposes a large-chunk warning and unresolved entry-point/page acceptance. Workbench-Admin used `npm install --legacy-peer-deps --ignore-scripts --no-package-lock` only as a local diagnostic fallback. Its unit tests passed 28/28, while lint reported 178171 problems and the dev build hit an old Webpack/OpenSSL compatibility failure. This npm fallback is not the project's final dependency strategy.

Both audits therefore remain `failed`. These are real project engineering or acceptance blockers, not false Harness passes. Both snapshots contain the real PRD, confirmed evidence, acceptance risks, verification results, and durable decisions. `.env.*` files are excluded, while harmless business filenames do not trigger a sensitive-file false positive.

## Completeness criteria

The Harness can only be called Pilot-complete when all of the following hold:

- Intake facts and second-round evidence have explicit statuses and sources.
- Generated placeholder documents never count as valid input.
- Task IDs, input hashes, command logs, and verification reports are traceable.
- `resume` restores the task, inputs, acceptance, risks, verification, and next actions.
- Unresolved acceptance blocks completion; deferrals and external blockers retain reasons.
- Snapshots exclude sensitive content without rejecting harmless filenames.
- Two projects with different stacks produce consistent protocol behavior.

This run proves the generic collaboration loop and snapshot mechanism, and shows that Audit continues to expose real build, lint, entry-point, and acceptance issues after dependencies are available. Neither project should be called complete yet.

## Maintenance

When Harness behavior changes, update together:

1. Core/CLI automated tests.
2. The Pilot commands and result table on this page.
3. [Verification and reports](../guide/verification.md) and [Verification and snapshot details](../sop/verification-and-snapshot.md).
4. Both language pages and Site navigation.

Do not edit `.vitepress/.temp` or `.vitepress/dist`; they are build artifacts.
