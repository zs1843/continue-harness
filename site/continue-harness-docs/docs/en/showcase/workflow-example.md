# Reproducible workflow

This example follows the same protocol used to maintain continue-harness itself.

```bash
node packages/cli/bin/continue-harness.mjs version
node packages/cli/bin/continue-harness.mjs inspect --json
node packages/cli/bin/continue-harness.mjs doctor --json
```

The important property is not the specific project type. The project configuration selects the adapters and commands, while the Core produces stable inspection, diagnosis, verification, and resume output.
