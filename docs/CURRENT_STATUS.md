# Current Status

Last updated: 2026-10-20

## Current implementation

The default project workflow is project-neutral. It provides project fact Intake; input registration, applicability, analysis, and change fingerprints; stable task records, history, snapshots, and context recovery; verification using project-declared checks; requirement-to-acceptance closure checks; structured reports and append-only command logs; and Agent workflows for creation, adoption, inspection, task work, recovery, and verification.

Default creation provides collaboration and constraint records. Explicitly selected specialized presets may generate project files and install dependencies; consult the plan and execution result for scope. Optional specialized capabilities are separate and are not prerequisites for the common workflow.

## Current verification

Repository checks were last recorded as passing in the current working context: automated tests, lint, CLI version and syntax checks, and the bilingual Site build. Re-run repository commands before relying on this status for a release.

### 2026-10-20 verification scope and evidence boundary hardening

- Reproduced three false passes in a scratch project: `verify audit` without `--task` checked only one auto-selected task and passed while another task's acceptance row was pending; same-day task ties selected the lowest task number instead of the latest; and verified rows accepted implementation and evidence files outside the project.
- Audit without `--task` is now project-wide: all acceptance rows and all active inputs are checked and bound, and existing tasks without an acceptance ledger fail. Other modes still default to the latest task, with same-day ties resolved to the higher task number in both verify and resume. Verified rows report `outside_project_implementation` or `outside_project_evidence` for paths or symlinks resolving outside the project, and those files are not read for fingerprints.
- CLI value flags now reject a missing value or a following long flag instead of consuming it. `intake inspect` is now read-only and prints first-round questions without creating `.continue-harness/intake.yaml`; `answer` and `evidence` still create it. Unknown `intake` subcommands now fail.
- These are behavior changes to existing CLI commands; flags, configuration schema, and dependencies are unchanged. Core gained additive exports `selectLatestTask`, `resolveProjectFile`, and `initialIntakeState`.
- New regression tests in `tests/verify-scope.test.mjs`: 5 of 6 failed against the previous commit; the ledger-missing case already failed there through task auto-selection and now guards the project-wide path.
- Not changed: audit still passes for projects with no tasks and no acceptance ledger, which includes this repository; tracked build caches and evidence source copies remain in Git pending confirmation.

### 2026-10-19 input binding hardening

- Continued the roadmap's negative-test work on stale evidence and recoverable verification results.
- Reproduced a false pass: a configured check could change an input's type without changing its bytes, yet verification still passed. Earlier reports also remained applicable after input path or task-ownership changes and after new unregistered files appeared.
- Core fingerprints now bind active input paths, types, and task ownership alongside IDs and hashes, plus project-wide input inspection status, issues, and discovered files. CLI, Profile, Platform, Stack, templates, public configuration schema, and dependencies were unchanged; bilingual verification and recovery guidance was updated.
- Regression tests failed before the fix and passed after it. Full `pnpm test`: 97 passed, 0 failed. `pnpm lint`, CLI `version` (`0.1.0`), `pnpm check:syntax` (50 files), and `pnpm docs:build` all passed. A CLI regression checks rejection during mutation, invalidation in resume, snapshot rejection, and successful verification and snapshot creation after stabilization.
- Example Doctor was rerun with the repository CLI from `examples/uni-app-h5-minimal` and returned `failed`: environment-file ignore rules are missing; Agent workflow guidance is incomplete; input/history and other optional records remain unconfigured. An initial invocation used an incorrect relative CLI path and was corrected to the absolute path. These example gaps were not changed in this task. The two real-project Pilots were not rerun.
- Reports generated before the additional binding fields must be regenerated before snapshot use. Fingerprint comparisons still cannot detect edits reverted before the final read and do not lock the filesystem.
- Next: address the minimal example's Doctor gaps; continue negative checks of acceptance evidence and snapshot invalidation. No confirmation boundary was crossed, and no commit, push, or publication was performed.

The two real-project Pilot reruns on 2026-10-09 reached the stricter acceptance gate and both returned **failed**. Intake and input analysis passed; configured project checks ran; acceptance records contained unresolved traceability links. Doctor also reported missing environment-file ignore rules and missing input-registry guidance in the Agent constraints. Reports and fingerprints are summarized in the Site Pilot evidence. These results demonstrate that the gate blocks incomplete records; they do not establish successful delivery.

## Known limitations

- Pilot acceptance items and project decisions still require confirmation and evidence before either project can pass.
- Pilot reruns used existing installed dependencies; clean-install reproducibility was not established.
- Intake offers built-in candidate questions for a limited set of common project categories; unrecognized categories use the general candidate set. This affects prompt specificity, not the configuration schema's acceptance of project-defined labels.
- Input analysis is heuristic and may require Agent or human interpretation.
- The Harness records configured checks but cannot establish business correctness by itself.
- A passing fixture or command does not establish that all projects or workflows are covered.
- Upgrade, conflict patch generation, and release publishing are not part of the current verified workflow.
- Optional specialized modules must be described only within tested boundaries and must not shape the default project model.

## Source of truth

Implementation and regression tests define executable behavior. The bilingual Site explains user workflows and limitations. Latest real-project results are recorded in the Site Pilot page; historical results do not override the latest run.
