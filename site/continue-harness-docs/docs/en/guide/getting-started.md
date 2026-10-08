# Create or adopt a project

This page describes the Skill path used by default for a first adoption; the CLI is an optional fallback. The Agent selects the create, adoption, Intake, evidence, and verification flow from project facts.

## Adopt through an Agent

See [Project adoption](/en/guide/ai-first) for the complete adoption prompt.

For a new project, the Agent creates a technology-neutral constraint container. For an existing project, it previews the adoption impact and adds only missing files without overwriting project-owned content. Project constraints are declared by the target project; the Agent enables capabilities only from confirmed facts and does not assume a product shape or toolchain.

## If the Skill is unavailable

Ask the Agent to install only the project Skill required for the current stage and then rerun Intake. Do not install Consumer H5 or another specialized Skill unless project facts require it. See [Project adoption](/en/guide/ai-first) for the prompt and the install command.

If the Agent needs a manual installation command, use [Install the CLI](#install-the-cli) below.

## Working with an Agent

After the facts and inputs are confirmed, give the Agent the goal, scope, non-goals, and acceptance criteria so it can restore context and start the task. See [Project adoption](/en/guide/ai-first) for the task prompt.

To continue in a new Agent or session, reuse the same prompt, restore the current project context first, then continue the task.

Decisions that stay with people are listed under [Human approval boundaries](./agent-workflow.md).

<details>
<summary>CLI reference (optional)</summary>

### Install the CLI

Installing the CLI requires the command line; the version check maps to the `continue-harness-version` Skill.

Version `0.1.0` is not published to npm yet, and `@company` is still a placeholder scope. For manual execution, install from source:

```bash
git clone https://github.com/zs1843/continue-harness.git
cd continue-harness
pnpm install
node packages/cli/bin/continue-harness.mjs version
```

Requirements: Node.js 20 or later and pnpm 10.12.1 or a compatible version.

### Create a project

**Skill**: `continue-harness-create` (create), `continue-harness-plan` (preview)

```bash
continue-harness plan create my-project --json
continue-harness create my-project
cd my-project
```

The default creation flow writes only constraints and collaboration records; it does not generate business code or dependencies. A specialized project template is generated only when selected explicitly.

### Adopt an existing project

**Skill**: `continue-harness-init` (adopt), `continue-harness-plan` (preview)

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
```

A real conflict prevents any initialization writes.

### Migrate the legacy directory

`migrate` has no matching Skill, so this step is CLI-only.

```bash
continue-harness migrate --dry-run --json
continue-harness migrate
```

Migration moves `.fe-harness/` only when `.continue-harness/` does not already exist.

See the [CLI reference](/en/reference/commands) for the complete command list.

</details>
