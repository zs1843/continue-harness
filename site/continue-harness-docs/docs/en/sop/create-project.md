# Create a project

Continue Harness creates a workspace for constraints and collaboration, not a language or framework starter. Use `continue-harness-create` with your Agent.

## Confirm project facts

Provide a project name, destination, goal, scope and intended deliverable. Confirm the project type, runtime and toolchain in conversation; unknown facts remain pending. The Agent previews the files to be written before creating the workspace.

After these facts are confirmed, decide which inputs the task needs. Requirements are required; UI references, API contracts, data definitions and deployment constraints are selected by applicability, not a fixed checklist.

## Generated content

- Project configuration and Intake state under `.continue-harness/`.
- An input manifest template for registering sources.
- The canonical `AGENTS.md` constraints and thin provider entry points.
- Project facts, current status, decisions, acceptance records and handoff history scaffolding.

Creation does not generate business code, pick a framework or install application dependencies. It does not mean the project has been implemented or accepted.

## Start the first task

Register confirmed inputs, create a task and define the requirement → implementation → acceptance → evidence links. Implement only after scope and criteria are confirmed. Map the project's own test commands into verification, record outcomes and prepare a handoff.

The collaboration loop is the same across project types. Project-specific files and tools follow confirmed facts.

<details>
<summary>CLI reference</summary>

```bash
continue-harness plan create my-project --json
continue-harness create my-project
cd my-project
continue-harness intake inspect --json
```

The default creates only the constraint workspace. See [Inputs](../guide/evidence.md), [Verification](../guide/verification.md) and [Skills](../skills/install.md).

</details>
