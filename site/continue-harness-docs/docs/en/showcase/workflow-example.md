# CLI example

This page shows how to preview a project-record plan and inspect project facts and diagnostics. For routine work, invoke the corresponding Agent Skill; it calls the CLI when needed.

## Check the version

```bash
continue-harness version
```

## Preview a creation plan

The plan command reports targets and conflicts without writing files:

```bash
continue-harness plan create sample-project --json
```

The plan lists the records to be created, project name, target location, and status. The plan output is authoritative for that run; a sample file count is not a fixed inventory for every project.

## Inspect project state

```bash
continue-harness inspect --json
continue-harness doctor --json
```

Inspect reads project configuration and collaboration state. Doctor performs read-only checks for configured capabilities. An unconfigured input or optional check must not be interpreted as a pass.

## Inputs, tasks, and verification

```bash
continue-harness inputs inspect --json
continue-harness task create --title "Confirmed work item" --json
continue-harness verify feature
continue-harness resume --json
```

Actual input types and project checks depend on confirmed facts, task scope, and project configuration. Review verification results together with acceptance items and evidence; handoff must preserve the actual reported state.
