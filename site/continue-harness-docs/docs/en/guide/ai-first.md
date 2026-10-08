# Project adoption

This page provides the complete prompts and Skill installation commands for adopting `continue-harness` through project Skills, and is the starting point for the other guide pages. The CLI is also available; when Skills are used, the Agent performs adoption, input registration, task management, verification, and handoff under the same project constraints.

## Adopt or create a project

Send this prompt to Codex, Claude Code, Cursor, or another Agent that supports project Skills:

```text
Use the Continue Harness project-adoption Skill to adopt and inspect the current project.

Use `continue-harness-create` for a new project and `continue-harness-init` for an existing project.

Do not modify business code yet. Follow this order:
1. Read the project constraints, Harness configuration, and current status.
2. In the first Intake round, confirm project type, goal and scope, runtime, collaborators, and toolchain. Mark unknown facts as pending; do not guess.
3. Generate the minimum second-round evidence list for this project type. Register a source for each required item and mark non-applicable items as not_applicable.
4. Run read-only checks and report project facts, input status, risks, and next actions.

End with confirmed facts, open questions, registered inputs, check results, and the first task that can start.
```

The Agent decides whether UI, API, deployment, or other evidence is relevant to a frontend, backend, client, data, infrastructure, or mixed project.

## Create a task

After Intake and input registration, send:

```text
Use the Continue Harness task and verification Skills to restore the current project context and start this task:

<goal, scope, non-goals, and acceptance criteria>

Read the current task, valid inputs, latest snapshot, decisions, and logs first. If evidence is insufficient, ask questions instead of guessing.
Create or continue a stable task ID. After implementation, run the verification configured for the project and record logs, risks, acceptance, and next actions.
```

At the end of each round, the Agent reports completed work, evidence, changes, verification, failures or retries, remaining risks, and next actions. In a new Agent or session, reuse the same prompt to restore the current project context from the task snapshot and logs.

## Install a Skill

A project-level Skill is copied from `skills/<name>/` in the repository into the host directory. The default `generic` preset only needs the `generic-harness` aggregate Skill:

```bash
git clone --depth 1 https://github.com/zs1843/continue-harness.git /tmp/continue-harness

# Codex / Cursor
mkdir -p .agents/skills
cp -R /tmp/continue-harness/skills/generic-harness .agents/skills/

# Claude Code
mkdir -p .claude/skills
cp -R /tmp/continue-harness/skills/generic-harness .claude/skills/
```

`consumer-h5-harness` is used only with `--preset consumer-h5`; copy the other 12 command-level Skills on demand. Global installs, install locations, and updates are covered in [Install skills](../skills/install.md).

## Missing Skills

If the Agent reports that the project Skill for the current stage is missing, install only that one:

```text
Check whether the current project has the Continue Harness adoption, task, and verification Skills. Install only the Skill required for the current stage, then rerun Intake. Do not install Consumer H5 or another specialized Skill unless project facts require it.
```

The Agent selects `inspect`, `doctor`, `inputs`, `task`, `resume`, and `verify` from the project configuration, so users do not compose the remaining CLI commands.

See [Human approval boundaries](./agent-workflow.md) for the decisions that stay with people.
