# Reproducible workflow

This example follows the same protocol used to maintain continue-harness itself. The commands are
read-only or produce a plan; they do not create a business project.

```bash
node packages/cli/bin/continue-harness.mjs version
node packages/cli/bin/continue-harness.mjs plan create demo-project --json
node packages/cli/bin/continue-harness.mjs inspect --json
node packages/cli/bin/continue-harness.mjs doctor --json
```

The important property is not the specific project type. The project configuration selects facts,
adapters, and commands, while the Core produces stable inspection, diagnosis, verification, and
resume output. A `ready` creation plan means no file conflict was found; it does not mean that
dependencies are installed or business behavior is complete. A diagnostic state such as
`not_configured` is distinct from a failed check.

For the repository's historical `demo-h5` example, the currently verified evidence is limited to
PRD registration, hash inspection, and `draft` status. Business pages and business acceptance are
not represented as complete. See [the evidence record](./demo-h5-capture.md).
