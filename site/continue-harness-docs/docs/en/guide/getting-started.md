# Get started

Continue Harness keeps requirements linked to acceptance and enables later collaborators to restore project context. Start by confirming project facts with an Agent, then select evidence and checks based on the project and task.

## Ask an Agent

Send the following request to an Agent. When an operation Skill for the current stage is available, the Agent can invoke it; without one, the workflow can still proceed through conversation using this guide. No aggregate project Skill is required. Do not assume the CLI is installed or will be downloaded from an unverified source.

```text
Use Continue Harness to inspect and take over the current project.

First determine whether this is a new or existing project and follow the corresponding workflow. Confirm goals, scope, deliverables, constraints, collaborators, and available materials in conversation. Mark unknown facts as pending; do not guess.
Select the evidence and checks required by the confirmed project facts and task. Explain non-applicable items; do not require every project to provide the same materials.
Without changing business implementation, inspect the project and preview the plan. Explain which collaboration records would be created or preserved, identified risks, and decisions requiring my confirmation. Write only after confirmation.
Report confirmed facts, open questions, evidence, check results, and next actions.
```

After adoption, state the goal, scope, non-goals, and acceptance criteria when assigning work. The Agent restores the current task and evidence, links “requirement → implementation item → acceptance item → evidence → handoff state,” and runs checks declared by the project.

## Create or adopt

- [Create a project](/en/sop/create-project): establish collaboration constraints and records for a new project.
- [Adopt an existing project](/en/sop/init-existing-project): preview the impact, add missing records, and preserve project-owned content.

Project facts and task scope determine the materials needed; input categories, acceptance methods, and check commands are not a fixed checklist.

## Optional CLI entry

The CLI is available to maintainers who need direct operation or need to inspect Agent execution. A compatible version must already be available; this reference does not imply automatic CLI installation.

```bash
continue-harness plan create project-name --json
continue-harness create project-name
continue-harness init --dry-run
continue-harness inputs inspect --json
continue-harness task create --title "Confirmed work item" --json
continue-harness verify feature
continue-harness resume --json
```

Creation prepares constraints and collaboration records; it does not create business implementation. During adoption, the plan distinguishes files to create, unchanged managed files, and project-modified files. Modified files are preserved while missing files can still be added. A write error or concurrent change may leave a partial result; the process does not promise transactional rollback.

See the [CLI reference](/en/reference/commands) for command details.
