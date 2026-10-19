# Verification modes

This page describes common verification modes and result semantics. See [CLI](./commands.md) for entry points. Projects may configure other mode names; only feature and audit apply the acceptance-closure gate.

## quick

Fast feedback. Runs checks in configured order and stops at the first non-passing result by default. Set `fail_fast: false` explicitly to continue.

## feature

Runs configured checks and applies the requirement-to-acceptance closure gate. Unconfirmed configured Intake, missing links, or unresolved acceptance items prevent a passing result.

## runtime

Runs only explicitly configured project commands and does not infer how the project runs.

## interaction

Runs only explicitly configured project commands and does not automatically establish interaction completeness.

## visual

Runs project-configured visual checks. Harness has no general baseline preflight; project commands must check baseline availability and visual results. The current implementation recognizes specific output text as a missing baseline and marks it `not_configured`; recognition is limited. Command success alone does not establish a valid baseline or visual acceptance.

## audit

Runs commands configured for this mode and applies the acceptance-closure gate; it does not automatically collect other modes. Set `fail_fast: false` explicitly to collect results after a failure. Without it, execution still stops at the first non-passing result by default.

## Configuration and status

A mode maps to project commands through `verify` in `.continue-harness/project.yaml`. A missing mode definition causes an error with exit code 1 and no report for that run. An explicit `status: not_configured` produces an unconfigured report. An empty command list is not a valid executable mode configuration.

- `passed`: all commands configured for this run succeeded; feature and audit also require their acceptance gate to pass.
- `failed`: commands did not all pass, or an applicable closure gate has gaps.
- `blocked`: an individual check was recognized as environmentally blocked, or acceptance records contain confirmed deferrals or blockers; the overall verification may still be `failed`.
- `not_configured`: the mode is explicitly marked unconfigured, or visual output matches the missing-baseline recognition rules; this is not a pass.

Feature and audit check acceptance links for the current task and applicable inputs. Missing acceptance for a bound task, invalid statuses, missing links, or unresolved items prevent a pass. Confirmed deferrals and external blocks remain visible and do not count as verified. Legacy projects without Intake remain compatible; this does not establish confirmed project facts.

## Execution stability

Bound configuration, input, implementation, evidence, and acceptance fingerprints are compared before and after execution. Different states fail the run. The comparison is not a filesystem lock and cannot detect a change reverted during execution.

Input binding includes the ID, path, type, task ownership, and content hash of active inputs for the current task and shared active inputs, plus project-wide input inspection status, issues, and unregistered files. Changing an input's source, type, or task ownership requires verification again even if its content is identical; new unregistered inputs also invalidate earlier reports. Reports written before these binding fields were added must be regenerated before use in snapshots.

Environmental-block recognition covers only some process-start and port-permission errors. Other external conditions may still appear as command failures and require review of the raw logs.
