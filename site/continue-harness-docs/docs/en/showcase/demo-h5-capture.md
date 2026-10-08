# demo-h5 evidence record

This page records the input facts currently verified for `demo-h5` and the evidence still to be added before business acceptance.

## Verified facts

On 2026-09-21 the project registered T001, "AI itinerary assistant for inbound travel," covering route search and comparison, daily itinerary, weather facts and guidance, independent chat, change preview, and undo. `continue-harness inputs inspect --json` produced the following result:

| Fact | Result | Meaning |
| --- | --- | --- |
| PRD input | `PRD-T001` registered | The requirement input is present in the Harness input manifest |
| File integrity | Hash unchanged, `changed: false` | The registered file matches its recorded content |
| Input inspection | `issues: []` | No registration issue was found in this inspection |
| Requirement status | `draft` | The input is in draft state |

These results cover input registration and integrity inspection.

## Evidence still to be added

After implementation, each acceptance scenario in chapter 11 of the PRD needs a linked implementation, verification result, and report path, covering:

| Acceptance area | Evidence to record | Acceptance conclusion |
| --- | --- | --- |
| Route comparison | Query conditions, candidate routes, selection rationale, and sample data sources | Confirmed by the actual feature verification report |
| Itinerary detail and weather | Days 1-3, weather mode, source, time, and the distinction between facts and suggestions | Confirmed by the actual feature and data-degradation verification |
| Chat adjustment | Original activity, suggested activity, applied action, keeping the original plan, and undo result | Confirmed by the actual interaction verification |
| Coverage and verification | Coverage-matrix nodes, verification commands, report paths, and blocker records | Confirmed by the task acceptance record |

Later business tasks create a new stable task ID and bind inputs, implementation files, verification reports, and acceptance conclusions to that task.

## Boundary

Without a configured visual baseline, a visual check is recorded as `not_configured`; page screenshots are supporting evidence for the actual verification report only. This page is limited to input registration and integrity inspection; complete Pilot evidence for the two real projects is in [Real-project Pilot](./real-project-pilot.md).
