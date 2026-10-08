# Verification and snapshots

This page covers mode selection by change type, the acceptance gate condition, and snapshot creation. Mode definitions are in [Verification modes](../reference/verification-modes.md); command options are in [CLI](../reference/commands.md).

## Choosing a mode

Mode names, mapping rules, and unconfigured results follow [Verification modes](../reference/verification-modes.md). Choose by change scope: `quick` for small configuration or tooling changes, `feature` for a completed feature, and `audit` before release or handoff.

Once the mode is chosen, run verification with the `verify` Skill.

**Skill**: `continue-harness-verify`

**CLI (optional)**:

```bash
continue-harness verify feature
```

## Acceptance gate

`verify feature` and `verify audit` additionally read `docs/ACCEPTANCE.md`. The gate is active only when that file exists, contains a Markdown table, and the header has a status column: unresolved rows append a failure, and deferred or externally blocked rows append `blocked`.

When verification is bound to a task (an explicit `--task`, or the most recent task by default), a missing `docs/ACCEPTANCE.md`, a file without a table, a header without a status column, or any unresolved row all fail `verify feature` and `verify audit`; the check is skipped only when no task is bound. The Consumer H5 preset does not generate `docs/ACCEPTANCE.md`; it registers the requirement closure check as `commands.coverage_closure` inside `verify.feature`.

## Reports

Verification reports are written to `tmp/continue-harness/` with Markdown, JSON, and per-command logs; the directory layout is in [Configuration and files](../reference/config-and-files.md). Reports separate command failures, environment blocks, unconfigured capabilities, and business failures.

## Creating a snapshot

Create a task snapshot with the `task` Skill.

**Skill**: `continue-harness-task`

**CLI (optional)**:

```bash
continue-harness task snapshot T001 --title "Task title" --request "The user request" --json
```

A snapshot records:

- The task statement.
- Changed files.
- Verification results.
- Project context, acceptance links, and input/implementation fingerprints.
- Related evidence.

## Limits

Snapshots never store `.env` content, secrets, Cookies, or Access Tokens. `not_configured` means a capability is absent and must not be presented as passed.
