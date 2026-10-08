# `demo-h5`: From PRD to auditable evidence

This page records the facts currently verified for `demo-h5` and the evidence still required for business acceptance. It is not a business feature completion report.

## Verified facts

On 2026-09-21, the project registered T001, “AI itinerary assistant for inbound travel.” The PRD covers route comparison, daily itinerary details, weather facts and guidance, independent chat, change preview, and undo. `continue-harness inputs inspect --json` produced the following evidence:

| Fact | Result | Meaning |
| --- | --- | --- |
| PRD input | `PRD-T001` registered | The requirement input is present in the Harness manifest |
| File integrity | Hash unchanged, `changed: false` | The registered file matches its recorded content |
| Input inspection | `issues: []` | No registration issue was found in this inspection |
| Requirement status | `draft` | The input is not business acceptance evidence |

These results prove input registration and integrity inspection only. Business pages, coverage closure, and business interaction verification are not complete.

## Evidence required for business acceptance

After implementation, each acceptance scenario in chapter 11 of the PRD should link to its implementation, verification result, and report path. Screenshots may support a report, but cannot replace command output, coverage records, or an acceptance conclusion. A visual check without a baseline must remain `not_configured`, not `passed`.

The current conclusion is therefore limited to traceable PRD registration, hash inspection, and draft status. It does not establish completion of business pages, interactions, or visual acceptance.
