# Verification modes

This page defines the names, behavior, and unconfigured results of the six verification modes. The command entry point is [CLI](./commands.md).

## quick

Fail-fast feedback. Runs the commands listed in `verify.quick` in order and stops at the first non-passing step. A mode with no commands returns `not_configured`.

The `continue-harness-verify` Skill runs this mode by default; the CLI is optional: `continue-harness verify quick`.

## feature

Completed-feature gate. Runs `verify.feature.commands` and appends the acceptance gate when its condition holds; see Acceptance gate below.

The `continue-harness-verify` Skill runs this mode by default; the CLI is optional: `continue-harness verify feature`.

## runtime

Browser or runtime checks. Consumer H5 maps it to `dev_ready` and `runtime`, the latter using Playwright to check page response, core content, console errors, and page errors.

The `continue-harness-verify` Skill runs this mode by default; the CLI is optional: `continue-harness verify runtime`.

## interaction

Critical interaction checks. Consumer H5 marks it `not_configured`; `not_configured` means the capability is absent, not that it passed.

The `continue-harness-verify` Skill runs this mode by default; the CLI is optional: `continue-harness verify interaction`.

## visual

Screenshot baseline comparison. Without a baseline the whole mode returns `not_configured`, so an unconfigured screenshot check is never recorded as passed.

The `continue-harness-verify` Skill runs this mode by default; the CLI is optional: `continue-harness verify visual`.

## audit

Collects results from every configured check with `fail_fast` set to `false`, for pre-release, handoff, or complex diagnosis. `audit` also runs the acceptance gate.

The `continue-harness-verify` Skill runs this mode by default; the CLI is optional: `continue-harness verify audit`.

## Configuration mapping

Modes are symbolic names. The CLI reads `verify.<mode>` from `.continue-harness/project.yaml` and resolves each command name against `commands`, so one mode set can serve different package managers and test runners.

A mode absent from `verify` makes the command fail; a mode defined as `status: not_configured` returns `not_configured` and runs no steps.

## Acceptance gate

`feature` and `audit` additionally read `docs/ACCEPTANCE.md`. The gate is active only when that file exists, contains a Markdown table, and the header has a status column: unresolved rows append a failure, and rows marked deferred or externally blocked append a `blocked` entry.

When verification is bound to a task (an explicit `--task`, or the most recent task by default), a missing `docs/ACCEPTANCE.md`, a file without a table, a header without a status column, or any unresolved row all fail the acceptance entry. `not_configured` skips the failure decision only when no task is bound.

## Environment blocks

When a command fails because port listening is denied (`listen EPERM`, `EACCES ... listen`), the result is classified as `blocked` rather than a project failure.
