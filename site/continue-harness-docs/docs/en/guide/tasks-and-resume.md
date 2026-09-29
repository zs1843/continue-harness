# Tasks, resume, and traceability

## Stable task IDs

```bash
continue-harness task create --title "Task title" --json
continue-harness task inspect T001 --json
continue-harness task history T001 --json
```

The task ID connects PRD/RP evidence, API operationIds, implementation files, verification reports, and snapshots. Numbering continues from legacy PRD files, manifests, history, coverage records, and snapshot directories instead of restarting at `T001`.

## Restore a collaboration state

```bash
continue-harness resume
continue-harness resume --json
continue-harness resume --task T001 --json
```

`resume` is read-only. It summarizes the current task, input state, recent snapshots, coverage closure, durable decisions, Git changes, and up to three next actions. A new Agent can read this state before loading task-specific evidence.

## Snapshots

```bash
continue-harness task snapshot T001 \
  --title "Task title" \
  --request "The user request" \
  --json
```

Snapshots contain the request, changed files, verification results, Design Token diff, and related evidence. They never store `.env` files, secrets, cookies, or access tokens.

## Conversation handoff

At the end of a conversation, the Agent should offer a small numbered list of concrete next actions. Replying with a number starts that action. Missing facts, conflicts, and required approvals remain explicit boundaries.
