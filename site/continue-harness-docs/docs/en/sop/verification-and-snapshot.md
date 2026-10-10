# Verification and snapshots

This page covers mode selection by change type, how the acceptance gate decides, and snapshot creation. Mode definitions are in [Verification modes](../reference/verification-modes.md); command options are in [CLI](../reference/commands.md).

## Choosing a mode

Mode names, mapping rules, and unconfigured results follow [Verification modes](../reference/verification-modes.md). Choose by change scope: `quick` for small configuration or tooling changes, `feature` for a completed feature, and `audit` before release or handoff.

Once the mode is chosen, run verification with the `verify` Skill.

**Skill**: `continue-harness-verify`

**CLI (optional)**:

```bash
continue-harness verify feature
```

## Acceptance gate

feature and audit check acceptance links for the selected task. Missing acceptance for a bound task, invalid references and unresolved rows fail the gate. Deferred or blocked work does not count as passed. Unconfirmed configured Intake or changes to bound state during execution also prevent a completion claim.

For fields, coverage granularity and report validity, see [Verification and acceptance](../guide/verification.md). Status rules are in [Verification modes](../reference/verification-modes.md).

## Reports

Verification reports are written to `tmp/continue-harness/` with Markdown, JSON, and per-command logs; the directory layout is in [Configuration and files](../reference/config-and-files.md). Reports separate command failures, environment blocks, unconfigured capabilities, and business failures.

## Creating a snapshot

Create a task snapshot with the `task` Skill.

**Skill**: `continue-harness-task`

**CLI (optional)**:

```bash
continue-harness task snapshot T001 --title "Task title" --request "The user request" --json
```

Snapshot creation requires input inspection to be `passed`, acceptance status to be neither `needs_confirmation` nor `not_configured`, and configured Intake to be `confirmed`. A report for the current task must exist, its task ID and context fingerprint must still match, and bound state must not have changed during verification. A report may record a failure; the snapshot preserves it without treating it as acceptance. Sensitive-content detection also stops creation.

A snapshot records:

- The task statement.
- Changed files.
- Verification results.
- Project context, acceptance links, and input/implementation fingerprints.
- Related evidence.

## Limits

Snapshots exclude sensitive filenames such as `.env*` and scan for some common credential formats. This is not comprehensive secret detection; review project documents and evidence before handoff. `not_configured` means a capability is absent and must not be presented as passed.
