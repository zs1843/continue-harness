# Verification modes

This page describes the Harness verification modes and their result semantics. See [CLI](./commands.md) for command entry points.

## quick

Fast feedback. Runs configured checks in order and stops at the first failure. Returns `not_configured` when no check can run.

## feature

Feature acceptance. Runs configured checks and applies the requirement-to-acceptance closure gate. Unconfirmed Intake, missing links, or unresolved acceptance items prevent a passing result.

## runtime

Runtime checks. Runs only runtime checks explicitly configured by the project. Returns `not_configured` when absent; the Harness does not infer how the project runs.

## interaction

Interaction acceptance. Runs only interaction checks defined by the project. An unconfigured mode is not a pass.

## visual

Visual evidence checks. Runs only when the project configures the check and its baseline evidence. Missing configuration or baselines result in `not_configured`.

## audit

Audit runs all configured checks and collects results without stopping at the first failure. It applies the acceptance-closure gate as well.

## Configuration and status

Mode names provide stable entry points; project configuration maps checks to project commands. The Harness does not infer build, test, runtime, or visual tools from project type.

- `passed`: configured checks succeeded and the closure gate passed.
- `failed`: a check failed or a closure gap remains.
- `blocked`: an external condition prevents a check or delivery.
- `not_configured`: no executable configuration exists for the mode; this is not a pass.

Feature and audit modes require a parseable acceptance record and traceability from the current task and applicable inputs to acceptance items. Unconfirmed Intake, invalid statuses, missing links, or unresolved items prevent a pass. Confirmed deferrals and external blocks remain visible in reports and cannot be represented as verified.

## Execution stability

Configuration and input fingerprints that affect the result are compared before and after execution. If those sources change during verification, the result is not stable evidence of the current state. External restrictions, such as runtime permissions, are recorded as environmental blocks.
