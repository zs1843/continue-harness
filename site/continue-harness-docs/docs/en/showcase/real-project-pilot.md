# Real-project Pilots

> Latest rerun: 2026-10-09, using the local Harness source. Neither project’s acceptance records were rewritten.

This page exercises Intake, input registration, task inspection, history, context recovery, diagnostics, Audit, and the snapshot gate. It does not establish business-delivery acceptance.

## Results

| Check | HeTun-Site | Workbench-Admin |
| --- | --- | --- |
| Intake | confirmed | confirmed |
| Input inspection and analysis | passed | passed |
| Task inspection, history, and context recovery | passed; recovery includes the current failed report | passed; recovery includes the current failed report |
| Project-configured checks | All passed | All passed |
| Doctor | failed: environment-file ignore rule missing; Agent constraints omit the input-registry workflow | failed: environment-file ignore rule missing; Agent constraints omit the input-registry workflow |
| Acceptance links | needs_confirmation; 5 unresolved records | needs_confirmation; 5 unresolved records |
| Audit | **failed** | **failed** |
| New snapshot | Blocked by unresolved acceptance | Blocked by unresolved acceptance |

Existing acceptance rows lack machine-checkable task, requirement, implementation, and evidence links, and an uncovered requirement remains. A stored `verified` status alone does not satisfy the gate. No Pilot acceptance status was changed, and no evidence was invented to obtain a pass.

## Rerun workflow

The following workflow was run in both projects. The local evidence package records the complete arguments, exit codes, and raw output.

```text
intake inspect
inputs inspect → inputs analyze
task inspect → task history → resume
doctor
verify audit --task T001
task snapshot T001
```

Project-configured checks passed in both runs, but the overall Audit remains `failed` because acceptance links are incomplete. The snapshot command correctly refused to create a new snapshot. Context recovery itself succeeded and reported the failed state.

## Reviewable evidence

Public summary: [Pilot results and report hashes](/evidence/pilot-2026-10-09.json). Raw command output, reports, project command logs, and a copy of the Harness source used for this run are retained in `.continue-harness/evidence/pilot-rerun-2026-10-09-source-current/` and are not published with the Site. The package records full commands, exit codes, and source hashes for review. Each project is identified by its Git revision.

| Project | Source revision | Audit | Report SHA-256 |
| --- | --- | --- | --- |
| HeTun-Site | `cf053e1b40b515f4716e1685c0731c6b776c1f8b` | failed | `6a2bd7dbddecf304bccfe04ea63cc19a203b3e25a4b70160f9377f801b6af1d0` |
| Workbench-Admin | `22da4ad755a2682377540f791684bea257c30740` | failed | `1d795fa0e68f12a16b12428c95322e6f19156c6f429599f44280c9cc1ccd4d20` |

## Conclusion boundary

The rerun confirms that task, input, log, context-recovery, and report-binding commands execute in two different project structures. It also confirms that the acceptance gate rejects records without required links. It does not show that either Pilot has completed business acceptance or produced a new snapshot. Earlier `passed` results came from an older gate run and do not describe this rerun.

The next step is for project owners to confirm and add evidence links to the existing acceptance records, then rerun Audit. The Harness does not confirm project facts on their behalf.
