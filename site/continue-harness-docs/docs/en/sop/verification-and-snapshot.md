# Verification and snapshot details

Choose a mode by change type, then save the result:

```bash
continue-harness verify feature
continue-harness task snapshot T001 --title "Task title" --request "The user request" --json
```

Reports live under `tmp/continue-harness/`. A snapshot captures changed files, verification results, Token differences, and evidence references. It excludes credentials and other sensitive values. Requirement closure must be verified, explicitly deferred, or recorded as externally blocked.
