# Continue Harness

Recoverable project collaboration and quality harness

Requirement → implementation item → acceptance item → evidence → handoff state

Confirm project facts through conversation, select evidence for each task, organize implementation around verifiable criteria, and preserve recoverable project context.

## Why use a Harness

Requirements, implementation and verification records can become scattered across files and sessions. A new contributor must determine which facts are current, which conclusions were verified and what remains open.

Continue Harness stores these relationships in the project. Agents can continue from the same task, input and acceptance records, while engineering checks remain linked to their evidence.

## Get started

Open the project in an Agent that supports Skills and follow [Get started](/en/guide/getting-started). Invoke an existing operation Skill for the current stage; no aggregate project Skill is required. The Agent restores existing records or confirms project facts through conversation, then registers task-relevant evidence, maintains acceptance links, runs project checks and prepares a handoff.

Creating a project and adopting an existing one use the same general workflow. Project structure and verification are determined by the project's own facts.

## Current capabilities and boundaries

| Capability | Current behavior |
| --- | --- |
| Project facts | Intake confirms goals, scope, runtime conditions and collaboration expectations in rounds; unresolved facts remain open |
| Evidence | Records source, version, task links and file changes; types follow project and task needs |
| Acceptance | Checks recorded links among requirement inputs, implementation items, criteria and local evidence |
| Verification reports | Runs project-configured commands and binds task, inputs, implementation, evidence and verification configuration |
| Context recovery | Summarizes project facts, inputs, tasks, logs, decisions, acceptance and latest verification state |
| Handoff snapshots | Preserve project context and a copy of the verification report at handoff |

Automated checks validate registered links and file state. They do not judge whether requirements are complete or replace review of business outcomes. Project collaborators remain responsible for decomposing requirements and assessing evidence.

## Pilot results

On 2026-10-09, the current source reran T001 in two real projects. Configured engineering checks passed in both, but both audits failed because legacy acceptance records lack task, requirement, implementation and evidence links. Doctor reported missing environment-file ignore rules and missing input-registry guidance in the Agent constraints. Both snapshots were blocked by unresolved acceptance. See [Real-project Pilots](/en/showcase/real-project-pilot).

Automated regression tests cover core flows, and the Site build checks both locales. See the [case study](/en/showcase/case-study) for evidence and limits.

## Continue reading

- [Workflow](/en/guide/overview)
- [Get started](/en/guide/getting-started)
- [Create a project](/en/sop/create-project)
- [Adopt an existing project](/en/sop/init-existing-project)
- [Evidence](/en/guide/evidence)
- [Tasks, recovery and snapshots](/en/guide/tasks-and-resume)
- [Verification and acceptance](/en/guide/verification)
