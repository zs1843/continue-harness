# Current Status

Last updated: 2026-10-09

## Current implementation

The default project workflow is project-neutral. It provides project fact Intake; input registration, applicability, analysis, and change fingerprints; stable task records, history, snapshots, and context recovery; verification using project-declared checks; requirement-to-acceptance closure checks; structured reports and append-only command logs; and Agent workflows for creation, adoption, inspection, task work, recovery, and verification.

Creation provides collaboration and constraint records. It does not scaffold application or business implementation. Optional specialized capabilities are separate and are not prerequisites for the common workflow.

## Current verification

Repository checks were last recorded as passing in the current working context: automated tests, lint, CLI version and syntax checks, and the bilingual Site build. Re-run repository commands before relying on this status for a release.

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
