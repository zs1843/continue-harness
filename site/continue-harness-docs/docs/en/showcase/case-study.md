# Case study

> This page summarizes the current implementation and its verifiable boundaries. The latest real-project rerun is in the [Pilot record](./real-project-pilot.md).

## Problem

Requirements, project materials, implementation records, check results, and handoff context often live in separate places. A new contributor may not know which facts remain valid, why a decision was made, whether a requirement has acceptance evidence, or whether a result corresponds to the current changes.

Continue Harness brings these relationships into a shared workflow. It maintains records, links, verification orchestration, and context recovery; the project remains responsible for domain judgments, authoritative sources, and actual check definitions.

## Capabilities and boundaries

| Capability | Current implementation | Boundary |
| --- | --- | --- |
| Creation and adoption | Previews plans and prepares constraint and collaboration records | Does not generate business implementation; upgrade and conflict patches are not established |
| Intake and inputs | Records project facts, input sources, applicability, and changes | Analysis may require human interpretation |
| Tasks and recovery | Maintains task IDs, history, snapshots, and handoff context | Record quality depends on timely confirmation and maintenance |
| Verification and acceptance | Runs project-declared checks and validates requirement-to-acceptance links | Passing commands do not prove business correctness; unresolved items prevent a pass |
| Logs and reports | Preserves command outcomes, states, and evidence links | Sensitive data must not enter logs |
| Specialized implementation paths | Separate capabilities for explicit project needs | Not a dynamic plugin protocol; each capability is bounded by its implementation and evidence, and does not automatically apply to every project |
| Agent collaboration | Constraint entry points and callable workflows | Effectiveness and efficiency gains are not quantified |

## Real-project validation

Both Pilot Audits on 2026-10-09 failed under the stricter acceptance gate. Project fact confirmation, input analysis, and configured checks passed, but acceptance links remained incomplete. Doctor also found a missing environment-file ignore rule and missing input-registration guidance in the Agent constraints. This supports the claim that the gate exposes incomplete records, not that either project completed delivery.

See the [Pilot record](./real-project-pilot.md) for evidence, rerun instructions, and open work. Historical passing results do not establish a pass under the current gate.

## Principles

1. **Project facts remain project-owned.** The Harness does not infer requirements, inputs, or check methods.
2. **Preview before writing.** Creation and adoption inspect targets to avoid silent overwrites.
3. **Bind evidence to conclusions.** Reports, inputs, and acceptance items correspond to the current task and changes.
4. **Unconfigured is not passed.** Unknown, deferred, failed, and blocked states remain distinct.
5. **Handoffs are recoverable.** A new contributor can restore current facts, risks, and next actions from persistent records.

See the [workflow overview](../guide/overview.md) and the repository roadmap for current priorities.
